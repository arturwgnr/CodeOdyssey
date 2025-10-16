import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Hero from "./components/Hero";
import Notes from "./pages/inner-pages/Notes";
import Progress from "./pages/inner-pages/Progress";
import Streak from "./pages/inner-pages/Streak";
import SkOverview from "./pages/inner-pages/progress/SkOverview";
import StAnalytics from "./pages/inner-pages/progress/StAnalytics";
import ProjectProgress from "./pages/inner-pages/progress/ProjectProgress";


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Hero/>} ></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/notes" element={<Notes />} />
        <Route path="/dashboard/progress" element={<Progress />} />
        <Route path="/dashboard/streak" element={<Streak />} />

        <Route path="/progress/skills-overview" element={<SkOverview/>} />

        <Route path="/progress/study-analytics" element={<StAnalytics/>} />

        <Route path="/progress/projects-progress" element={<ProjectProgress/>}  />
      </Routes>
    </Router>
</AuthProvider>
  );
}

export default App;