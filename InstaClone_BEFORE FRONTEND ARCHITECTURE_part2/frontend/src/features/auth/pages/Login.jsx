import React from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {user, handleLogin , loading } = useAuth(); 
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    
    if(!username || !password){
      alert("Please fill in all fields");
      return;
    }

    await handleLogin(username, password)
    console.log("User logged in successfully");
    navigate("/home");

     if(loading){
        return(
            <main>

                <h1>Loading...</h1>

            </main>
        )
      
    }

  }

  return (
    <main>

      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          
          <input
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Username"
          />

          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />

          <button className="button primary-button" type="submit">Login btn</button>
          

        </form>
        <p className="toggle-auth-form-text">
            {" "}
            Don't have an account?{" "}
            <Link className="toggle-auth-form" to="/register">
              Register
            </Link>
          </p>

      </div>

    </main>
  );
};
export default Login;
