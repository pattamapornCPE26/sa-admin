import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Approved from './pages/approved';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
export default App;
