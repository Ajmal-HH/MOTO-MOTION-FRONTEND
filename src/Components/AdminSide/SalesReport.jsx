/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function SalesReport({ monthlySales }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const data = {
    labels: months.slice(0, monthlySales.length),
    datasets: [
      {
        label: 'Sales',
        data: monthlySales,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Report',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Sales ($)',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1, // Ensure the tick step size is 1
          min: 1, // Start the Y-axis from 1 
          max: 10, // Set the maximum value to 10
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full h-full">
      <div style={{ height: '100%', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default SalesReport;
