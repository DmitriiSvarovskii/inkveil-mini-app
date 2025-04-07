import React from 'react';

const MoodChart: React.FC = () => {
    return (
        <div className="mood-chart">
            <h2>График настроения</h2>
            <p>Здесь будет график, отображающий динамику настроения.</p>
            {/* Для построения графика можно интегрировать Chart.js или другую библиотеку */}
        </div>
    );
};

export default MoodChart;