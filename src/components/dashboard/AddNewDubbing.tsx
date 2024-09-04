'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../ui/input';
const schema = Yup.object().shape({
    projectName: Yup.string().required('Required'),
    numberOfSpeakers: Yup.string().required('Required'),
    originalLanguage: Yup.string().required('Required'),
    translateTo: Yup.string().required('Required'),
    sourceFiles: Yup.string().required('Required'),
    youtubeUrl: Yup.string().required('Required'),
    
})
const AddNewDubbing = () => {
  const formik = useFormik({
    initialValues: {
      projectName: '',
      numberOfSpeakers: 'Auto Detect',
      originalLanguage: 'English',
      translateTo: 'German',
      cloneVoice: false,
      includeBackgroundAudio: false,
      addSubtitles: false,
      sourceFiles: null,
      youtubeUrl: '',
    },
    validationSchema: schema,
    
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <div className='w-[80vw] relative overflow-hidden h-screen p-7'>
      <h1 className='font-semibold text-3xl'>Dubbing</h1>
      <p className='font-semibold mb-6'>
        Convert your video or audio into multiple languages with voice cloning.
      </p>

      <form onSubmit={formik.handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Project Name</label>
            <Input

              type='text'
              name='projectName'
              onChange={formik.handleChange}
              value={formik.values.projectName}
              className={`${formik.errors.projectName && formik.touched.projectName ? 'border-red-500' : ''} mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder='Eg. My First Project'
            />
          </div>
         
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Original Language</label>
            <select
              name='originalLanguage'
              onChange={formik.handleChange}
              value={formik.values.originalLanguage}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              <option value='English'>English</option>
              <option value='Spanish'>Spanish</option>
              <option value='French'>French</option>
              <option value='German'>German</option>
            </select>
          </div>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Translate To</label>
            <select
              name='translateTo'
              onChange={formik.handleChange}
              value={formik.values.translateTo}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              <option value='German'>German</option>
              <option value='Spanish'>Spanish</option>
              <option value='French'>French</option>
              <option value='Chinese'>Chinese</option>
            </select>
          </div>
        </div>

        <div className='flex items-center space-x-4'>
          <label className='inline-flex items-center'>
            <input
              type='checkbox'
              name='cloneVoice'
              onChange={formik.handleChange}
              checked={formik.values.cloneVoice}
              className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
            />
            <span className='ml-2 text-sm text-gray-700'>Clone voice</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='checkbox'
              name='includeBackgroundAudio'
              onChange={formik.handleChange}
              checked={formik.values.includeBackgroundAudio}
              className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
            />
            <span className='ml-2 text-sm text-gray-700'>Include background audio</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='checkbox'
              name='addSubtitles'
              onChange={formik.handleChange}
              checked={formik.values.addSubtitles}
              className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
            />
            <span className='ml-2 text-sm text-gray-700'>Add Subtitles</span>
          </label>
        </div>

        <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Select a source file</label>
          <input
            type='file'
            name='sourceFiles'
            onChange={(event) => formik.setFieldValue('sourceFiles', event.currentTarget.files)}
            className='mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
          />
          <p className='mt-1 text-sm text-gray-500'>Supports MP4, MOV, MP3, and WAV file, up to 500MB and 30 mins.</p>
        </div>

        <div className='mt-6'>
          <label className='block text-sm font-medium text-gray-700'>Upload from Youtube URL</label>
          <Input
            type='text'
            name='youtubeUrl'
            onChange={formik.handleChange}
            value={formik.values.youtubeUrl}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Add file URL'
          />
        </div>

        <button
          type='submit'
          className='mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Dub It
        </button>
      </form>
    </div>
  );
};

export default AddNewDubbing;
