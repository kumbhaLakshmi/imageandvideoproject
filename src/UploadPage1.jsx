import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadPage1 = () => {
  const { register, handleSubmit } = useForm();
  // const history = useHistory();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to another page (e.g., '/other-page')
    // history.push('/listing');
    navigate('/listing');

  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('thumbnail', data.thumbnail[0]);
      formData.append('video', data.video[0]);
      formData.append('title', data.title);
      formData.append('description', data.description);
      console.log('Upload successful. Response:', data);
      const response = await axios.post("http://localhost:9000/upload", formData);
      console.log('Upload successful. Response:', response);

      // Handle additional actions or update UI as needed
    } catch (error) {
      console.error('Error uploading files:', error);
      // Handle errors or update UI accordingly
    }
  };

  return (
    <>
      <h1 className='m-2'>Upload image and video</h1>
      <div className='d-flex '>
        <div className='ps-5 m-2 '>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title:</label>
            <input
              type='text'
              name='title'
              maxLength={50}
              {...register('title', { required: 'Title is required' })}
            />
            <br />
            <br />
            <label>Description:</label>
            <textarea
              name='description'
              maxLength={200}
              {...register('description', { required: 'Description is required' })}
            />
            <br />
            <br />
            <label>Upload Thumbnail (JPG or PNG):</label>
            <input
              type='file'
              accept='.jpg, .png'
              name='thumbnail'
              {...register('thumbnail', { required: 'Thumbnail is required' })}
            />
            <br />
            <br />
            <label>Upload Video (MPG, AVI, MP4):</label>
            <input
              type='file'
              accept='.mpg, .avi, .mp4'
              name='video'
              {...register('video', { required: 'Video is required' })}
            />
            <br />
            <br />
            <button type='submit'>Upload</button>
          </form>
        </div>
        <div style={{'marginRight':'55%'}}>
          <button onClick={handleButtonClick}>Listing</button>
        </div>
      </div>
    </>
  );
};

export default UploadPage1;
