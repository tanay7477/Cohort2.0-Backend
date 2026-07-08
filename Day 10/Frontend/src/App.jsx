import './index.css'
import { useEffect, useState } from 'react'

import React from 'react'
import axios from 'axios'

const App = () => {

const[ notes, setNotes] = useState([


  {
      title:"test title 1",
      description:"test description"
  },
  {
      title:"test title 2",
      description:"test description"
  },
  {
      title:"test title 3",
      description:"test description"
  },
  {
      title:"test title 4",
      description:"test description"
  }
])

function fetchNotes(){
axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
  console.log(res.data.note)
  //copy main kuch note hai usse pdho then come here
  setNotes(res.data.note)
    })
}

useEffect(()=>{
  console.log("helllllllllllo");
  fetchNotes()
  
  },[])

  function handleSubmit(e){
    e.preventDefault()

    const{ title, description} =e.target.elements
    console.log(title.value,description.value )

    axios.post('http://localhost:3000/api/notes',{
       title:title.value ,
     description:description.value
    }
    
    )
    .then(res=>{
  fetchNotes()
      
      console.log(res.data)
    })
  }

  function handleDelete(noteId){
  axios.delete('http://localhost:3000/api/notes/'+noteId)
    .then( res=>{
      console.log(res.data)
  fetchNotes()


    })

  }


  


/* PROBLEM HAPPENING HERE UNDERSTAND IT IS IMP...*/
//imp learning agr tum yahan useEffect use nhi krogwe to tumne jo app function m console.llog res.note.data likha hai
//tum dekh rhe hoge databse m dataa kewal 6 yah 7 hai to axios bar bar data call kre jaa rha hai means axios bar bar chle jaa rha hai
//reason of this is that ppehli bar jab app chlaya react ne to axios ne api call kri backend se  data aya useState m dal diya to yaha state chnage hui 
// jab bhi state chnage hogi react app ko dabar cll kr dega daba data aega backend se wo console pe dobara dikhega 
// yhaan useeffect bar bar rerender nhi rokta wo bas api call ko control krta
//becoz bar bar rerender hona to react ka kam h jab bhi state change hogi tab
  return (
    <>
      <div className="notes">
         <form className="note-form" onSubmit={handleSubmit}>
        <input type='text' name="title" placeholder="Enter title"/>
       <input type='text' name="description" placeholder="Enter description"/>
       <button>Create Note</button>
    </form>

       { notes.map((note )=>{
        return  <div key ={note._id} className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
<button className="delete-btn" onClick={() => handleDelete(note._id)}>
  Delete
</button>
        </div>
       })}
      </div>
    </>
  )

}
export default App
