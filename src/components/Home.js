import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
const Home = (props) => {

    return (<>
        <AddNote showAlert={props.showAlert}/>
        <div className="container">
        <h2>Your Notes</h2>
           <Notes showAlert={props.showAlert}/>
           </div>
        </>
    )
}

export default Home
