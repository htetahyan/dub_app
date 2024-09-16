import { unstable_cache } from "next/cache";
import { toast } from "sonner";
import { extractUserIdFromToken } from "./jwt.service";
import { prisma } from "~/utils/utils";

// services/api.service.js
export const BufferFetcher = async (param : string) => {
    try {
      const response = await fetch(`/api/project/synthesize?${param}`, {
        method: 'GET',
        
        cache: 'no-store',
        next: { revalidate: 0 },
        headers: {
          'Content-Type': 'audio/wav',
        }
      });
  
      if (!response.ok) {
        console.error('Response failed:', response.statusText);
        return;
      }
  
      const audioBuffer = await response.arrayBuffer();
  
      const blob = new Blob([audioBuffer], { type: 'audio/wav' });
      const objectUrl = URL.createObjectURL(blob);
  
      return objectUrl; // Returning the buffer so SWR can work with it
    } catch (error) {
        toast.error('Error fetching audio: ' + error);
        throw new Error('Error fetching audio: ' + error);
    }
  };
 