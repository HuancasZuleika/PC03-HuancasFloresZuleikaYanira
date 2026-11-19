import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [universidades, setUniversidades] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarDatos() {
      try {
        const respuesta = await axios.get('/api/universidades');
        setUniversidades(respuesta.data);
      } catch (err) {
        setError('Error al cargar las universidades. Revisa que el backend esté encendido.');
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, []);

  const filtradas = universidades.filter((uni) =>
    uni.name.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <div className="contenedor">
      <h1>Buscador de Universidades de Perú</h1>
      
      <input
        type="text"
        placeholder="Escribe el nombre de una universidad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      {cargando ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filtradas.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <ul className="lista">
          {filtradas.map((uni, i) => (
            <li key={i} className="tarjeta">
              <h3>{uni.name}</h3>
              <a href={uni.web_pages[0]} target="_blank" rel="noreferrer">Visitar web</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}