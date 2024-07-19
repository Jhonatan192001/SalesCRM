// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomeSeller from './pages/HomeSeller';
import HomeAdmin from './pages/HomeAdmin';
// import DbStatus from './components/DbStatus';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <DbStatus /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/vendedor" element={<HomeSeller />} />
          <Route path="/administrador" element={<HomeAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;