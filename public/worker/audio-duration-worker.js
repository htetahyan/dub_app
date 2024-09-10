import { parentPort } from 'worker_threads';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

// Set the ffmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

parentPort?.on('message', async (file) => {
  try {
    // Convert Blob to ArrayBuffer and then to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get audio duration using FFmpeg
    const duration = await getAudioDuration(buffer);

    // Send the duration back to the parent
    parentPort?.postMessage(duration);
  } catch (error) {
    console.error('Worker error:', error);
    parentPort?.postMessage({ error: error.message });
  }
});

// Function to extract audio duration using FFmpeg
async function getAudioDuration(audioBuffer) {
  return new Promise((resolve, reject) => {
    // Use ffprobe to get metadata including duration
    ffmpeg.ffprobe(audioBuffer, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata.format.duration);
      }
    });
  });
}
