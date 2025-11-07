import { useState } from "react";
import { saveMood } from "../api.js";

const colorClasses = {
  green: "bg-green-500 text-white",
  gray: "bg-gray-500 text-white",
  blue: "bg-blue-500 text-white",
  red: "bg-red-500 text-white",
  purple: "bg-purple-500 text-white"
};

const moods = [
  { label: "😄 Feliz", value: "happy", color: "green" },
  { label: "😐 Neutral", value: "neutral", color: "gray" },
  { label: "😢 Triste", value: "sad", color: "blue" },
  { label: "😡 Enojado", value: "angry", color: "red" },
  { label: "😴 Cansado", value: "tired", color: "purple" },
];

export default function MoodForm({ userId, onSave }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    const moodObj = moods.find(m => m.value === selectedMood);
    const res = await saveMood({
      userId,
      mood: moodObj.value,
      note,
      date: new Date().toISOString().slice(0,10),
      color: moodObj.color
    });

    setSelectedMood("");
    setNote("");
    setMessage(res.message || "Estado de ánimo guardado ✅");
    onSave && onSave();

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md bg-gray-50">
      <div className="mb-4 flex gap-2 flex-wrap">
        {moods.map((m) => (
          <button
            type="button"
            key={m.value}
            className={`px-3 py-2 rounded-lg text-lg font-semibold ${
              selectedMood === m.value ? colorClasses[m.color] : "bg-gray-200"
            }`}
            onClick={() => setSelectedMood(m.value)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <textarea
        placeholder="Escribe una nota sobre tu día..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 border rounded-md mb-2"
      />
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Guardar
      </button>
      {message && <p className="mt-2 text-green-600 font-semibold">{message}</p>}
    </form>
  );
}
