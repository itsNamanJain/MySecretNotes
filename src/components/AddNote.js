import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "Personal",
  });
  const AddN = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({title:"",description:"",tag:""})
  };
  const OnChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="container my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add Title here"
              onChange={OnChange}
              minLength={5}
              required
              id="title"
              name="title"
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              placeholder="Add Description here"
              onChange={OnChange}
              minLength={5}
              required
              value={note.description}
              id="description"
              name="description"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add tag here"
              onChange={OnChange}
              value={note.tag}
              id="tag"
              name="tag"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={AddN}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
