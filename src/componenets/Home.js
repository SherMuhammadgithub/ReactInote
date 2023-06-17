
import Notes from './Notes';
import React from 'react';

const Home = (props) => {
  const {showAlert} = props;
 
 

  return (
   
    <>

    
<Notes showAlert = {showAlert}/>

</>
  )
}

export default Home
