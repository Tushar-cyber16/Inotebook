import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
   const {notes,updateNotes,showalert}=props;
   const context = useContext(NoteContext);
    const { deletenote} = context;
   const confirm_delete = (e) => {
     if(window.confirm("Are you sure you want to delete this note?")) 
     {deletenote(notes._id); showalert("Note deleted successfully","success"); }
   }
  return (
    <div className="col-md-3">
        
        <div className="card my-3">
 
  <div className="card-body">
    <h5 className="card-title"> {notes.title}</h5>
    <p className="card-text">{notes.description}.</p>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNotes(notes)}}></i>
    <i className="fa-solid fa-trash-can mx-2" onClick={confirm_delete}></i>
  </div>
</div>
    </div>
  )
}
