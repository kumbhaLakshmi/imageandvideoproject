import logo from './logo.svg';
import './App.css';
import UploadPage1 from './UploadPage1';
import ListingPage from './ListingPage2';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoDisplayPage3 from './VideoDIsplayPage3';
function App() {
  const [change, setChange] = useState();

  return (
    <>
      {/* <UploadPage/>
       <div>
        <button onClick={() => setChange(true)}></button>
       </div> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<UploadPage1/>} // Add this line
          >
            {/* <Route index element={<UploadPage1 />} /> */}
          </Route>
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/videodisplay/*" element={<VideoDisplayPage3 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
