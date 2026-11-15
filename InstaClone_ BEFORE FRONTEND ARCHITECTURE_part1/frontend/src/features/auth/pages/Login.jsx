import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

const Login = () => { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    
    async function handleSubmit(e) { 
        e.preventDefault(); 
        try { const res = await axios.post( 'http://localhost:3000/api/auth/login', 
            { email, password } ); 
            console.log(res.data); 
        } 
            catch (error) { console.error( 'Error sending data:', error.response?.data || error.message ); } }

    return(
        
    <main>
        <div className='form-container'>

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input onInput={(e) => setUsername(e.target.value)} type="text" name ="username" placeholder='Username' />
                <input onInput={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' />
                <button type="submit">Login btn</button>
                <p> Don't have an account? <Link className="toggle-auth-form" to="/register">Register</Link></p>
            </form>

        </div>
    </main>
        

    )
}
export default Login