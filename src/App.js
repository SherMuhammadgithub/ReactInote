import './App.css';
import Home from './componenets/Home';

import Navbar from './componenets/Navbar';
import React, { useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './componenets/Alert';
import Signup from './componenets/Signup';
import Login from './componenets/Login';

function App() {
  const [alert , setAlert] = useState(null);
  const showAlert = (message , type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      showAlert(null);
    }, 5000);

  }
  return (
    <>     
     {/* <h1>Creating React Inote-Book Project </h1> */}
    {/* <Home/> */}

    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert = {alert}/>


    <div className="container" >
      <Routes>
      <Route path="/" element={<Home showAlert = {showAlert}/>} />
<Route path="/login" element={<Login showAlert = {showAlert} />} />

<Route path="/signup" element={<Signup showAlert = {showAlert}/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
    
    </>

  );
}

export default App;
