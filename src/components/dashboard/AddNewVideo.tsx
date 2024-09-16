'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
      sourceLanguage: languages[0].language,
      targetLanguage: languages[1].language,
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
        }).then((res) => res.json()),
        { loading: 'Creating project...', success: (res) => res.message, error: (res) => res.message }
        
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
          <select
            name="sourceLanguage"
            value={formik.values.sourceLanguage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.language}>
                {lang.language}
              </option>
            ))}
          </select>
          {formik.touched.sourceLanguage && formik.errors.sourceLanguage ? (
            <div className="text-red-600">{formik.errors.sourceLanguage}</div>
          ) : null}
        </div>
        </div>
        {/* Target language */}
        <div>
          <label className="block font-semibold">Target Language</label>
          <select
            name="targetLanguage"
            value={formik.values.targetLanguage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.language}>
                {lang.language}
              </option>
            ))}
          </select>
          {formik.touched.targetLanguage && formik.errors.targetLanguage ? (
            <div className="text-red-600">{formik.errors.targetLanguage}</div>
          ) : null}
        </div>

        {/* Audio source */}
        <div>
          <label className="block font-semibold">Audio Source</label>
          <select
            name="audioSource"
            value={formik.values.audioSource}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border p-2 rounded"
          >
            <option value="Upload">Upload</option>
            <option value="YouTube URL">YouTube URL</option>
          </select>
        </div>

        {/* Upload file */}
        {formik.values.audioSource === 'Upload' && (
          <div>
            <label className="block font-semibold">File Upload</label>
            <input
              type="file"
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
            <input
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
          <input
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
            <input
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
            <input
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
        <button type="submit" className="w-full bg-gray-600 text-white p-3 rounded mt-4 hover:bg-gray-700">
          Create dub
        </button>
      </form>
    </div>
  );
};

export default DubbingForm;
const languages = [
  { language: 'English', code: 'en' },
  { language: 'Hindi', code: 'hi' },
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
  { language: 'Tamil', code: 'ta' }
];
