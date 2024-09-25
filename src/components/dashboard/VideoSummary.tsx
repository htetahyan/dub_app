'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

const urlType = [
  { name: 'Youtube', matchWith: 'https://www.youtube.com/' },
  { name: 'DailyMotion', matchWith: 'https://www.dailymotion.com/' },
  { name: 'Vimeo', matchWith: 'https://vimeo.com/' }
];

// Validation schema
const validationSchema = Yup.object({
  selectedPlatform: Yup.string().required('Platform selection is required.'),
  videoUrl: Yup.string()
    .url('Invalid URL format')
    .required('Video URL is required.'),
  selectedLanguage: Yup.string().required('Language selection is required.'),
});

const VideoSummary = () => {
  const formik = useFormik({
    initialValues: {
      selectedPlatform: '',
      selectedLanguage: '',
      videoUrl: ''
    },
    validationSchema,
    onSubmit: (values) => {
      const selected = urlType.find((item) => item.name === values.selectedPlatform);
      if (selected && values.videoUrl.startsWith(selected.matchWith)) {
        alert('URL matches the selected platform!');
      } else {
        alert('URL does not match the selected platform.');
      }
    }
  });

  return (
    <div className='w-full mt-4 p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold mb-4'>Video Summary Form</h2>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
        {/* Select platform dropdown */}
        <Select
          onValueChange={(value) => formik.setFieldValue('selectedPlatform', value)}
          name='selectedPlatform'
          value={formik.values.selectedPlatform}
        >
          <SelectTrigger className='w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 transition'>
            <SelectValue placeholder='Select platform' />
          </SelectTrigger>
          <SelectContent>
            {urlType.map((item, index) => (
              <SelectItem key={index} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.selectedPlatform && formik.errors.selectedPlatform ? (
          <div className='text-red-500 text-sm'>{formik.errors.selectedPlatform}</div>
        ) : null}

        {/* Select language dropdown */}
        <Select
          onValueChange={(value) => formik.setFieldValue('selectedLanguage', value)}
          name='selectedLanguage'
          value={formik.values.selectedLanguage}
        >
          <SelectTrigger className='w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 transition'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent>
            {languages.map((item, index) => (
              <SelectItem key={index} value={item.language}>
                {item.language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.selectedLanguage && formik.errors.selectedLanguage ? (
          <div className='text-red-500 text-sm'>{formik.errors.selectedLanguage}</div>
        ) : null}

        {/* Video URL input */}
        <Input
          placeholder='Enter video URL'
          value={formik.values.videoUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name='videoUrl'
          className='p-3 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-300 transition'
        />
        {formik.touched.videoUrl && formik.errors.videoUrl ? (
          <div className='text-red-500 text-sm'>{formik.errors.videoUrl}</div>
        ) : null}

        {/* Check button */}
        <Button
          type='submit'
          className='mt-4   rounded-md transition w-fit justify-end'
        >
Summarize
        </Button>
      </form>
    </div>
  );
}

export default VideoSummary;
const languages = [
    { language: 'English', code: 'en' },
    { language: 'Mandarin Chinese', code: 'zh' },
    { language: 'Spanish', code: 'es' },
    { language: 'Hindi', code: 'hi' },
    { language: 'Arabic', code: 'ar' },
    { language: 'Bengali', code: 'bn' },
    { language: 'Portuguese', code: 'pt' },
    { language: 'Russian', code: 'ru' },
    { language: 'Japanese', code: 'ja' },
    { language: 'Punjabi', code: 'pa' },
    { language: 'German', code: 'de' },
    { language: 'Javanese', code: 'jw' },
    { language: 'Korean', code: 'ko' },
    { language: 'French', code: 'fr' },
    { language: 'Turkish', code: 'tr' },
    { language: 'Vietnamese', code: 'vi' },
    { language: 'Italian', code: 'it' },
    { language: 'Thai', code: 'th' },
    { language: 'Persian', code: 'fa' },
    { language: 'Polish', code: 'pl' },
    { language: 'Ukrainian', code: 'uk' },
    { language: 'Dutch', code: 'nl' },
    { language: 'Malay', code: 'ms' },
    { language: 'Romanian', code: 'ro' },
    { language: 'Hungarian', code: 'hu' },
    { language: 'Czech', code: 'cs' },
    { language: 'Swedish', code: 'sv' },
    { language: 'Finnish', code: 'fi' },
    { language: 'Bulgarian', code: 'bg' },
    { language: 'Danish', code: 'da' },
    { language: 'Norwegian', code: 'no' },
    { language: 'Hebrew', code: 'he' },
    { language: 'Arabic (Levantine)', code: 'ar-LB' },
    { language: 'Catalan', code: 'ca' },
    { language: 'Slovak', code: 'sk' },
    { language: 'Lithuanian', code: 'lt' },
    { language: 'Estonian', code: 'et' },
    { language: 'Latvian', code: 'lv' },
    { language: 'Serbian', code: 'sr' },
    { language: 'Croatian', code: 'hr' },
    { language: 'Bosnian', code: 'bs' },
    { language: 'Macedonian', code: 'mk' },
    { language: 'Icelandic', code: 'is' },
    { language: 'Irish', code: 'ga' },
    { language: 'Welsh', code: 'cy' },
    { language: 'Albanian', code: 'sq' },
    { language: 'Vietnamese (Northern)', code: 'vi-VN' },
    { language: 'Georgian', code: 'ka' },
    { language: 'Thai (Central)', code: 'th-TH' },
    { language: 'Malay (Malaysian)', code: 'ms-MY' },
    { language: 'Chinese (Cantonese)', code: 'zh-HK' },
    { language: 'Armenian', code: 'hy' },
    { language: 'Tajik', code: 'tg' },
    { language: 'Azerbaijani', code: 'az' },
    { language: 'Kazakh', code: 'kk' },
    { language: 'Uzbek', code: 'uz' },
    { language: 'Kirghiz', code: 'ky' },
  ];
  