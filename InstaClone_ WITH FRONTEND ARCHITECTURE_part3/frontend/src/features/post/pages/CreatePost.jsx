import{useState,useRef} from 'react'
import '../style/createpost.scss'
import {usePost} from '../hook/usePost'
import {useNavigate} from 'react-router'

const CreatePost =()=>{

    const navigate = useNavigate()

    const[caption , setCaption ]= useState("")
    const postImageInputFieldRef = useRef(null) //refrence diya image input filed ko 

    const {loading , handleCreatePost} =usePost()

    async function handleSubmit(e){
        e.preventDegfault()

        const file = postImageInputFieldRef.current.files[0] //means jo bhi user ne sabse pehli file select kri hai usse leke aao so 0 use kiya .we can select multiple files also
        
        await handleCreatePost(file,caption )

        navigate('/home')


    }
    if(loading){
        return(
            <main>
                <h1> creating post</h1>
            </main>
        )
    }

    return(

        <main className="create-post-page"> 
        <div className ="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label classname="post-image-label" htmlFor="postImage">Select image</label>
                <input ref={postImageInputFieldRef} hidden type="file" name="postImage" id="postImage"/> //is trah ke file type ko style ese kro 
                <input value={caption} onChange={(e)=>{setCaption(e.target.value)}}
                type="text" name="caption" id="caption" placeholder="enter caption"/>
                <button className="button primary-button">Create Post</button>
            </form>
        </div>
        </main>
    )
}
export default CreatePost