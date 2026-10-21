import react from 'react'
import '../style/form.scss'
import {Link} from 'react-router'
const Login = ()=>{
    return (
        <main>
            <div className = "form-conatiner">
                <h1>Login</h1>
                <form>
                    <input type ="text" name ="username" placeholder="Enter username"/>
                    <input type ="password" name ="password" placeholder="Enter password"/>
                    <button type="submit" >Login</button>
                </form>
                 <p className="switch-text" > Already have an account? <Link to="/register">Register</Link></p>

            </div>
        </main>
    )
}

export default Login
