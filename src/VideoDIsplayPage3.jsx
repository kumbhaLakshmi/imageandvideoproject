import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";


const VideoDisplayPage3 = () => {
  // const { publicId } = useParams()
  const location = useLocation();
  const { pathname } = location;
  console.log("this is working");
  // Now `pathname` contains the full URL, including the path
  // For example, if the URL is "http://localhost/3000/reactcloudinaryfolder/cricket",
  // then `pathname` will be "/reactcloudinaryfolder/cricket"

  // Do something with the full path, e.g., split it to get the publicId
  const pathParts = pathname.split('/');
  const publicId = pathParts.slice(2).join('/'); // Skip the first two parts and join the rest
  const [video, setVideo] = useState();

  console.log("this useeffect from the video display555555555555555555555555555", publicId);

  useEffect(() => {
    console.log("this useeffect from the video display555555555555555555555555555", publicId);
    // axios.get('http://localhost:9000/getvideos',publicId).then(Response=>{
    //     console.log("response from the videodisplay",Response);
    //     setVideo(Response.data)
    // })
    // axios.get(`http://localhost:9000/getvideos/${publicId}`).
    axios.get(`http://localhost:9000/getvideos`, {
      params: {
        publicId: publicId + "",
      }
    })
      .then(response => {
        console.log("response from the videodisplay", response);
        console.log("55555555555555555555555555", response.data.secure_url);
        setVideo(response.data.url);
      })
      .catch(error => {
        console.error("Error fetching video:", error);
      });
  }, [])



  return (
    <>
      <h2>video playing</h2>
      <div className="m-5">
        <video src={video} controls autoPlay loop style={{  'height': '600px','width':'100%' }}>
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  )
}


export default VideoDisplayPage3