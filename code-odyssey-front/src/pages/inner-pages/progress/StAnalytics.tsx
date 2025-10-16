import TopBarDash from "../../../components/TopBarDash";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

interface StudyLog {
  id: number;
  date: string;   // YYYY-MM-DD
  topic: string;
  duration: number; // em minutos
}

export default function StAnalytics() {
  const nav = useNavigate();
  const auth = useContext(AuthContext);
  const userId = auth?.user?.id || "guest";

  const [logs, setLogs] = useState<StudyLog[]>([]);

  // carregar logs do usuário logado
  useEffect(() => {
    const saved = localStorage.getItem(`${userId}-studyLogs`);
    if (saved) {
      setLogs(JSON.parse(saved));
    }
  }, [userId]);

  // 🎨 Cores pros tópicos
  const COLORS = [
    "#3a7562", // verde musgo
    "#f5b453", // amarelo
    "#3b82f6", // azul
    "#e57373", // vermelho suave
    "#8e44ad", // roxo
    "#16a085", // verde água
    "#ff9800", // laranja
    "#2ecc71", // verde vivo
    "#9b59b6", // lilás
    "#3498db", // azul claro
  ];

  // converter minutos para h/m
  function formatDuration(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h${m > 0 ? `${m}m` : ""}` : `${m}m`;
  }

  // agrupar por tópico
  function getTopicData(logs: StudyLog[]) {
    const totals: Record<string, number> = {};

    for (const log of logs) {
      if (!totals[log.topic]) {
        totals[log.topic] = 0;
      }
      totals[log.topic] += log.duration;
    }

    return Object.entries(totals).map(([name, value]) => ({
      name,
      value,
    }));
  }

  // já ordenado do maior pro menor
  const topicData = getTopicData(logs).sort((a, b) => b.value - a.value);

  // gerar dados diários (somando durations por dia)
  function getDailyData(logs: StudyLog[]) {
    const map: Record<string, number> = {};

    logs.forEach((log) => {
      if (!map[log.date]) map[log.date] = 0;
      map[log.date] += log.duration;
    });

    return Object.entries(map).map(([date, minutes]) => ({
      date,
      hours: minutes / 60,
    }));
  }

  const dailyData = getDailyData(logs);

  return (
    <div className="st-analytics-container">
      <TopBarDash />
      <h1>📊 Study Analytics</h1>
      <br />
      <p className="subtitle">
        Track your study time and focus (data from your streak logs)
      </p>

      {/* Gráfico principal (linhas) */}
      <section className="analytics-section">
        <h2>Hours Studied per Day</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="var(--btn-primary)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Distribuição por tópicos */}
      <section className="analytics-distribution">
        <h2>By Topic</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={topicData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {topicData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Histórico detalhado */}
      <section className="analytics-log">
        <h2>History</h2>
        <ul>
          {logs.map((item) => (
            <li key={item.id}>
              {item.date} → {formatDuration(item.duration)} → {item.topic}
            </li>
          ))}
        </ul>
      </section>

      <button className="back-btn" onClick={() => nav("/dashboard/progress")}>
        ⬅ Back to Progress
      </button>
    </div>
  );
}
