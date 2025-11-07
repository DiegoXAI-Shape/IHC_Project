import { useState } from "react";
import MoodForm from "./components/MoodForm.jsx";
import MoodDashboard from "./components/MoodDashboard.jsx";
import HabitForm from "./components/HabitForm.jsx";
import Graph from "./components/Graph.jsx";
import Resources from "./components/Resources.jsx";

export default function App() {
  const [userId] = useState("usuario1");
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Vita-Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <MoodForm userId={userId} onSave={()=>setRefresh(!refresh)} />
          <MoodDashboard userId={userId} refresh={refresh} />
        </div>

        <div className="bg-white shadow rounded p-4">
          <HabitForm userId={userId} onAdded={()=>setRefresh(!refresh)} />
          <Graph userId={userId} refresh={refresh} />
          <Resources />
        </div>
      </div>
    </div>
  );
}
