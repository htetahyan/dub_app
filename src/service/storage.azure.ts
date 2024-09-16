import { BlobServiceClient } from '@azure/storage-blob';
import { randomUUID } from 'crypto';
import { buffer } from 'stream/consumers';
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING ?? '';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

export const uploadImage = async (file: File) => {
    const containerClient = blobServiceClient.getContainerClient('dubbingapp');
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    await blockBlobClient.uploadData(file);
    return blockBlobClient.url;
}
export const uploadArrayBuffer = async (file:any,name:string) => {
    try {
        // Convert ArrayBuffer to Buffer
        const buffer = Buffer.from(file);
        
    
        // Get container client
        const containerClient = blobServiceClient.getContainerClient('dubbingapp');
        const blockBlobClient = containerClient.getBlockBlobClient(name);
    
        const uploadResponse = await blockBlobClient.uploadData(buffer);
    
        return name;
      } catch (err) {
        console.error('Error uploading to Azure Blob Storage:', err);
        throw err;
      }
}