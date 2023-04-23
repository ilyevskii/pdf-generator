import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import React from 'react';

import {Register, Home} from "pages";

function App(): JSX.Element {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
}

export default App;
