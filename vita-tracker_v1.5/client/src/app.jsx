import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchHealth()
  }, [])

  const fetchHealth = async () => {
    try {
      const response = await fetch('/api/health')
      const result = await response.json()
      setMessage(result.message)
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error al conectar con el servidor')
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/data')
      const result = await response.json()
      setData(result.data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const sendData = async () => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Ejemplo', value: 123 })
      })
      const result = await response.json()
      console.log('Respuesta:', result)
      alert('Datos enviados correctamente')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>React + Flask</h1>
        <p>{message || 'Conectando...'}</p>
      </header>

      <main>
        <section>
          <h2>Obtener Datos</h2>
          <button onClick={fetchData}>
            {loading ? 'Cargando...' : 'Obtener Datos'}
          </button>
          {data.length > 0 && (
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2>Enviar Datos</h2>
          <button onClick={sendData}>Enviar POST</button>
        </section>
      </main>
    </div>
  )

}
export default App