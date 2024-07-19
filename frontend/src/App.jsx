// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomeSeller from './pages/HomeSeller';
// import DbStatus from './components/DbStatus';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <DbStatus /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homeSeller" element={<HomeSeller />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;