import React ,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function Signup (props) {
    const [credentials, setcredentials] = useState({name:"" ,email:"",password:"",cpassword:""});
    let history =useNavigate();
    const func = () => {
  
      if(localStorage.getItem('token')) {history("/");}
    }
   useEffect(() => {
  func();
  //eslint-disable-next-line 
   }, [])

    const onChange=  (e)=> {
        setcredentials({...credentials,[e.target.name]:e.target.value});
     }

     const handlesubmit =async (e) => {
        e.preventDefault(); 
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success) {
              // save the token 
              localStorage.setItem('token',json.authToken);
             // redirect 
                 history("/");
                 props.showalert("Account Created","success");
          }
          else{
            props.showalert("Enter Valid Credentials","danger");
          }
    }

  return (
    <div className="container mt-3">
      <h2>Create an account to use Inotebook</h2>
        <form onSubmit={handlesubmit}>
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" onChange={onChange} className="form-control" id="name" name="name" value={credentials.name}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" onChange={onChange} className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" onChange={onChange} className="form-control" id="password" value={credentials.password} name="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" onChange={onChange} className="form-control" id="cpassword" value={credentials.cpassword} name="cpassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  );
}
