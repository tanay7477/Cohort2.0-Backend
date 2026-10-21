import react from 'react'
import '../style/form.scss'
import {Link} from 'react-router'
import {useState} from 'react'
import axios from 'axios'
import {useAuth} from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = ()=>{

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    const {handleLogin , loading} = useAuth()
    const navigate = useNavigate()
    if(loading){
        return (
            <h1>loading...</h1>
        )
    }

    function handleSubmit (e){
        e.preventDefault()

        handleLogin(username ,password)
        .then(res=>{
            console.log(res)
            navigate("/")
        })

        // axios.post('http://localhost:3000/api/user/login',{
        //     username,
        //     password
        // },{withCredentials:true})
        // .then(res =>{
        //     console.log(res.data)
        // }) 
    }

    return (
        <main>
            <div className = "form-conatiner">
                <h1>Login</h1>
                <form onSubmit ={handleSubmit} >
                    <input onInput = {(e)=>{ setUsername(e.target.value)}}
                     type ="text" name ="username" placeholder="Enter username"/>
                    <input onInput = {(e)=>{ setPassword(e.target.value)}}
                    type ="password" name ="password" placeholder="Enter password"/>
                    <button type="submit" >Login</button>
                </form>
                 <p className="switch-text" > Already have an account? <Link to="/register">Register</Link></p>

            </div>
        </main>
    )
}

export default Login
