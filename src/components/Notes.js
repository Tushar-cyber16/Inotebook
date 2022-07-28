import React, { useContext,useEffect ,useRef,useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
export default function Notes(props) {
  const context = useContext(NoteContext);
  const { notes,getallnotes,editnote} = context;
  const [note, setnote] = useState({_id:"" ,title:"",description:"",tag:""});
  const ref = useRef(null);
  const refclose = useRef(null);
  let history =useNavigate();
  const onChange=  (e)=> {
     setnote({...note,[e.target.name]:e.target.value});
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
    getallnotes();
    }
    else
    {
      history("/login");
    }
    //eslint-disable-next-line 
  }, [])
  const updateNotes = (currentnote) => {
      ref.current.click();
      setnote(currentnote);
  }
  const handleclick = (e) => {

    // console.log("updating the node");
    editnote(note._id,note.description,note.title,note.tag);
    props.showalert("Updated successfully","success");
    refclose.current.click();
  }

  return (
    <>
      <AddNote showalert={props.showalert}/>
<button style={{display:"none"}} ref={ref} ype="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  edit note
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <form action="" className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name='title'
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
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
              className="form-control"
              id="description"
              name='description'
              onChange={onChange}
              value={note.description}
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
              className="form-control"
              id="tag"
              name='tag'
              onChange={onChange}
              value={note.tag}
            />
          </div>
        </form>

      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.title.length<3 || note.description.length<5} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

      <div className="row my-3">
        <h2>your notes</h2>
        <div className="container">
          {notes.length===0 && 'No notes to display.'}
          </div>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} updateNotes={updateNotes} showalert={props.showalert} notes={notes}/>;
        })}
      </div>
    </>
  );
}
