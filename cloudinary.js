// @ts-ignore
// const dotenv = require('dotenv');
import dotenv from 'dotenv'
dotenv.config({path:"./env"});
// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from 'cloudinary';console.log('Environment Variables Before Config:', process.env.CLOUDINARY_NAME);
// console.log('All Environment Variables:', process.env);


cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: "dqjtjdihl",
    api_key: "337277926429738",
    api_secret: "etvLczXiXml320EQFKRxYVC4unI",
});

console.log('Cloudinary Configuration:', cloudinary.config());


// module.exports = { cloudinary };
export default cloudinary