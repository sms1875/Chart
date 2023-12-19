import React, { useState } from 'react';
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

// Y축의 옵션 설정
const getYAxisOptions = (axisType, display, position, axisLabel) => ({
  type: axisType,
  display,
  title: {
    display: true,
    text: axisLabel,
  },
  position,
  grid: {
    drawOnChartArea: false,
  },
  ticks: {
    beginAtZero: true,
  },
  axisLabel,
});

// 차트 데이터 생성
const generateChartDataSets = (selectedAxes, chartData, colors) => {
  return chartData.map((data, index) => {
    const isDataSelected = selectedAxes.includes(data.axis);
    return isDataSelected ? {
      type: data.type,
      label: data.label,
      borderColor: colors[index],
      backgroundColor: colors[index],
      data: data.data,
      yAxisID: data.axis,
    } : null;
  }).filter(Boolean);
};

// 차트 옵션 생성
const getChartOptions = (selectedAxes, axisConfig, xMin, xMax, isAnnotationEnabled) => ({
  scales: {
    x: {
      stacked: true,
    },
    ...axisConfig,
  },
  interaction: {
    mode: 'index',
    intersect: false,
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

// 색상 배열 생성
const generateRandomColors = (count) => {
  return Array.from({ length: count }, () => '#' + Math.floor(Math.random() * 16777215).toString(16));
};

const colors = generateRandomColors(100);
// 주석 및 재사용 가능한 요소들을 포함한 차트 컴포넌트
const SurveyChart = ({ ChartItem }) => {
  // State 정의
  const [selectedAxes, setSelectedAxes] = useState([ChartItem.axis[0]]); // 선택된 Y 축
  const [xMin, setXMin] = useState(ChartItem.date[0]); // X 최소값
  const [xMax, setXMax] = useState(ChartItem.date[1]); // X 최대값
  const [isAnnotationEnabled, setIsAnnotationEnabled] = useState(false); // 주석 활성화 여부

  const maxSelectedAxes = 3; // 선택 가능한 최대 Y 축 수

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

  // 차트 옵션 설정
  const axisConfig = ChartItem.axis.reduce((axesConfig, axis) => {
    axesConfig[axis] = getYAxisOptions('linear', selectedAxes.includes(axis), selectedAxes.length > 0 && selectedAxes[0] === axis ? 'left' : 'right', `${axis} Axis Label`);
    return axesConfig;
  }, {});

  const filteredDataSets = generateChartDataSets(selectedAxes, ChartItem.data, colors);

  const chartOptions = getChartOptions(selectedAxes, axisConfig, xMin, xMax, isAnnotationEnabled);

  return (
    <div>
      <Chart type='line' data={{ labels: ChartItem.date, datasets: filteredDataSets }} options={chartOptions} />
      <div>
        {/* Y 축 선택 체크박스 */}
        {ChartItem.axis.map((axis) => (
          <label key={axis}>
            <input type="checkbox" checked={selectedAxes.includes(axis)} onChange={() => handleAxisToggle(axis)} />
            {axis}
          </label>
        ))}
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
