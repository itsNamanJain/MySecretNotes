import React,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState= (props)=>{
  const host = "http://localhost:5000";
    const initialNotes = [];
      const [notes, setnotes] = useState(initialNotes);
// Get All notes
const fetchNotes = async()=>{
  // Api
  const url = `${host}/api/notes/fetchNotes`;
  const response = await fetch(url, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },

  });
  const json=await response.json();
  setnotes(json);
}
    
// Add Notes
      const addNote = async(title,description,tag)=>{
        // Api
        const url = `${host}/api/notes/addNotes`;
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
        // Logic
        const note = await response.json();
        setnotes(notes.concat(note));
      }
      const deleteNote = async (id)=>{

        //Api Call
        const url = `${host}/api/notes/deleteNotes/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json =  await response.json();
        console.log(json);

        const newNote = notes.filter((note)=>{return note._id!==id})
        setnotes(newNote);
      }
      const updateNote = async(id,title,description,tag)=>{

        //Api Call
        const url = `${host}/api/notes/updateNotes/${id}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
        const json=await response.json();
        console.log({json});
        //Logic
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id)
          {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
          }
        }
        setnotes(newNotes);
      }
    return (<NoteContext.Provider value={{notes,addNote,deleteNote,updateNote,setnotes,fetchNotes}}>
       { props.children}
    </NoteContext.Provider>)
}
export default NoteState;