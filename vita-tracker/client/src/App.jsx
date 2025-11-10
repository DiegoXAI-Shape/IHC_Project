// --- App.jsx ---
import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import MoodForm from "./components/MoodForm.jsx";
import MoodDashboard from "./components/MoodDashboard.jsx";
import HabitForm from "./components/HabitForm.jsx";
import Graph from "./components/Graph.jsx";
import Resources from "./components/Resources.jsx";

// Este componente es tu página principal (el Dashboard)
function DashboardPage() {
  const [userId] = useState("usuario1");
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow rounded p-4">
        <MoodForm userId={userId} onSave={() => setRefresh(!refresh)} />
        <MoodDashboard userId={userId} refresh={refresh} />
      </div>
      <div className="bg-white shadow rounded p-4">
        <HabitForm userId={userId} onAdded={() => setRefresh(!refresh)} />
        <Graph userId={userId} refresh={refresh} />
      </div>
    </div>
  );
}

// Esta es tu App principal
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Vita-Tracker</h1>

      {/* --- NAVEGACIÓN --- */}
      <nav className="mb-8 flex justify-center space-x-6">
        <Link to="/" className="text-xl font-semibold text-indigo-700 hover:text-indigo-900">
          Mi Dashboard
        </Link>
        <Link to="/recursos" className="text-xl font-semibold text-green-700 hover:text-green-900">
          Recursos Educativos
        </Link>
      </nav>

      {/* --- RUTAS (Aquí se decide qué página mostrar) --- */}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/recursos" element={<Resources />} />
      </Routes>
    </div>
  );
}