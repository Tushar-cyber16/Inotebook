import React, { useContext,useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
    const context = useContext(NoteContext);
    const { addnote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:""});

    const handleclick=(e)=>{
        e.preventDefault();
       addnote(note.title,note.description,note.tag);
       props.showalert("Note added successfully","success");
       setnote({title:"",description:"",tag:""});
    }


    const onChange=  (e)=> {
       setnote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form action="" className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={note.title}
              className="form-control"
              id="title"
              name='title'
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              value={note.description}
              className="form-control"
              id="description"
              name='description'
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            Tag
            </label>
            <input
              type="text"
              value={note.tag}
              className="form-control"
              id="tag"
              name='tag'
              onChange={onChange}
            />
          </div>
          <button  disabled={note.title.length<3 || note.description.length<5} type="submit" onClick={handleclick} className="btn btn-primary">
           AddNote
          </button>
        </form>
      </div>
    </div>
  );
};
