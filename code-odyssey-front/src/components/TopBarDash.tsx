import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function TopBarDash() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const nav = useNavigate();

  function handleMainPage() {
    nav("/dashboard");
  }

  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
    auth?.logout();
    nav("/login");
  }
}

  const username = auth?.user?.username ?? "Guest";

  return (
    <nav className="navbar">
      
      <div onClick={handleMainPage} className="navbar-logo cursor-pointer">
        🏠︎
      </div>

      
      <div className="navbar-actions">
        <span className="nav-username">@{username}</span>
        <button className="config-btn">⚙️</button>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <button onClick={theme?.toggleTheme} className="theme-toggle">
          {theme?.theme === "light" ? "🌙" : "🌞"}
        </button>
      </div>
    </nav>
  );
}
