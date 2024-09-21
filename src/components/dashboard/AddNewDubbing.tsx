'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSWRMutation from 'swr/mutation';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import ListVoicesSelect from './ListVoicesSelect';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { speechSynthesisVoices } from '~/utils/utils';

export const Languages = [
  { name: 'English', code: 'en-US' },
  { name: 'Chinese', code: 'zh-CN' },
  { name: 'Japanese', code: 'ja-JP' },
  { name: 'Korean', code: 'ko-KR' },
  { name: 'French', code: 'fr-FR' },
  { name: 'German', code: 'de-DE' },
  { name: 'Russian', code: 'ru-RU' },
  { name: 'Spanish', code: 'es-ES' },
  { name: 'Vietnamese', code: 'vi-VN' },
  { name: 'Hindi', code: 'hi-IN' },
  { name: 'Portuguese', code: 'pt-PT' },
  { name: 'Arabic', code: 'ar-SA' },
  { name: 'Turkish', code: 'tr-TR' },
  { name: 'Indonesian', code: 'id-ID' },
  { name: 'Italian', code: 'it-IT' },
  { name: 'Thai', code: 'th-TH' },
  { name: 'Dutch', code: 'nl-NL' },
  { name: 'Polish', code: 'pl-PL' },
  { name: 'Swedish', code: 'sv-SE' },
  { name: 'Filipino', code: 'fil-PH' },
  { name: 'Malay', code: 'ms-MY' },
  { name: 'Romanian', code: 'ro-RO' },
  { name: 'Ukrainian', code: 'uk-UA' },
  { name: 'Czech', code: 'cs-CZ' },
  { name: 'Danish', code: 'da-DK' },
  { name: 'Finnish', code: 'fi-FI' },
  { name: 'Bulgarian', code: 'bg-BG' },
  { name: 'Croatian', code: 'hr-HR' },
  { name: 'Hebrew', code: 'he-IL' },
  { name: 'Hungarian', code: 'hu-HU' },
  { name: 'Myanmar', code: 'my-MM' },
];

// Validation schema
const schema = Yup.object().shape({
  projectName: Yup.string().required('Project Name is required'),
  currentLanguage: Yup.string().required('Current Language is required'),
  translateTo: Yup.string().required('Translate To is required'),
  voice: Yup.string().required('Voice is required'),
  sourceFile: Yup.mixed().required('Source File is required'),
});

const AddNewDubbing = () => {
  const { trigger, isMutating } = useSWRMutation('/api/project/add', (url, { arg }: { arg: FormData }) =>
    fetch(url, {
      method: 'POST',
      body: arg,
    }).then(res => res.json())
  );

  const [activeTab, setActiveTab] = useState('file');
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      projectName: '',
      currentLanguage: 'en-US',
      translateTo: 'ja-JP',
      voice: speechSynthesisVoices[0],
      sourceFile: '',
      youtubeUrl: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      
let duration;
      const file = values.sourceFile[0] as any;

      if (file.size > 52428800) {
        toast.error('File size should be less than 50MB');
        return;
      }
      const promiseDuration=await getAudioDuration(file);
      if(promiseDuration )   duration=promiseDuration;
      
      // Calculate audio duration
   if(duration === null) {
     toast.error('Audio duration cannot be calculated! Make sure you have selected a valid audio file.');
   }

      const formData = new FormData();
      formData.append('projectName', values.projectName);
      formData.append('currentLanguage', values.currentLanguage);
      formData.append('translateTo', values.translateTo);
      formData.append('voice', values.voice);
      formData.append('sourceFile', file);
      formData.append('fileName', file.name);
      formData.append('youtubeUrl', values.youtubeUrl);
      if (duration) {
        
        formData.append('audioDuration', duration.toString());
      }
      if (!values.sourceFile && !values.youtubeUrl) {
        toast.error('You must select a source file or YouTube URL');
        return;
      }

      toast.loading('Creating project...');
      
      await trigger(formData)
        .then((res) => {
          toast.dismiss();
          toast.success(res.message || 'Project created successfully');
        })
        .catch((error) => {
          toast.error(error.message || 'Something went wrong while creating the project');
        })
        .finally(() => {
          router.refresh();
        });
    },
  });

  const handleTabChange = (value: any) => {
    setActiveTab(value);
    if (value === 'file') {
      formik.setFieldValue('youtubeUrl', '');
    } else if (value === 'yt') {
      formik.setFieldValue('sourceFile', null);
    }
  };
  const getAudioDuration = async(file: File): Promise<number | null> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      const reader = new FileReader();
      
      // Handle errors in FileReader
      reader.onerror = () => {
        console.error('Error reading the file.');
        reject('Error reading the file.');
      };
      
      reader.onloadend = () => {
        const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
        const url = URL.createObjectURL(blob);
        
        audio.src = url;
        
        const handleLoadedMetadata = () => {
          URL.revokeObjectURL(url); // Clean up after ourselves
setAudioDuration(audio.duration);

          resolve(audio.duration);
        };
  
        const handleError = () => {
          URL.revokeObjectURL(url); // Clean up after ourselves
          console.error('Error loading the audio.');
          reject('Error loading the audio.');
        };
  
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);
      };
      
      reader.readAsArrayBuffer(file);
    });
  };
  
  

  return (
    <div className='lg:w-2/3 w-full mx-auto p-2 lg:p-8 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold mb-4'>Create a New Dubbing Project</h1>
      <p className='mb-6 text-gray-600'>Convert your video or audio into multiple languages with voice cloning.</p>

      <form onSubmit={formik.handleSubmit} className='space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-semibold mb-2'>Project Name</label>
            <Input
              type='text'
              name='projectName'
              onChange={formik.handleChange}
              value={formik.values.projectName}
              className={`block w-full p-2 border ${
                formik.errors.projectName && formik.touched.projectName ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              placeholder='Eg. My First Project'
            />
            {formik.errors.projectName && formik.touched.projectName && (
              <p className='text-red-500 text-sm'>{formik.errors.projectName}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2'>Current Language</label>
            <Select
              name='currentLanguage'
              defaultValue={formik.values.currentLanguage}
              onValueChange={(value) => formik.setFieldValue('currentLanguage', value)}
            >
              <SelectTrigger className='w-full p-2 border border-gray-300 rounded-md'>
                <SelectValue placeholder='Select language' />
              </SelectTrigger>
              <SelectContent>
                {Languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.errors.currentLanguage && formik.touched.currentLanguage && (
              <p className='text-red-500 text-sm'>{formik.errors.currentLanguage}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2'>Translate To</label>
            <Select
              name='translateTo'
              defaultValue={formik.values.translateTo}
              onValueChange={(value) => formik.setFieldValue('translateTo', value)}
            >
              <SelectTrigger className='w-full p-2 border border-gray-300 rounded-md'>
                <SelectValue placeholder='Select language' />
              </SelectTrigger>
              <SelectContent>
                {Languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ListVoicesSelect formik={formik} />
        </div>

        <div className='space-y-4'>
          <Tabs defaultValue='file' onValueChange={handleTabChange}>
            <TabsList className='flex space-x-4'>
              <TabsTrigger value='file'>Upload File</TabsTrigger>
            </TabsList>

            <TabsContent value='file'>
              <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg'>
                <label className='block text-sm font-semibold mb-2'>Select a source file</label>
                <Input
                  type='file'
                  accept='.mp3, .wav'
                  name='sourceFile'
                  onChange={(event) => {
                    formik.setFieldValue('sourceFile', event.currentTarget.files);
                    setAudioDuration(null); // Reset audio duration when a new file is selected
                  }}
                  className='w-full p-2 border border-gray-300 rounded-md shadow-sm'
                />
                <p className='mt-1 text-sm text-gray-500'>Supports MP3 and WAV files.</p>
              </div>
              {formik.errors.sourceFile && formik.touched.sourceFile && (
                <p className='text-red-500 text-sm'>{formik.errors.sourceFile}</p>
              )}
            </TabsContent>

            <TabsContent value='yt'>
              <label className='block text-sm font-semibold mb-2'>YouTube URL</label>
              <Input
                type='text'
                name='youtubeUrl'
                onChange={formik.handleChange}
                value={formik.values.youtubeUrl}
                className='w-full p-2 border border-gray-300 rounded-md shadow-sm'
                placeholder='Paste the YouTube URL'
              />
            </TabsContent>
          </Tabs>
        </div>

        <Button
          disabled={formik.isSubmitting || isMutating}
          type='submit'
          className='bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-light'
        >
          Create new project
        </Button>
      </form>
    </div>
  );
};

export default AddNewDubbing;
