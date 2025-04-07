import React from 'react';
import MoodChart from '../components/MoodChart';
import Recommendation from '../components/Recommendation';

const Analysis: React.FC = () => {
    return (
        <div className="page-container">
            <h1>Анализ настроения</h1>
            <MoodChart />
            <Recommendation />
        </div>
    );
};

export default Analysis;