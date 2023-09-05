import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import { Menu, Login, Signup, OAuthRedirect } from './page';
import { PAGE_PATHS } from './config';
import Friend from './page/Friend';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={PAGE_PATHS.LOGIN} element={<Login />} />
          <Route path={PAGE_PATHS.OAUTH} element={<OAuthRedirect/>}/>
          <Route path={PAGE_PATHS.SIGNUP} element={<Signup />} />
          <Route path={PAGE_PATHS.FRIENDS} element={<Friend/>} />
          <Route path={PAGE_PATHS.HOME} element={<Navigate to={PAGE_PATHS.LOGIN} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;