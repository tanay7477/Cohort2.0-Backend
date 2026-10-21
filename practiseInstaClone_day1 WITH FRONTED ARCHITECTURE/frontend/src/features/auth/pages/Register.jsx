import { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

const Register = () => {
 const { handleRegister } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("REGISTER FORM DATA:", username, email, password);

  await handleRegister(username, email, password);

    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            name="username"
            placeholder="Enter name"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            placeholder="Enter email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name="password"
            placeholder="Enter password"
          />

          <button type="submit">Register</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;