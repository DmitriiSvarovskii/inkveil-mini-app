import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Analysis from './pages/Analysis';
import './styles/styles.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/analysis" element={<Analysis />} />
                </Routes>
                {/* Нижняя навигация, которая всегда видна внизу */}
                <nav className="bottom-nav">
                    <Link to="/">Дневник</Link>
                    <Link to="/history">История</Link>
                    <Link to="/analysis">Анализ</Link>
                </nav>
            </div>
        </Router>
    );
};

export default App;