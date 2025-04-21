import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

const Charts = ({ history }) => {
  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  const isGoingUp = last >= prev;

  const color = isGoingUp ? 'rgba(0,255,0,0.8)' : 'rgba(255,0,0,0.8)';
  const gradientFill = ctx => {
    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, isGoingUp ? 'rgba(0,255,0,0.15)' : 'rgba(255,0,0,0.15)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    return gradient;
  };

  const chartData = useMemo(() => ({
    labels: history.map((_, i) => i),
    datasets: [
      {
        label: 'Stock Price',
        data: history,
        borderColor: color,
        backgroundColor: gradientFill,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
        fill: true
      }
    ]
  }), [history]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: true,
        position: 'right',
        ticks: {
          color: '#ccc',
          callback: value => `$${value.toFixed(0)}`,
          autoSkip: true,
          maxTicksLimit: 4
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index',
        backgroundColor: '#111',
        titleColor: '#fff',
        bodyColor: '#0f0',
        callbacks: {
          label: context => `$${context.raw.toFixed(2)}`
        }
      }
    },
    elements: {
      line: {
        borderCapStyle: 'round'
      }
    }
  };

  return (
    <div className="w-full h-36 mt-4">
      <Line
        data={chartData}
        options={chartOptions}
        updateMode="none"
      />
    </div>
  );
};

export default Charts;


