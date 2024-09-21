import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Image from 'next/image';
import { Speaker } from '~/assets/exporter';
import { BufferFetcher } from '~/service/api.service';
import { toast } from 'sonner';
import React, { useRef, useEffect, useState } from 'react';
import { speechSynthesisVoices } from '~/utils/utils';

const ListVoicesSelect = ({ formik }: any) => {
  const [audioSrc, setAudioSrc] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null); // Create a ref for the audio element

  // Filter voices based on the translateTo value
  const filterVoices = speechSynthesisVoices?.filter((voice) =>
    voice?.includes(formik.values.translateTo)
  );

  const fetchAudio = async () => {
    if (!formik?.values?.voice) {
      toast.error('Please select a voice');
      return;
    }

    toast.promise(
      BufferFetcher(`voice=${formik.values.voice}&&targetLanguage=${formik.values.translateTo}`)
        .then((url) => {
          setAudioSrc(url!);
        })
        .catch((error) => {
          console.error('Error fetching audio:', error);
          toast.error('Error fetching voice');
        }),
      {
        loading: 'Getting voice',
        success: 'Voice fetched successfully',
        error: 'Error fetching voice',
      }
    );
  };

  // Set the first voice from filterVoices as the default
  useEffect(() => {
    if (filterVoices?.length > 0 && !formik.values.voice) {
      const firstVoice = filterVoices[0];
      formik.setFieldValue('voice', firstVoice);
    }
  }, [filterVoices, formik.values.translateTo, formik]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioSrc]);

  return (
    <div className="flex items- gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Voices</label>
        <Select
          name="voice"
          defaultValue={formik.values.voice || (filterVoices?.[0] || '')}
          onValueChange={(v) => {
            formik.setFieldValue('voice', v);
          }}
        >
          <SelectTrigger className="min-w-[180px] px-2">
            <SelectValue placeholder="Select Voice" />
          </SelectTrigger>

          <SelectContent>
            {filterVoices.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.errors.voice && formik.touched.voice && (
          <p className="text-red-500">{formik.errors.voice}</p>
        )}
      </div>

      <Image
        src={Speaker}
        onClick={fetchAudio}
        className="mt-6 cursor-pointer hover:scale-110"
        alt="speaker"
        width={40}
        height={40}
      />

      {audioSrc && (
        <audio ref={audioRef} controls hidden>
          <source src={audioSrc} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default ListVoicesSelect;
