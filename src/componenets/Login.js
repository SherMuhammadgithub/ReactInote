import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials , setCredentials] = useState({email: "" , name: ""});
    let history = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              
            },
            body: JSON.stringify({email: credentials.email , name: credentials.name })

            
      
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect 
            localStorage.setItem('token' , json.authtoken)
            props.showAlert("Logged in successfully  " , "success")
            history("/");

          

          }
          else{
        
            props.showAlert("Invalid Credentals  " , "danger")
           }
       

    }
    const onChange = (e)=>{
        setCredentials({...credentials , [e.target.name]: e.target.value})
  
    }
  return (
    <div className='container'>
    <h2 className='mb-2 mt-2'>Login to Continue to Inote-book😀</h2>
   <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlfor="email" className="form-label">Email address</label>
    <input  onChange={onChange} type="email" value={credentials.email} className="form-control border-success border-2 border-dashed" id="email" name='email' aria-describedby="emailHelp"  minLength={5} required/>
    <div id="emailHelp" className="form-text" style={{ "font-family": "'Carter One', cursive" }}>We'll never share your email with anyone else.🙃</div>
  </div>
  <div className="mb-3">
    <label htmlfor="name" className="form-label">UserName</label>
    <input onChange={onChange}  type="name" value={credentials.name} className="form-control border-success border-2 border-dashed" id="name" name='name'  minLength={5} required/>
    <div id="emailHelp" className="form-text" style={{ "font-family": "'Carter One', cursive" }}>We'll never share your UserName with anyone else.🙃</div>
  </div>
  <button type="submit" className="btn btn-success">Login</button>
</form>
      
    </div>
  )
}

export default Login
