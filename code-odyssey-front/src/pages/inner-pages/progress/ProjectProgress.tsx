import TopBarDash from "../../../components/TopBarDash";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectProgress() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function handleAddProject(e) {
    e.preventDefault();
    if (!newProject) return;

    const newEntry = {
      id: Date.now(),
      name: newProject,
      status: "Not Started",
      progress: 0,
    };

    setProjects([...projects, newEntry]);
    setNewProject("");
  }

  const nav = useNavigate();

  return (
    <div className="projects-container">
      <TopBarDash />
      <h1>🚀 Projects Progress</h1>
      <p className="subtitle">Track your coding projects and how far you’ve come.</p><br />

      <form onSubmit={handleAddProject} className="project-form">
        <input
          type="text"
          placeholder="Project name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button type="submit">➕ Add</button>
      </form>

      <div className="project-list">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.name}</h3>
            <p>Status: {p.status}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${p.progress}%` }} />
            </div>
            <span>{p.progress}%</span>
          </div>
        ))}
      </div><br />

       <button className="back-btn" onClick={() => nav("/dashboard/progress")}>
        ⬅ Back to Progress
      </button>
    </div>
  );
}
