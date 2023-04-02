import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage';
import HotelPage from './HotelPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/hotels" element={<HotelPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
