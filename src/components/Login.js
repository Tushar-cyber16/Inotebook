import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let history =useNavigate();
  const func = () => {
  
    if(localStorage.getItem('token')) {history("/");}
  }
 useEffect(() => {
func();
//eslint-disable-next-line 
 }, [])
 
const [credentials, setcredentials] = useState({email:"",password:""})
const onChange=  (e)=> {
    setcredentials({...credentials,[e.target.name]:e.target.value});
 }
    const handlesubmit =async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success) {
              // save the token 
              localStorage.setItem('token',json.authToken);
             // redirect 
                 history("/");
                 props.showalert("Logged in","success");
          }
          else{
              props.showalert("Invalid Credentials","danger");
          }
    }
  return (
    <div className="mt-3">
      <h2>Login to continue to Inotebook</h2>
<form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input value={credentials.email} onChange={onChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input value={credentials.password} onChange={onChange} type="password" className="form-control" name="password"  id="password"/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}
