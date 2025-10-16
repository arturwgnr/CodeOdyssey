import TopBarDash from "../../components/TopBarDash";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface StudyLog {
  id: number;
  date: string; // YYYY-MM-DD
  topic: string;
  duration: number; // minutos
}

export default function Streak() {
  const auth = useContext(AuthContext);
  const userId = auth?.user?.id || "guest";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // 🔹 Logs específicos por usuário
  const [logs, setLogs] = useState<StudyLog[]>(() => {
    const saved = localStorage.getItem(`${userId}-studyLogs`);
    return saved ? JSON.parse(saved) : [];
  });

  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");

  // frases motivacionais
  const sentences = [
    { text: "Discipline over motivation." },
    { text: "Small steps, big results." },
    { text: "Show up, even on bad days." },
    { text: "Progress loves patience." },
    { text: "Routine builds resilience." },
    { text: "One day at a time." },
    { text: "Consistency compounds success." },
    { text: "Habits shape destiny." },
    { text: "The grind is the glory." },
    { text: "Win the day, every day." },
  ];

  // animação frases
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sentences.length);
        setFade(false);
      }, 600);
    }, 10000);
    return () => clearInterval(interval);
  }, [sentences.length]);

  // salvar logs
  useEffect(() => {
    localStorage.setItem(`${userId}-studyLogs`, JSON.stringify(logs));
  }, [logs, userId]);

  // streak persistente por usuário
  const [streakCount, setStreakCount] = useState<number>(() => {
    const saved = localStorage.getItem(`${userId}-streakCount`);
    return saved ? JSON.parse(saved) : 0;
  });

  const [lastDate, setLastDate] = useState<string | null>(() => {
    return localStorage.getItem(`${userId}-lastDate`) || null;
  });

  useEffect(() => {
    localStorage.setItem(`${userId}-streakCount`, JSON.stringify(streakCount));
    if (lastDate) {
      localStorage.setItem(`${userId}-lastDate`, lastDate);
    }
  }, [streakCount, lastDate, userId]);

  // adicionar check-in
  function handleCheckIn(e: React.FormEvent) {
    e.preventDefault();
    if (!topic || !duration) return;

    const today = new Date().toISOString().split("T")[0];
    const newLog: StudyLog = {
      id: Date.now(),
      date: today,
      topic,
      duration: Number(duration),
    };

    setLogs([...logs, newLog]);
    setTopic("");
    setDuration("");
  }

  function handleDelete(id: number) {
    const saved = logs.filter((i) => i.id !== id);
    setLogs(saved);
  }

  function formatDuration(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h${m > 0 ? `${m}m` : ""}` : `${m}m`;
  }

  // streak control
  function getYesterday(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }

  function handleStreakControl() {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = getYesterday();

    if (!topic || !duration) return;

    if (lastDate === today) {
      console.log("Already logged today");
      return;
    }

    if (lastDate === yesterday) {
      // sequência mantida → incrementa
      setStreakCount((prev) => prev + 1);
      setLastDate(today);
      console.log("Streak incremented!");
    } else {
      // quebra de sequência → reseta
      setStreakCount(1);
      setLastDate(today);
      console.log("Streak reset!");
    }
  }

  return (
    <div className="streak-container">
      <TopBarDash />

      <div className="streak-content">
        <h1>{streakCount}🔥 Your Streak</h1>
        <p className="streak-subtitle">Keep the fire alive!</p>

        {/* streak atual */}
        <div className="streak-current">
          <h2>{streakCount} Days Logged</h2>
        </div>

        {/* formulário check-in */}
        <form onSubmit={handleCheckIn} className="streak-form">
          <input
            type="text"
            placeholder="Topic studied"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            type="number"
            placeholder="Duration (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <button
            onClick={handleStreakControl}
            type="submit"
            className="streak-btn"
          >
            ✅ Mark today as done
          </button>
        </form>

        {/* logs recentes */}
        <div className="streak-log-preview">
          <h3>Recent Logs</h3>
          <ul>
            {logs.slice(-5).map((log, i) => (
              <li key={i}>
                {log.date} → {formatDuration(log.duration)} → {log.topic}{" "}
                <button onClick={() => handleDelete(log.id)}>x</button>
              </li>
            ))}
          </ul>
        </div>

        {/* frase motivacional */}
        <div className="streak-quote">
          <p className={fade ? "fade" : ""}>
            "{sentences[currentIndex].text}"
          </p>
        </div>
      </div>
    </div>
  );
}
