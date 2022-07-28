import React,{useEffect,useState} from 'react'
// import NoteContext from '../context/notes/NoteContext'


export default function About() {
  // const a = useContext(NoteContext);
  const [json, setjson] = useState({});
                const userData = async() =>{
  const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
  });
   const x= await response.json();
   setjson(x);
}
useEffect(() => {
 userData();
 //eslint-disable-next-line 
}, [])

  return (
    <div style={{width:"30%"}}>
      <div className="card" >
  <img className="card-img-top" height="140px" src="https://thumbs.dreamstime.com/z/emotion-characters-186208484.jpg" alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Profile</h5>
    <p className="card-text">Name: <b>{json.name}</b></p>
    <p className="card-text">Email: <b>{json.email}</b></p>
  </div>
</div>
    </div>
  )
}
