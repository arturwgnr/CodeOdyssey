import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";



export default function LoginPage() {
  
  const auth = useContext(AuthContext)!;
  const nav = useNavigate();

  console.log("Função login do contexto:", auth.login);

  function handleNavigate(e: React.MouseEvent) {
    e.preventDefault(); 
    nav("/register");  
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() =>  {
      if(auth.user !== null) {
      nav("/dashboard")
     }
  })

function handleLogin(e: React.FormEvent) {
  e.preventDefault();

     if(!username || !password) return;

     auth.login(username, password)

    console.log(username, password)
    setUsername('');
    setPassword('');
    console.log('test')
  }

  return (
    
    <div className="login-container">
      <Navbar />
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
          <button onClick={handleLogin} type="submit">Login</button>
        </form>
        <p>
          No account? <a onClick={handleNavigate} href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}