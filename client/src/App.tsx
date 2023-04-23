import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import React from 'react';

import {Register, Home, Login} from "pages";
import {useAuth} from "./contexts/Auth/AuthContext";

function App(): JSX.Element {
    const {user}  = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home/> : <Register />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;
