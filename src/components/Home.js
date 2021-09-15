import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
const Home = () => {

    return (<>
        <AddNote/>
        <div className="container">
        <h2>Your Notes</h2>
           <Notes/>
           </div>
        </>
    )
}

export default Home
