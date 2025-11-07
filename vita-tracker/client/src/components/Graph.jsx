import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { getMoods } from "../api.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function Graph({ userId, refresh }) {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    if (!userId) return;
    getMoods(userId).then(data => setMoods(data || []));
  }, [userId, refresh]); // Se recarga si userId o refresh cambian

  // Evitar renderizar si no hay datos
  if (!moods || moods.length === 0) return <p className="text-gray-500">Cargando datos...</p>;

  // Mapear estados de ánimo a valores
  const moodValues = { happy: 5, neutral: 3, sad: 1, angry: 0, tired: 2 };
  const labels = moods.map(m => m.date);
  const dataValues = moods.map(m => moodValues[m.mood] || 3);

  const data = {
    labels,
    datasets: [
      {
        label: "Estado de ánimo",
        data: dataValues,
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 7, // más grande si quieres
        pointHoverRadius: 9,
        clip: false
      }
    ]
  };

  const options = {
  responsive: true,
  plugins: { legend: { display: false } },
  layout: {
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    }
  },
  scales: {
    y: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
        callback: v => ({0:"😡",1:"😢",2:"😴",3:"😐",5:"😄"}[v] || v)
      }
    }
  }
};

  return <Line data={data} options={options} />;
}
