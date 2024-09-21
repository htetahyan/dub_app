import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import { writeFile, unlink } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import TextTranslationClient from '@azure-rest/ai-translation-text';
import { uploadArrayBuffer } from '~/service/storage.azure';
import { randomUUID } from 'crypto';

const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);

// Check for environment variables
if (!process.env.AZURE_SPEECH_API_KEY || !process.env.AZURE_SPEECH_REGION) {
  throw new Error('Azure Speech API key or region is not defined in environment variables.');
}

export const convertMp3ToWav = async (file: Blob, extension: string): Promise<string> => {
  if (!file) throw new Error('The file Blob is undefined or null');

  const tempFilePath = join(tmpdir(), `temp.${extension}`);
  const outputFilePath = join(tmpdir(), `${randomUUID()}.wav`);

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  try {
    await writeFileAsync(tempFilePath, fileBuffer);

    return new Promise<string>((resolve, reject) => {
      ffmpeg(tempFilePath)
        .inputFormat(extension)
        .outputFormat('wav')
        .on('error', (err) => {
          console.error('Error during ffmpeg conversion:', err);
          reject(err);
        })
        .on('end', async () => {
          try {
            await unlinkAsync(tempFilePath);
            resolve(outputFilePath);
          } catch (err) {
            reject(err);
          }
        })
        .save(outputFilePath);
    });
  } catch (err) {
    console.error('Error during file operation:', err);
    throw new Error('File operation failed: make sure your mp3 file is valid.');
  }
};

export const MakeFileFromPath = async (path: string): Promise<Buffer> => {
  try {
    return await readFile(path);
  } catch (err) {
    console.error(`Error reading file from path: ${path}`, err);
    throw err;
  }
};

export const textToSpeech = async (text: string, voice: string, targetLanguage: string): Promise<Buffer> => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_SPEECH_API_KEY!, process.env.AZURE_SPEECH_REGION!);
  speechConfig.speechSynthesisLanguage = targetLanguage;
  speechConfig.speechSynthesisVoiceName = voice;

  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  return new Promise<Buffer>(async(resolve, reject) => {
   await synthesizer.speakTextAsync(
      text,
      async(result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log('Synthesis finished.');
          resolve(await result.audioData as Buffer); // Return audio data directly
        } else {
          console.error(`Speech synthesis canceled: ${result.errorDetails}`);
          reject(new Error(result.errorDetails));
        }
        synthesizer.close();
      },
      (err) => {
        console.error('Error during synthesis:', err);
        synthesizer.close();
        reject(err);
      }
    );
  });
};

export const dubAudio = async (path: string, file: Blob, currentLanguage: string, targetLanguage: string) => {
  try {
    const speechConfig = sdk.SpeechTranslationConfig.fromSubscription(
      process.env.AZURE_SPEECH_API_KEY!,
      process.env.AZURE_SPEECH_REGION!
    );
    
    speechConfig.speechRecognitionLanguage = currentLanguage;
    speechConfig.addTargetLanguage(targetLanguage);

    const audioBuffer = await MakeFileFromPath(path);
    if (!audioBuffer) {
      throw new Error('Audio buffer is null or undefined');
    }

    const audioConfig = sdk.AudioConfig.fromWavFileInput(audioBuffer);
    const translationRecognizer = new sdk.TranslationRecognizer(speechConfig, audioConfig);

    let accumulatedText = '';

    return new Promise<string>((resolve, reject) => {
      translationRecognizer.recognized = (s, e) => {
        if (e.result.reason === sdk.ResultReason.TranslatedSpeech) {
          accumulatedText += `${e.result.text} `;
          console.log(`DUBBING: ${e.result.text}`);
        } else if (e.result.reason === sdk.ResultReason.NoMatch) {
          reject(new Error('NOMATCH: Speech could not be recognized.'));
        }
      };

      translationRecognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);
        if (e.reason === sdk.CancellationReason.Error) {
          console.error(`CANCELED: ErrorCode=${e.errorCode}`);
          console.error(`CANCELED: ErrorDetails=${e.errorDetails}`);
          reject(new Error('Speech recognition canceled due to an error.'));
        }
      };

      translationRecognizer.sessionStopped = (s, e) => {
        console.log('Session stopped');
        translationRecognizer.close();
        resolve(accumulatedText.trim());
      };

      translationRecognizer.startContinuousRecognitionAsync();
    });
  } catch (err) {
    console.error('Error during dubbing process:', err);
    throw err;
  }
};

export const processDubbingAndSynthesis = async (
  fileName: string,
  file: Blob,
  voice: string,
  currentLanguage: string,
  targetLanguage: string
) => {
  try {
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    let filePath = '';

    if (fileExtension === 'mp3') {
      filePath = await convertMp3ToWav(file, fileExtension);
    } else {
      filePath = join(tmpdir(), fileName);
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await writeFileAsync(filePath, fileBuffer);
    }

    let text = '';
    const recognizedText = await dubAudio(filePath, file, currentLanguage, targetLanguage);
    if (currentLanguage === targetLanguage) {
      text = recognizedText;
    } else {
      const translatedText = await translateText(recognizedText, currentLanguage, targetLanguage);
      text = translatedText;
    }
    console.log(`Recognized text: ${text}`);
    
    const speechAudioData = await textToSpeech(text, voice, targetLanguage);
    const url = await uploadArrayBuffer(speechAudioData as Buffer, randomUUID() + '.wav');

    return url;
  } catch (err) {
    console.error('Error during the process:', err);
    throw err;
  }
};

const translateText = async (originalText: string, currentLanguage: string, targetLanguage: string) => {
  const translateCredential = {
    key: process.env.AZURE_TRANSLATION_KEY!,
    region: process.env.AZURE_TRANSLATION_REGION!
  };
  const endPoints = process.env.AZURE_TRANSLATION_ENDPOINT!;

  const translationClient = TextTranslationClient(endPoints, translateCredential);

  try {
    const inputText = [{ text: originalText }];
    const parameters = { from: currentLanguage, to: targetLanguage };

    const translateResponse = await translationClient.path('/translate').post({
      body: inputText,
      queryParameters: parameters
    });

    const translations = translateResponse.body as any;
    if (translations && translations.length > 0) {
      return translations[0]?.translations[0]?.text;
    } else {
      throw new Error('No translations found.');
    }
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

export const listVoices = async () => {
  try {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_API_KEY!,
      process.env.AZURE_SPEECH_REGION!
    );
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    const voices = await synthesizer.getVoicesAsync();
    return voices;
  } catch (err) {
    throw err;
  }
};

export const sythesizeSpeech = async (text: string) => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_API_KEY as string,
      process.env.AZURE_SPEECH_REGION as string
  );
  speechConfig.speechSynthesisLanguage = 'it'; // Set the target language for synthesis

  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(text, (result) => {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log('Speech synthesis finished.');
      } else {
          console.error('Error synthesizing speech:', result.errorDetails);
      }
      synthesizer.close();
  });
};
export const listAvailableVoices = async (voice: string,targetLanguage: string): Promise<any> => {
  
const text="Hello, I am an example text to speech service"
const translatedText = await translateText(text, 'en', targetLanguage);
if(!translatedText) return null
 return await textToSpeech(translatedText!, voice, 'en-Us');
}