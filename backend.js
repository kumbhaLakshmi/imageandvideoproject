import fs from 'fs'
// const cors=require('cors')
import cors from 'cors'
import express from 'express'
// const express=require('express');
import multer from 'multer'

// console.log('Environment Variables Before Config:', process.env.cloudinary_api_key);

// console.log('Environment Variables After Config:', process.env.cloudinary_api_key);
// const {cloudinary} =require('./utils/cloudinary')
import cloudinary from './utils/cloudinary.js'
// dotenv.config(); // Load environment variables from .env
// console.log("checking environmental in backend",process.env.cloudinary_cloud_name); // Check if this prints the correct value
// console.log(process.env.cloudinary_api_key,"backend.js");
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });
const app = express()
app.use(cors())
app.use(express.json()); // Add this line to parse JSON in the request body

app.get("/", (req, res) => {


  console.log("this is getting");
  res.send("this is working")
})

app.post('/upload', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]), async (req, res) => {
  try {
    const uploadedThumbnail = req.files['thumbnail'][0];
    const uploadedVideo = req.files['video'][0];
    const title = req.body.title; // Extract title from the request body
    const description = req.body.description; // Extract description from the request body

    // console.log('Uploaded thumbnail******************************************************:', uploadedThumbnail);
    // console.log('Uploaded video*******************************************************:', uploadedVideo);
    // console.log('Title*****************************************************************:', title);
    // console.log('Descriptio*********************************************n:', description);

    const thumbnailStream = cloudinary.uploader.upload_stream(
      {
        upload_preset: "react_cloudinary",
        resource_type: 'image', // Specify the resource type (image)
        use_filename: true, // Use the original filename
        unique_filename: false, // Do not append a unique identifier to the filename
        public_id: title, // Use the title as the public_id
        context: { title, description } // Pass title and description as context
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading thumbnail:", error);
          res.status(500).json({ error: 'Error uploading thumbnail' });
        } else {
          // console.log("Thumbnail response:", result);
          // Handle any additional actions related to the thumbnail upload
        }
      }
    );

    const videoStream = cloudinary.uploader.upload_stream(
      {
        upload_preset: "react_cloudinary",
        resource_type: 'video', // Specify the resource type (video)
        use_filename: true, // Use the original filename
        unique_filename: false, // Do not append a unique identifier to the filename
        public_id: title, // Use the title as the public_id
        context: { title, description } // Pass title and description as context
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading video:", error);
          res.status(500).json({ error: 'Error uploading video' });
        } else {
          console.log("Video response:", result);
          // Handle any additional actions related to the video upload
        }
      }
    );

    thumbnailStream.end(uploadedThumbnail.buffer);
    videoStream.end(uploadedVideo.buffer);

    // Process and store the files along with title and description

    res.json({ message: 'Files uploaded successfully' });
  } catch (error) {
    // console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/images', async (req, res) => {
  try {
    const options = {
      colors: true,
      context: true,
      type: 'upload', // Filter by upload type
      prefix: "reactcloudinaryfolder", // Filter by folder

    };
    // Fetch all resources from Cloudinary
    const result = await cloudinary.api.resources(options);

    // console.log('Cloudinary API result:', result);

    // Extract relevant information from the result for images
    const images = result.resources
      .filter(resource => resource.type === 'upload')
      .map(resource => {
        // Log the resource object
        // console.log('Resource***********************************************:', resource);
        // Return the desired structure for the mapped object
        return {
          publicId: resource.public_id,
          imageUrl: resource.url,
          imagetitle: resource.context
        };
      });
    // Send the list of images in the response
    res.json({ images });
    // console.log("images", images[1]);
  } catch (error) {
    // console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal server error' });
    console.log("error image showing", error);
  }
});

app.get('/getvideos', async (req, res) => {
  try {
    const { publicId } = req.query; // Use req.query to get the publicId from the query parameters
    console.log("Public ID:", publicId);
    const videoInfo = await cloudinary.api.resource(publicId, { resource_type: 'video' });
    console.log('Video Info:', videoInfo);

    res.json(videoInfo);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







app.listen(9000, () => console.log('Example app is listening on port 9000.'));


