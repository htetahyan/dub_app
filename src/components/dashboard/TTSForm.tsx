'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSWRMutation from 'swr/mutation';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import ListVoicesSelect from './ListVoicesSelect';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { speechSynthesisVoices } from '~/utils/utils';
import { Textarea } from '../ui/textarea';

export const Languages = [
  { name: 'English', code: 'en-US' },
  { name: 'Chinese', code: 'zh-CN' },
  { name: 'Japanese', code: 'ja-JP' },
  { name: 'Korean', code: 'ko-KR' },
  { name: 'French', code: 'fr-FR' },
  { name: 'German', code: 'de-DE' },
  { name: 'Russian', code: 'ru-RU' },
  { name: 'Spanish', code: 'es-ES' },
];

// Validation schema
const schema = Yup.object().shape({
  projectName: Yup.string().required('Project Name is required'),
  currentLanguage: Yup.string().required('Current Language is required'),
  translateTo: Yup.string().required('Translate To is required'),
  voice: Yup.string().required('Voice is required'),
  ttsInput: Yup.string().required('Text input is required'),
});

const TTSForm = () => {
  const { trigger, isMutating } = useSWRMutation('/api/project/tts', (url, { arg }: { arg: FormData }) => fetch(url, {
    method: 'POST',
    body: arg,
  }).then(res => res.json()));

  const [activeTab, setActiveTab] = useState('text');
  const [charCount, setCharCount] = useState(0);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      projectName: '',
      currentLanguage: 'en-US',
      translateTo: 'ja-JP',
      voice: speechSynthesisVoices[0],
      ttsInput: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!values.ttsInput) {
        toast.error('You must enter text for speech synthesis');
        return;
      }

      const formData = new FormData();
      formData.append('projectName', values.projectName);
      formData.append('currentLanguage', values.currentLanguage);
      formData.append('targetLanguage', values.translateTo);
      formData.append('voice', values.voice);
      formData.append('totalCredits', String(charCount));
      formData.append('text', values.ttsInput);

      toast.loading('Creating project...');

      await trigger(formData).then((res) => {
        toast.dismiss();
        toast.success(res.message || 'Project created successfully');
      }).catch((error) => {
        toast.error(error.message || 'Something went wrong while creating the project');
      }).finally(() => {
        router.refresh();
      });
    },
  });

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    formik.setFieldValue('ttsInput', inputText);
    setCharCount(inputText.length);
  };

  return (
    <div className=' col-span-2  mx-auto p-2 lg:p-8 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold mb-4'>Create a New TTS Project</h1>
      <p className='mb-6 text-gray-600'>Convert your text into speech with voice cloning.</p>

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
          <label className='block text-sm font-semibold mb-2'>Text Input</label>
          <Textarea
            name='ttsInput'
            onChange={handleTextInputChange}
            value={formik.values.ttsInput}
            className='w-full p-2 border border-gray-300 rounded-md shadow-sm'
            placeholder='Enter the text to be synthesized into speech'
          />
          <p className='mt-1 text-sm text-gray-500'>Character count: {charCount}</p>
          {formik.errors.ttsInput && formik.touched.ttsInput && (
            <p className='text-red-500 text-sm'>{formik.errors.ttsInput}</p>
          )}
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

export default TTSForm;
