import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Instrument {
  _id: string;
  name: string;
  category: string;
  description: string;
  brand: string;  // Marca relacionada con el instrumento
  price: number;
  image: string;
}

const InstrumentsList = ({ instruments }: { instruments: Instrument[] }) => { // Recibe la prop 'instruments'
  const handleDeleteInstrument = async (instrumentId: string) => {
    // Confirmación para eliminar el instrumento
    if (window.confirm(`¿Estás seguro de que quieres eliminar el instrumento ${instruments.find(i => i._id === instrumentId)?.name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/instruments/${instrumentId}`);
        // Actualiza la lista de instrumentos después de eliminar
        // setInstruments(instruments.filter(instrument => instrument._id !== instrumentId)); // Ya no necesitas actualizar el estado aquí
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Lista de Instrumentos</h2>
      <Link to="/instruments/new" className="btn btn-primary mb-3">
        Nuevo Instrumento
      </Link>
      <ul>
        {instruments.map(instrument => ( // Utiliza la prop 'instruments' para renderizar la lista
          <li key={instrument._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{instrument.name}</h5>
                <p className="card-text">{instrument.description}</p>
                <div className="d-flex justify-content-end">
                  <Link to={`/instruments/${instrument._id}/edit`} className="btn btn-warning me-2">
                    Editar
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDeleteInstrument(instrument._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstrumentsList; 