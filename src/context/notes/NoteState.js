import NoteContext from "./NoteContext";
import {useState} from "react"
const NoteState = (props) =>{

  const host="http://localhost:5000";
   const noteInitial = [];
   const [notes, setnotes] = useState(noteInitial);


   // get all notes 
   const getallnotes = async () => {

    // api call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: 'GET', 
     headers: {
       'Content-Type': 'application/json',
       "auth-token": localStorage.getItem('token')
     },
   });
   const json= await response.json();
  //  console.log(json);
   setnotes(json);
      }


   // ADD NOTE
   const addnote = async (title,description,tag) => {

 // api call 
 const response = await fetch(`${host}/api/notes/addnote`, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
    "auth-token": localStorage.getItem('token')
  },
  body: JSON.stringify({title,description,tag})
});
const newnote=await response.json();
setnotes(notes.concat(newnote));
   }

   // DELETE NOTE
   const deletenote = async(id) => {
     // api call 
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json= await response.json();
    
      // console.log("deleting note with " + id);
      const newnote= notes.filter((notes)=>{return notes._id!==id});
      setnotes(newnote);
   }

   // EDIT NOTE
   const editnote = async (id ,description,title,tag) => {
       
    // api call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({id,description,title,tag}) 
    });
  
    const json=await response.json();
// console.log(json);
   const newnotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if(element._id===id){
        newnotes[index].title=title;
        newnotes[index].description=description;
        newnotes[index].tag=tag;
        break;
      }
    }
    setnotes(newnotes);
   }
   return (
   <NoteContext.Provider value={{notes,addnote,deletenote,editnote,getallnotes}}>
       {props.children};
   </NoteContext.Provider>
   );
}

export default NoteState;