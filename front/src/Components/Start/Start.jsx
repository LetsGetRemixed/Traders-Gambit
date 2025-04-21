import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Start = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(generateInitialData());

  // Reference to know if component is mounted
  const intervalRef = useRef(null);

  function generateInitialData() {
    const data = [];
    for (let i = 0; i < 60; i++) {
      const val = 100 + Math.sin(i / 3) * 10 + Math.random() * 5;
      data.push(val);
    }
    return data;
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setChartData((prev) => {
        const newVal =
          prev[prev.length - 1] +
          (Math.random() - 0.5) * 6 + // small random delta
          Math.sin(Date.now() / 1000) * 1.2;

        const updated = [...prev.slice(1), newVal];
        return updated;
      });
    }, 400);

    return () => clearInterval(intervalRef.current);
  }, []);

  const chartDisplay = {
    labels: Array.from({ length: chartData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: '',
        data: chartData,
        borderColor:
          chartData[chartData.length - 1] >= chartData[chartData.length - 2]
            ? 'rgba(0, 255, 0, 0.4)' // green up
            : 'rgba(255, 0, 0, 0.4)', // red down
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // smoothness comes from updating data manually
    scales: {
      x: { display: false },
      y: { display: false }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-mono overflow-hidden">
      {/* Live background stock chart */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="w-full h-full">
          <Line data={chartDisplay} options={chartOptions} />
        </div>
      </div>

      {/* Foreground UI */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-12">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Trader's Gambit
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Ride the waves of chaos. Make bold moves. Beat the bots. Become the market legend.
        </motion.p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <motion.button
            onClick={() => navigate('/game')}
            className="w-full px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg rounded-lg shadow-lg transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game
          </motion.button>

          <motion.button
            onClick={() => navigate('/options')}
            className="w-full px-8 py-3 bg-gray-800 hover:bg-gray-600 text-white font-medium text-base rounded-lg transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            Game Options
          </motion.button>

          <motion.button
            onClick={() => navigate('/settings')}
            className="w-full px-8 py-3 bg-gray-800 hover:bg-gray-600 text-white font-medium text-base rounded-lg transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            Settings
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Start;


