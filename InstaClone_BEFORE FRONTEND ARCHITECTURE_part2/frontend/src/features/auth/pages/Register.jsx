
import React, { useState } from 'react';
import '../style/form.scss';
import { Link , useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { handleRegister, loading } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        

        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        if(!email.includes("@")){
            alert("Please enter a valid email address");
            return;
        }

        if(password.length < 6){
            alert("Password must be at least 6 characters long");
            return;
        }

        await handleRegister(username, email, password);
        console.log('User registered successfully');
        navigate('/home');

        
    }
    if (loading) {
            return (
                <main>
                    <h1>Loading...</h1>
                </main>
            );
        }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="button primary-button" type="submit">Register</button>
                </form>

                <p className="toggle-auth-form-text">
                    Already have an account?{' '}
                    <Link className="toggle-auth-form" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
