import React, { useState } from 'react';
import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler,
  zoomPlugin,
  annotationPlugin
);

const generateRandomData = () => {
  const data = [];
  for (let year = 13; year <= 23; year++) {
    for (let month = 1; month <= 12; month++) {
      data.push(faker.number.float().toFixed(2) - faker.number.float().toFixed(2));
    }
  }
  return data;
};

const labels = [];
for (let year = 13; year <= 23; year++) {
  for (let month = 1; month <= 12; month++) {
    labels.push(`${year}.${month}`);
  }
}

const SurveyBarChart = () => {
  const [selectedAxes, setSelectedAxes] = useState(['y']); // Initial selection

  const filteredDataSets = [
    ...(selectedAxes.includes('y') ? [{ type: 'line', label: 'Data 1', borderColor: 'red', data: generateRandomData(), yAxisID: 'y' }] : []),
    ...(selectedAxes.includes('y') ? [{ type: 'line', label: 'Data 2', borderColor: 'yellow', data: generateRandomData(), yAxisID: 'y' }] : []),
    ...(selectedAxes.includes('y1') ? [{ type: 'line', label: 'Data 3', borderColor: 'green', data: generateRandomData(), yAxisID: 'y1' }] : []),
    ...(selectedAxes.includes('y1') ? [{ type: 'line', label: 'Data 4', borderColor: 'pink', data: generateRandomData(), yAxisID: 'y1' }] : []),
    ...(selectedAxes.includes('y2') ? [{ type: 'line', label: 'Data 5', borderColor: 'skyblue', data: generateRandomData(), yAxisID: 'y2' }] : []),
    ...(selectedAxes.includes('y2') ? [{ type: 'line', label: 'Data 6', borderColor: 'purple', data: generateRandomData(), yAxisID: 'y2' }] : []),
    ...(selectedAxes.includes('y2') ? [{ type: 'line', label: 'Data 7', borderColor: 'orange', data: generateRandomData(), yAxisID: 'y2' }] : []),
  ];

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        position: 'left',
        type: 'linear',
        display: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
      y1: {
        position: 'right',
        type: 'linear',
        display: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
      y2: {
        position: 'right',
        type: 'linear',
        display: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      }, 
      annotation: {
        annotations: {
          box1: {
            drawTime: 'beforeDraw',
            type: 'box',
            xMin: labels.indexOf('17.2'),
            xMax: labels.indexOf('17.6'),
            backgroundColor: 'rgba(234, 234, 234, 0.9)',
          },
        },
      },
    },
  };

  const handleAxisToggle = (axis) => {
    setSelectedAxes((prevAxes) => {
      if (prevAxes.includes(axis)) {
        return prevAxes.filter((a) => a !== axis);
      } else {
        return [...prevAxes, axis];
      }
    });
  };

  return (
    <div>
      <Chart type='bar' data={{ labels, datasets: filteredDataSets }} options={options} />
      <div>
        <label>
          <input type="checkbox" checked={selectedAxes.includes('y')} onChange={() => handleAxisToggle('y')} />
          y
        </label>
        <label>
          <input type="checkbox" checked={selectedAxes.includes('y1')} onChange={() => handleAxisToggle('y1')} />
          y1
        </label>
        <label>
          <input type="checkbox" checked={selectedAxes.includes('y2')} onChange={() => handleAxisToggle('y2')} />
          y2
        </label>
      </div>
    </div>
  );
};

export default SurveyBarChart;
