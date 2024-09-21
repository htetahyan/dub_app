'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required('Project name is required'),
  sourceLanguage: Yup.string().required('Source language is required'),
  targetLanguage: Yup.string().required('Target language is required'),
  audioSource: Yup.string().required('Audio or video source is required'),
  url: Yup.string().when('audioSource', ([audioSource], schema) => {
    return audioSource === 'YouTube URL' ? schema.required('A URL is required') : schema.nullable();
  }),
  file: Yup.mixed().when('audioSource', ([audioSource], schema) => {
    return audioSource === 'Upload' ? schema.required('A file is required for upload') : schema.nullable();
  }),
  numberOfSpeakers: Yup.string().required('Number of speakers is required'),
  startTime: Yup.string().nullable(),
  endTime: Yup.string().nullable(),
});

const formatTime = (input: string) => {
  let totalSeconds = parseInt(input, 10);
  
  if (isNaN(totalSeconds)) return input;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, '0'))
    .join(':');
};

const DubbingForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      projectName: '',
      sourceLanguage: languages[0].code,
      targetLanguage: languages[1].code,
      audioSource: 'Upload',
      file: null,
      numberOfSpeakers: '',
      url: '',
      startTime: '',
      endTime: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('projectName', values.projectName);
      formData.append('sourceLanguage', values.sourceLanguage);
      formData.append('targetLanguage', values.targetLanguage);
      formData.append('audioSource', values.audioSource);
      formData.append('file', values.file ?? '');
      formData.append('numberOfSpeakers', values.numberOfSpeakers);
      formData.append('url', values.url);
      formData.append('startTime', values.startTime);
      formData.append('endTime', values.endTime);
      console.log(values);
      toast.promise(
        fetch('/api/project/add-video', {
          method: 'POST',
          body: formData,
        }).then((res) => res.json()).finally(() => router.refresh()),
        { loading: 'Creating project...', success: (res) => res.message, error: (res) => res.body }
        
      );
      setTimeout(() => {
        router.push('/dashboard/my-projects');
       
      }, 3000);
    },
  });

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedTime = formatTime(value.replace(/[^0-9]/g, '')); // Format time
    formik.setFieldValue(name, formattedTime);
  };

  return (
    <div className="w-[80vw] mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Dub your content</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Project name */}
       <div className="grid grid-cols-2 gap-4"> <div>
          <label className="block font-semibold">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formik.values.projectName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded"
            placeholder="Project Name"
          />
          {formik.touched.projectName && formik.errors.projectName ? (
            <div className="text-red-600">{formik.errors.projectName}</div>
          ) : null}
        </div>

        {/* Source language */}
        <div>
          <label className="block font-semibold">Source Language</label>
          <Select
            name="sourceLanguage"
            defaultValue={formik.values.sourceLanguage}
            onValueChange={() => formik.setFieldValue('sourceLanguage', formik.values.sourceLanguage)}
          ><SelectTrigger className="w-full border p-2 rounded">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>

            {languages.map((lang) => (
<SelectItem key={lang.code} value={lang.code}>{lang.language}</SelectItem>             
            ))} </SelectContent>
          </Select>
          {formik.touched.sourceLanguage && formik.errors.sourceLanguage ? (
            <div className="text-red-600">{formik.errors.sourceLanguage}</div>
          ) : null}
        </div>
        </div>
        {/* Target language */}
        <div>
          <label className="block font-semibold">Target Language</label>
          <Select
            name="targetLanguage"
            defaultValue={formik.values.targetLanguage}
            onValueChange={() => formik.setFieldValue('targetLanguage', formik.values.targetLanguage)}
          ><SelectTrigger className="w-full border p-2 rounded">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>

            {languages.map((lang) => (
<SelectItem key={lang.code} value={lang.code}>{lang.language}</SelectItem>             
            ))} </SelectContent>
          </Select>
          {formik.touched.targetLanguage && formik.errors.targetLanguage ? (
            <div className="text-red-600">{formik.errors.targetLanguage}</div>
          ) : null}
        </div>

        {/* Audio source */}
        <div>
          <label className="block font-semibold">Audio Source</label>
          <Select
            name="audioSource"
            defaultValue={formik.values.audioSource}
            onValueChange={() => formik.setFieldValue('audioSource', formik.values.audioSource)}
          ><SelectTrigger className="w-full border p-2 rounded">
              <SelectValue placeholder="Select Audio Source" />
            </SelectTrigger>
            <SelectContent>

            <SelectItem value="Upload">File</SelectItem>
            <SelectItem value="YouTube URL">YouTube URL</SelectItem> </SelectContent>
          </Select>
        </div>

        {/* Upload file */}
        {formik.values.audioSource === 'Upload' && (
          <div>
            <label className="block font-semibold">File Upload</label>
            <Input
              type="file"
              accept="video/*"
              name="file"
              onChange={(e) => formik.setFieldValue('file', e!.target!.files![0])}
              className="w-full border p-2 rounded"
            />
            {formik.touched.file && formik.errors.file ? (
              <div className="text-red-600">{formik.errors.file}</div>
            ) : null}
          </div>
        )}

        {/* YouTube URL */}
        {formik.values.audioSource === 'YouTube URL' && (
          <div>
            <label className="block font-semibold">YouTube URL</label>
            <Input
              type="text"
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border p-2 rounded"
              placeholder="Enter YouTube URL"
            />
            {formik.touched.url && formik.errors.url ? (
              <div className="text-red-600">{formik.errors.url}</div>
            ) : null}
          </div>
        )}

        {/* Number of speakers */}
        <div>
          <label className="block font-semibold">Number of Speakers</label>
          <Input
            type="text"
            name="numberOfSpeakers"
            value={formik.values.numberOfSpeakers}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded"
            placeholder="Enter number of speakers"
          />
          {formik.touched.numberOfSpeakers && formik.errors.numberOfSpeakers ? (
            <div className="text-red-600">{formik.errors.numberOfSpeakers}</div>
          ) : null}
        </div>

        {/* Time range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Start time (hh:mm:ss)</label>
            <Input
              type="text"
              name="startTime"
              value={formik.values.startTime}
              onChange={handleTimeChange}
              onBlur={formik.handleBlur}
              className="w-full border p-2 rounded"
              placeholder="hh:mm:ss"
            />
          </div>

          <div>
            <label className="block font-semibold">End time (hh:mm:ss)</label>
            <Input
              type="text"
              name="endTime"
              value={formik.values.endTime}
              onChange={handleTimeChange}
              onBlur={formik.handleBlur}
              className="w-full border p-2 rounded"
              placeholder="hh:mm:ss"
            />
          </div>
        </div>

        {/* Submit button */}
        <Button type="submit" className="w-full bg-gray-600 text-white p-3 rounded mt-4 hover:bg-gray-700">
          Create dub
        </Button>
      </form>
    </div>
  );
};

export default DubbingForm;
const languages = [
  { language: 'English', code: 'en' },
  { language: 'Portuguese', code: 'pt' },
  { language: 'Chinese', code: 'zh' },
  { language: 'Spanish', code: 'es' },
  { language: 'French', code: 'fr' },
  { language: 'German', code: 'de' },
  { language: 'Japanese', code: 'ja' },
  { language: 'Arabic', code: 'ar' },
  { language: 'Russian', code: 'ru' },
  { language: 'Korean', code: 'ko' },
  { language: 'Indonesian', code: 'id' },
  { language: 'Italian', code: 'it' },
  { language: 'Dutch', code: 'nl' },
  { language: 'Turkish', code: 'tr' },
  { language: 'Polish', code: 'pl' },
  { language: 'Swedish', code: 'sv' },
  { language: 'Filipino', code: 'fil' },
  { language: 'Malay', code: 'ms' },
  { language: 'Romanian', code: 'ro' },
  { language: 'Ukrainian', code: 'uk' },
  { language: 'Greek', code: 'el' },
  { language: 'Czech', code: 'cs' },
  { language: 'Danish', code: 'da' },
  { language: 'Finnish', code: 'fi' },
  { language: 'Bulgarian', code: 'bg' },
  { language: 'Croatian', code: 'hr' },
  { language: 'Slovak', code: 'sk' },
  { language: 'Tamil', code: 'ta' },
  // New languages added from the provided list
  { language: 'English (USA)', code: 'en-US' },
  { language: 'English (UK)', code: 'en-GB' },
  { language: 'English (Australia)', code: 'en-AU' },
  { language: 'English (Canada)', code: 'en-CA' },
  { language: 'Spanish (Mexico)', code: 'es-MX' },
  { language: 'French (Canada)', code: 'fr-CA' },
  { language: 'Arabic (Saudi Arabia)', code: 'ar-SA' },
  { language: 'Arabic (UAE)', code: 'ar-AE' },
  { language: 'Hungarian', code: 'hu' },
  { language: 'Norwegian', code: 'no' },
  { language: 'Vietnamese', code: 'vi' },
];
