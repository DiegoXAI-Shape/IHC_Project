import { useState } from "react";
import { postHabit } from "../api.js";

export default function HabitForm({ userId }) {
  const [sleep, setSleep] = useState("");
  const [exercise, setExercise] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación: no negativos ni cero
    if (sleep <= 0 || exercise <= 0 || nutrition <= 0) {
      setMessage("❌ Los valores deben ser mayores que 0");
      return;
    }

    // Guardar cada hábito como registro separado (opcional)
    const habits = [
      { name: "Sueño", value: sleep },
      { name: "Ejercicio", value: exercise },
      { name: "Alimentación", value: nutrition },
    ];

    for (let habit of habits) {
      await postHabit({
        userId,
        name: habit.name,
        value: habit.value,
        date: new Date().toISOString().slice(0,10)
      });
    }

    setMessage("✅ Hábitos guardados correctamente");
    setSleep("");
    setExercise("");
    setNutrition("");

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md bg-gray-50">
      <input
        type="number"
        placeholder="Horas de sueño"
        value={sleep}
        onChange={(e) => setSleep(e.target.value)}
        className="w-full p-2 border rounded-md mb-2"
        min="1"
      />
      <input
        type="number"
        placeholder="Minutos de ejercicio"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        className="w-full p-2 border rounded-md mb-2"
        min="1"
      />
      <input
        type="number"
        placeholder="Alimentación (escala 1-10)"
        value={nutrition}
        onChange={(e) => setNutrition(e.target.value)}
        className="w-full p-2 border rounded-md mb-2"
        min="1"
        max="10"
      />
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Guardar hábitos
      </button>
      {message && <p className="mt-2 text-green-600 font-semibold">{message}</p>}
    </form>
  );
}
