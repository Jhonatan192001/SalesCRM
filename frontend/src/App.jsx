import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomeSeller from './pages/HomeSeller';
import HomeAdmin from './pages/HomeAdmin';
import ListOfWorkers from './pages/ListOfWorkers';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/vendedor" element={<HomeSeller />} />
          <Route path="/administrador/*" element={<HomeAdmin />}>
            <Route path="inicio" element={<div>Contenido Inicio</div>} />
            <Route path="trabajadores" element={<ListOfWorkers />} />
            <Route path="clientes" element={<div>Lista de Clientes</div>} />
            <Route path="reportes" element={<div>Contenido de reportes</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
