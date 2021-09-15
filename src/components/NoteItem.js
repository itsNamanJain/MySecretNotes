import React,{useContext} from 'react'
import noteContext from '../context/noteContext';
const NoteItem = (props) => {
    const context  = useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;
    return (
        <div className="col-md-4">
            <div className="card my-3 mx-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>
    <button className="btn btn-primary mx-2 mt-2" onClick={()=>{updateNote(note)}}>Edit</button>
    <button className="btn btn-primary mx-2 mt-2" onClick={()=>{deleteNote(note._id)}}>Delete</button>
  </div>
</div>
        </div>
    )
}

export default NoteItem