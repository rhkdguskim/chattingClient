import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import { Login, Signup } from './page';
import { PAGE_PATHS } from './config';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path={PAGE_PATHS.LOGIN} element={<Login />} />
          <Route path={PAGE_PATHS.SIGNUP} element={<Signup />} />
          <Route path={PAGE_PATHS.HOME} element={<Navigate to={PAGE_PATHS.LOGIN} />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;