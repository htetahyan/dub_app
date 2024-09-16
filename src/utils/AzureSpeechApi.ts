import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import { writeFile, unlink } from 'fs';
import {cache} from 'react'
import { readFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';


import TextTranslationClient from "@azure-rest/ai-translation-text";
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { uploadArrayBuffer } from '~/service/storage.azure';

const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);

// Check for environment variables
if (!process.env.AZURE_SPEECH_API_KEY || !process.env.AZURE_SPEECH_REGION) {
  throw new Error('Azure Speech API key or region is not defined in environment variables.');
}


export const convertMp3ToWav = async (file: Blob,extension:string) => {
  if (!file) {
    throw new Error('The file Blob is undefined or null');
  }

  const tempFilePath = join(tmpdir(), 'temp.'+extension);
  const outputFilePath = join(tmpdir(), 'converted.wav');

  // Convert Blob to buffer
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  await writeFileAsync(tempFilePath, fileBuffer);

  return new Promise<string>((resolve, reject) => {
    ffmpeg(tempFilePath)
      .inputFormat(extension)
      .outputFormat(extension==='mp3'?'wav':'mp3')
      .on('error', (err) => {
        console.error('Error during ffmpeg conversion:', err);
        reject(err);
      })
      .on('end', async () => {
        try {
          await unlinkAsync(tempFilePath); // Remove the temporary file
          resolve(outputFilePath);
        } catch (err) {
          reject(err);
        }
      })
      .save(outputFilePath);
  });
};

export const MakeFileFromPath = async (path: string): Promise<Buffer> => {
  try {
    return await readFile(path);
  } catch (err) {
    console.error(`Error reading file from path: ${path}`, err);
    throw err;
  }
};

export const textToSpeech = async (text: string, voice: string, targetLanguage: string, currentLanguage: string) => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.AZURE_SPEECH_API_KEY as string,
    process.env.AZURE_SPEECH_REGION as string
  );

  // Set the speech recognition language (input)

  // Set the target language for speech synthesis (output)
  speechConfig.speechSynthesisLanguage = targetLanguage;
  

  // Set the voice for speech synthesis 
  speechConfig.speechSynthesisVoiceName = voice;

  // Create an audio configuration to output the synthesized speech to the default speaker
  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

  // Create a speech synthesizer with the configured settings
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log('Synthesis finished.');
          resolve(result.audioData ); // Optionally resolve with audio data
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

export const dubAudio = async (path:string,file: Blob,currentLanguage: string,targetLanguage: string) => {
  try {
    console.log(`Converted WAV file path: ${path}`);

    const speechConfig = sdk.SpeechTranslationConfig.fromSubscription(
      process.env.AZURE_SPEECH_API_KEY as string,
      process.env.AZURE_SPEECH_REGION as string
    );
    
    // Set the speech recognition language (input)
    speechConfig.speechRecognitionLanguage = currentLanguage;

    speechConfig.addTargetLanguage(targetLanguage);

    const audioBuffer = await MakeFileFromPath(path);
    if (!audioBuffer) {
      throw new Error('Audio buffer is null or undefined');
    }

    const audioConfig = sdk.AudioConfig.fromWavFileInput(audioBuffer);
    const translationRecognizer = new sdk.TranslationRecognizer(speechConfig, audioConfig);

    return new Promise<string>((resolve, reject) => {
      translationRecognizer.recognizeOnceAsync((result) => {
        switch (result.reason) {
          case sdk.ResultReason.TranslatedSpeech:
            resolve(result.text); // Return recognized text
            break;
          case sdk.ResultReason.NoMatch:
            reject(new Error('NOMATCH: Speech could not be recognized.'));
            break;
          case sdk.ResultReason.Canceled:
            const cancellation = sdk.CancellationDetails.fromResult(result);
            console.log(`CANCELED: Reason=${cancellation.reason}`);
            if (cancellation.reason === sdk.CancellationReason.Error) {
              console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
              console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
              console.log('CANCELED: Did you set the speech resource key and region values?');
            }
            reject(new Error('Speech recognition canceled.'));
            break;
        }
        translationRecognizer.close();
      });
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

    // If the file extension is mp3, convert it to WAV
    if (fileExtension === 'mp3') {
      filePath = await convertMp3ToWav(file, fileExtension);
    } else {
      // Save the file directly if it's not mp3 (assuming it's already in the correct format)
      filePath = join(tmpdir(), fileName);

      
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await writeFileAsync(filePath, fileBuffer);
    }
let text=''
    // Get the recognized text from the dubAudio function
    const recognizedText = await dubAudio(filePath,file, currentLanguage, targetLanguage);
    if(currentLanguage===targetLanguage) {
      text=recognizedText
    } else{ 
 const translatedText = await translateText(recognizedText,currentLanguage, targetLanguage);
 text=translatedText
    }
    console.log(`Recognized text: ${text}`);
    
    // Pass the recognized text to the textToSpeech function
    const speechAudioData = await textToSpeech(text, voice, targetLanguage, currentLanguage);

    // Upload the audio data to Azure storage and return the URL
    const url = await uploadArrayBuffer(speechAudioData as Buffer, fileName);
    console.log(`Uploaded audio URL: ${url}`);

    return url;
  } catch (err) {
    console.error('Error during the process:', err);
    throw err;
  }
};
const translateText = async (originalText: string,currentLanguage: string, targetLanguage: string) => {
  // Create credentials using the key and region
  const translateCredential = {
    key: process.env.AZURE_TRANSLATION_KEY!,
    region: process.env.AZURE_TRANSLATION_REGION!
  };
  const endPoints = process.env.AZURE_TRANSLATION_ENDPOINT!;

  // Create an instance of the Text Translation client
  const translationClient = TextTranslationClient(endPoints, translateCredential);

  try {
    const inputText = [{
      text: originalText
    }];

    const parameters = {
      from: currentLanguage, // You can change this dynamically if needed
      to: targetLanguage
    };

    const translateResponse = await translationClient.path('/translate').post({
      body: inputText,
      queryParameters: parameters
    });

    // Assuming that translateResponse.body is an array of translation objects
    const translations = translateResponse.body as any;
    if (translations && translations.length > 0) {
      // Return the first translated text
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
      process.env.AZURE_SPEECH_API_KEY as string,
      process.env.AZURE_SPEECH_REGION as string
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
  
const text=`Hello, I am an example text to speech service`
const translatedText = await translateText(text, 'en', targetLanguage);
if(!translatedText) return null
 return await textToSpeech(translatedText!, voice, 'en-Us', targetLanguage);
}