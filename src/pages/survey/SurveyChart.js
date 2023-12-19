import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController, Filler } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from 'chartjs-plugin-annotation';

// ChartJS 등록
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

// 랜덤 데이터 생성 함수
const generateRandomData = () => {
  const data = [];
  for (let year = 13; year <= 23; year++) {
    for (let month = 1; month <= 12; month++) {
      data.push(faker.number.float().toFixed(2) - faker.number.float().toFixed(2));
    }
  }
  return data;
};

// 레이블 생성
const generateLabels = () => {
  const labels = [];
  for (let year = 13; year <= 23; year++) {
    for (let month = 1; month <= 12; month++) {
      labels.push(`${year}.${month}`);
    }
  }
  return labels;
};

// Y축의 옵션 설정
const getYAxisOptions = (axisType, display, position, axisLabel) => ({
  type: axisType,
  display,
  position,
  grid: {
    drawOnChartArea: false,
  },
  ticks: {
    beginAtZero: true,
  },
  axisLabel,
});

// 차트 옵션 설정
const getChartOptions = (selectedAxes, xMin, xMax, isAnnotationEnabled) => ({
  scales: {
    x: {
      stacked: true,
    },
    y: getYAxisOptions('linear', selectedAxes.includes('y'), selectedAxes.length > 1 && selectedAxes[0] === 'y' ? 'right' : 'left', 'Y Axis Label'),
    y1: getYAxisOptions('linear', selectedAxes.includes('y1'), selectedAxes.length > 1 && selectedAxes[0] === 'y1' ? 'right' : 'left', 'Y1 Axis Label'),
    y2: getYAxisOptions('linear', selectedAxes.includes('y2'), selectedAxes.length > 1 && selectedAxes[0] === 'y2' ? 'right' : 'left', 'Y2 Axis Label'),
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
          display: isAnnotationEnabled,
          drawTime: 'beforeDraw',
          type: 'box',
          xMin,
          xMax,
          borderColor: 'gray',
        },
      },
    },
  },
});

// 주석 및 재사용 가능한 요소들을 포함한 차트 컴포넌트
const SurveyChart = () => {
  // State 정의
  const [selectedAxes, setSelectedAxes] = useState(['y']); // 선택된 Y 축
  const [xMin, setXMin] = useState(generateLabels().indexOf('13.2')); // X 최소값
  const [xMax, setXMax] = useState(generateLabels().indexOf('13.6')); // X 최대값
  const [isAnnotationEnabled, setIsAnnotationEnabled] = useState(false); // 주석 활성화 여부

  const maxSelectedAxes = 2; // 선택 가능한 최대 Y 축 수

  const filteredDataSets = [
    ...(selectedAxes.includes('y') ? [{ type: 'line', label: 'Data 1', borderColor: 'red', data: generateRandomData(), yAxisID: 'y' }] : []),
    ...(selectedAxes.includes('y') ? [{ type: 'line', label: 'Data 2', borderColor: 'yellow', data: generateRandomData(), yAxisID: 'y' }] : []),
    ...(selectedAxes.includes('y1') ? [{ type: 'line', label: 'Data 3', borderColor: 'green', data: generateRandomData(), yAxisID: 'y1' }] : []),
    ...(selectedAxes.includes('y1') ? [{ type: 'line', label: 'Data 4', borderColor: 'pink', data: generateRandomData(), yAxisID: 'y1' }] : []),
    ...(selectedAxes.includes('y2') ? [{ type: 'line', label: 'Data 5', borderColor: 'skyblue', data: generateRandomData(), yAxisID: 'y2' }] : []),
    ...(selectedAxes.includes('y2') ? [{ type: 'line', label: 'Data 6', borderColor: 'purple', data: generateRandomData(), yAxisID: 'y2' }] : []),
    ...(selectedAxes.includes('y2') ? [{ type: 'line', label: 'Data 7', borderColor: 'orange', data: generateRandomData(), yAxisID: 'y2' }] : []),
  ];

  const chartOptions = getChartOptions(selectedAxes, xMin, xMax, isAnnotationEnabled);

  // Y 축 선택 핸들러
  const handleAxisToggle = (axis) => {
    setSelectedAxes((prevAxes) => {
      if (prevAxes.includes(axis)) {
        return prevAxes.filter((a) => a !== axis);
      } else if (prevAxes.length < maxSelectedAxes) {
        return [...prevAxes, axis];
      }
      return prevAxes;
    });
  };

  // 주석 활성화 토글 핸들러
  const handleAnnotationToggle = () => {
    setIsAnnotationEnabled((prevValue) => !prevValue);
  };

  return (
    <div>
      <Chart type='bar' data={{ labels: generateLabels(), datasets: filteredDataSets }} options={chartOptions} />
      <div>
        {/* Y 축 선택 체크박스 */}
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
        {/* X 최소, 최대값 입력 */}
        <div>
          <label htmlFor="xMinInput">X Min:</label>
          <input type="number" id="xMinInput" value={xMin} onChange={(e) => setXMin(e.target.value)} />
          <label htmlFor="xMaxInput">X Max:</label>
          <input type="number" id="xMaxInput" value={xMax} onChange={(e) => setXMax(e.target.value)} />
        </div>
        {/* 주석 활성화 체크박스 */}
        <div>
          <label>
            <input type="checkbox" checked={isAnnotationEnabled} onChange={handleAnnotationToggle} />
            주석 활성화
          </label>
        </div>
      </div>
    </div>
  );
};

export default SurveyChart;
