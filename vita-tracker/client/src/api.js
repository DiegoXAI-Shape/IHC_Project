const API_URL = "http://localhost:5000/api";

// ==========================
// Estados de ánimo (Moods)
// ==========================

// Obtener estados de ánimo de un usuario
export const getMoods = async (userId) => {
  const res = await fetch(`${API_URL}/moods/${userId}`);
  return res.json();
};

// Guardar un estado de ánimo
export const saveMood = async (data) => {
  const res = await fetch(`${API_URL}/moods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

// ==========================
// Hábitos (Habits)
// ==========================

// Guardar un hábito
export const postHabit = async (data) => {
  const res = await fetch(`${API_URL}/habits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};
