import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const theme = useContext(ThemeContext);

  const nav = useNavigate();

  function handleMainPage() {
    nav('/')
  }

  return (
    <nav className="navbar">
      <div onClick={handleMainPage}     className="navbar-logo">Code Odyssey.</div>

      <ul className="navbar-menu">
        <li><a href="#">Services</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div className="navbar-actions">
        <a href="/login" className="nav-link">Login</a>
        <a href="/register" className="nav-link">Register</a>
        <button onClick={theme?.toggleTheme} className="theme-toggle">
          {theme?.theme === "light" ? "🌙" : "🌞"}
        </button>
      </div>
    </nav>
  );
}
