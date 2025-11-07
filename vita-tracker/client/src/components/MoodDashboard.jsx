import { useEffect, useState } from "react";
import { getMoods } from "../api.js";

export default function MoodDashboard({ userId, refresh }) {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    getMoods(userId).then(setMoods);
  }, [userId, refresh]);

  return (
    <div className="mt-4">
      <h2 className="font-bold mb-2 text-lg">Diario de Ánimo</h2>
      {moods.length === 0 && <p className="text-gray-500">No hay registros aún.</p>}
      {moods.map(m => (
        <div key={m._id} className="p-2 border-b last:border-b-0">
          <span className="font-semibold">{m.date}</span> - {m.mood} - {m.note}
        </div>
      ))}
    </div>
  );
}
