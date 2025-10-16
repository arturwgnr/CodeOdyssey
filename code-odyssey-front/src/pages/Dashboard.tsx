import TopBarDash from "../components/TopBarDash";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const username = auth?.user?.username ?? "Guest";

  const nav = useNavigate();

  function handleNav(path: string) {
    nav(`/dashboard/${path}`);
  }

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips = [
  { text: "Remember: Consistency beats intensity. Keep coding daily." },
  { text: "Remember: Small steps compound into big progress." },
  { text: "Remember: Show up, even when motivation fades." },
  { text: "Remember: Patience is the hidden engine of growth." },
  { text: "Remember: Every bug fixed is a lesson learned." },
  { text: "Remember: Progress is built one line of code at a time." },
  { text: "Remember: Habits will carry you further than inspiration." },
  { text: "Remember: The grind today is the glory tomorrow." },
  { text: "Remember: Focus on learning, success will follow." },
  { text: "Remember: Coding is a marathon, not a sprint." },
  { text: "Remember: Growth comes from discomfort—don’t avoid it." },
  { text: "Remember: Sharpen your skills daily, like a blade." },
  { text: "Remember: Curiosity keeps the journey alive." },
  { text: "Remember: Discipline is the ultimate programming skill." },
  { text: "Remember: Win the day, then repeat tomorrow." }];

  function handleChangeTip() {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length)
  }

  return (
    <div className="dashboard-container">
      <TopBarDash />

      <div className="dashboard-content">
        <h1>Welcome back, @{username}!</h1>

        {/* Top grid with small cards */}
        <div className="dashboard-grid">
          {/* Progress Card */}
          <div
            onClick={() => handleNav("progress")}
            id="progress"
            className="dashboard-card-1"
          >
            <h2>📊 Progress</h2>
            <p>Coming soon: topics studied and evolution.</p>
          </div>

          {/* Streak Card */}
          <div
            onClick={() => handleNav("streak")}
            id="streak"
            className="dashboard-card-2"
          >
            <h2>🔥 Streak</h2>
            <p>You are on day X of your journey!</p>
          </div>

          {/* Notes Card */}
          <div
            onClick={() => handleNav("notes")}
            id="notes"
            className="dashboard-card-3"
          >
            <h2>📝 Notes</h2>
            <p>Quick notes will appear here.</p>
          </div>
        </div>

        {/* Big card below grid */}
        <div onClick={handleChangeTip} className="dashboard-carousel">
          <div className="carousel-card">
            <h2>💡 Tip of the Day</h2>
            <p>{tips[currentTipIndex].text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
