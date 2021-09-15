import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import noteContext from "../context/noteContext";
import NoteItem from "./NoteItem";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, fetchNotes, updateNote } = context;
  let history=useHistory();
  useEffect(() => {
      if(localStorage.getItem('token')){
        fetchNotes();
      }
      else{
          history.push("/login")

      }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "general",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const editNote = (note) => {
    ref.current.click();
    setnote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };
  const OnChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const update = (e) => {
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Notes Updated Successfully","success")
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Note here
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="container my-3">
                <div className="mb-2">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add Title here"
                    onChange={OnChange}
                    minLength={5}
                    required
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Add Description here"
                    minLength={5}
                    required
                    onChange={OnChange}
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add tag here"
                    onChange={OnChange}
                    id="etag"
                    name="etag"
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={update}
                className="btn btn-primary"
                disabled={note.etitle.length<5 || note.edescription.length<5}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={editNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
