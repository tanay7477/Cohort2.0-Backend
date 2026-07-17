import React from 'react'
import { useState , useEffect } from 'react'
import axios from "axios"

const App = () => {

    const [notes , setNotes] = useState(
    [
        {
            title:"Unknow",
            description:"unknon",
            priority:"low"
        }
        
    ]
)   
     const [message, setMessage] = useState("");

     const [searchNotes, setSearchNotes] = useState(notes);

  function showSuccess() {
    setMessage("Note added successfully!");
    setTimeout(() => setMessage(""), 3000);
  }

  function showDelete() {
    setMessage("Note deleted successfully!");
    setTimeout(() => setMessage(""), 3000);
  }


async function formhandle(e){
   e.preventDefault()
   const {title , description , priority} = e.target.elements
   const result = await  axios.post("https://cohort2-0-backend-notesproject.onrender.com/api/notes/post-data",{
    title:title.value ,
     description:description.value,
     priority:priority.value

   })
   fetchData()
   showSuccess()
}

async function handleSearch(e){
    console.log(e.target.value)
    const result = notes.filter((val) => {
  return val.title.toLowerCase().includes(e.target.value.toLowerCase());
});

if (result.length === 0) {
  console.log("No search result found!");
}

setSearchNotes(result);


}


async function fetchData(){
    
   const result = await  axios.get("https://cohort2-0-backend-notesproject.onrender.com/api/notes/get-data")
   setNotes(result.data.notes)
   setSearchNotes(result.data.notes)
}

async function deleteData(noteid){
    const result = await axios.delete('https://cohort2-0-backend-notesproject.onrender.com/api/notes/delete-data/'+noteid)
    fetchData()
    showDelete()
}


 useEffect(()=>{
    fetchData()
 },[])


    //new learning is that , tum jo useEffect main blank array bna diya hai ab isskrn useffect kewal hr br component rerender hone pe chlega kewal 
    // agr data abse m main kuch bhi cheezein backend ke through add kr dunag to wo automatic frontend pe nhi aaega becoz react ko pta hi nhi chla ki state update hui hai 
    // iss krn useffect nhi chla 


  return (
    <div className="notesParent">

  {message && <div className="toast">{message}</div>}

        <form onSubmit={(e)=>{e.preventDefault()}}>
            <input onInput={(e)=>handleSearch(e)} type="text" placeholder="search by title..."></input>

        </form>

       <form onSubmit={(e)=>formhandle(e)}>
            <input type="text" name='title' placeholder="Enter title"></input>
            <input type="text" name='description' placeholder="Enter description"></input>
            
            <label>Priority</label>
                 <select name="priority">
                     <option value="high">High</option>
                     <option value="medium">Medium</option>
                     <option value="low">Low</option>
                 </select>
              <button type="submit"  >Add Note</button>
        </form> 
        
        {
            searchNotes.map((value)=>{
                return  <div key={value._id} className="noteCard">
                            <h1>{value.title}</h1>
                            <p>{value.description}</p>
                            <p>{value.priority}</p>

                         <button className = 'deleteBtn' onClick={()=> deleteData(value._id)}></button>
                            
                        </div>
            })
        }

      
     
    </div>
  )
}

export default App


