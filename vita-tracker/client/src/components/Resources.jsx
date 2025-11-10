// --- Resources.jsx ---
import React from 'react';

// --- LOS DATOS "FALSOS" ---
const videos = [
  { id: 'tYwnSBkc_To', title: 'Meditación para Reducir Estrés, Ansiedad y Pensamientos Negativos (10 min)', categoria: 'emocional' },
  { id: 'i7El9YzjV2k', title: 'Música Relajante para Aliviar el Estrés y la Ansiedad | Música de Relajación y Meditación', categoria: 'emocional' },
  { id: '9rIjAAHP9D0', title: 'Rutina Rápida Para Cuando NO tienes TIEMPO (15 Minutos) Entrenamiento CORTITO PERO PODEROSO', categoria: 'fisico' },
  { id: '1J8CRcoFekE', title: 'Yoga para principiantes', categoria: 'fisico' },
  { id: 'Hmga0Ea5SlM', title: 'Cómo dormir bien y despertar lleno de energía? 10 consejos demostrados por la ciencia', categoria: 'emocional' },
  { id: 'f6LoHbrzVq4', title: 'Ideas Fáciles para COMER SANO toda la Semana. SIN GRASA, NI AZÚCAR. Diabetes, Colestero, Quema Grasa', categoria: 'fisico' },
];

export default function Resources() {
  const videosEmocionales = videos.filter(video => video.categoria === 'emocional');
  const videosFisicos = videos.filter(video => video.categoria === 'fisico');

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Recursos Educativos</h2>

      {/* --- SECCIÓN EMOCIONAL --- */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Bienestar Emocional</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videosEmocionales.map(video => (
            <div key={video.id} className="bg-white rounded shadow overflow-hidden">
              <iframe
                className="w-full h-48"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h4 className="p-3 font-semibold text-gray-700">{video.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN FÍSICO --- */}
      <section>
        <h3 className="text-2xl font-semibold text-green-600 mb-4">Bienestar Físico</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videosFisicos.map(video => (
            <div key={video.id} className="bg-white rounded shadow overflow-hidden">
              <iframe
                className="w-full h-48"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h4 className="p-3 font-semibold text-gray-700">{video.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}