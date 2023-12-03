// ListingPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams,useLocation } from 'react-router';
const ListingPage = () => {
  const location = useLocation();
  const { pathname } = location;
console.log("this is working");
  // Now `pathname` contains the full URL, including the path
  // For example, if the URL is "http://localhost/3000/reactcloudinaryfolder/cricket",
  // then `pathname` will be "/reactcloudinaryfolder/cricket"

  // Do something with the full path, e.g., split it to get the publicId
  const pathParts = pathname.split('/');
  const publicId = pathParts[pathParts.length - 1];
  const [video, setVideo] = useState()
  console.log("this useeffect from the video display555555555555555555555555555", publicId);
  const [items, setItems] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch items from MongoDB
    axios.get('http://localhost:9000/images').then((response) => {
      setItems(response.data.images);
      console.log("response form the response",response.data);
    });
  }, []);
  const handleGetVideos=(publicId)=>{

    // navigate('/videodisplay/:publicId')
    navigate(`/videodisplay/${publicId}`);


  }

  return (
    <div className='p-5'>
      <h1>Listing Page</h1>
      {items?.length>0 && items.map((item) => (
        <div key={item._id}>
          <img src={item.imageUrl} alt={item.publicId} style={{'width':"500px","height":"350px"}} onClick={()=>handleGetVideos(item.publicId)} />
          <h2 onClick={()=>handleGetVideos(item.publicId)}>{item.imagetitle?.custom?.title}</h2>
          {/* Link to Web Page 3 with item._id */}
        </div>
      ))}
    </div>
  );
};

export default ListingPage
