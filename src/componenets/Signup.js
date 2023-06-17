import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [credentials , setCredentials] = useState({email: "" , name: "" , password: "" , cpassword: "" });
  let history = useNavigate();


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {name , email , password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify({name , email  , password})

        
  
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //save the auth token and redirect 
        localStorage.setItem('token' , json.authtoken)
        history("/");
        props.showAlert("Account created Successfully  " , "success")

      }
      else{
        
       props.showAlert("A user with this email already exists  " , "danger")
      }

}
const onChange = (e)=>{
    setCredentials({...credentials , [e.target.name]: e.target.value})

}
  return (
    <div>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
  <h2 className='mb-2 mt-2'>Welcome to Inote-book😀</h2>
    <label htmlfor="name" className="form-label">Name</label>
    <input name='name' type="text"  onChange={onChange} className="form-control border-success border-2 border-dashed" id="name" aria-describedby="emailHelp"  minLength={5} required/>
    <div id="emailHelp" className="form-text" style={{ "font-family": "'Carter One', cursive" }}>We'll never share your informations with anyone else.🙃</div>
  </div>
  <div className="mb-3">
    <label htmlfor="email" className="form-label">Email address</label>
    <input name='email' type="email" onChange={onChange} className="form-control border-success border-2 border-dashed" id="email" aria-describedby="emailHelp"  minLength={5} required/>
    <div id="emailHelp" className="form-text" style={{ "font-family": "'Carter One', cursive" }}>We'll never share your informations with anyone else.🙃</div>
  </div>
  <div className="mb-3">
    <label htmlfor="password" className="form-label">Password</label>
    <input name='password' type="password" onChange={onChange}  className="form-control border-success border-2 border-dashed" id="password" minLength={5} required/>
    <div id="emailHelp" className="form-text" style={{ "font-family": "'Carter One', cursive" }}>We'll never share your informations with anyone else.🙃</div>

    
  </div>
  
 
  <button type="submit" className="btn btn-success">Signup</button>
</form>
    </div>
  )
}

export default Signup
