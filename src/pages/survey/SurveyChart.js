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

/**
 * Y 축의 옵션을 설정하는 함수
 * @param {string} axisType - 축의 유형
 * @param {boolean} display - 표시 여부
 * @param {string} position - 위치
 * @param {string} axisLabel - 축 레이블
 * @returns {Object} - Y 축의 옵션
 */
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

/**
 * 차트 데이터셋을 생성하는 함수
 * @param {Array} selectedAxes - 선택된 Y 축
 * @param {Array} chartData - 차트 데이터
 * @param {Array} colors - 색상 배열
 * @returns {Array} - 생성된 차트 데이터셋 배열
 */
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

/**
 * 차트 옵션을 생성하는 함수
 * @param {Array} selectedAxes - 선택된 Y 축
 * @param {Object} axisConfig - Y 축 설정
 * @param {number} xMin - X 최소값
 * @param {number} xMax - X 최대값
 * @param {boolean} isAnnotationEnabled - 주석 활성화 여부
 * @returns {Object} - 차트 옵션
 */
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
      pan: {
        enabled: true,
        mode: 'xy',
      },
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
          backgroundColor: 'yellow',
        },
      },
    },
  },
});

/**
 * 색상 배열을 생성하는 함수
 * @param {number} count - 색상 개수
 * @returns {Array} - 생성된 색상 배열
 */
const generateRandomColors = (count) => {
  return Array.from({ length: count }, () => '#' + Math.floor(Math.random() * 16777215).toString(16));
};

const colors = generateRandomColors(100); // 색상 배열

/**
 * 설문 결과를 표시하는 차트 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.ChartItem - 차트 데이터 및 설정
 * @returns {JSX.Element} - 렌더링된 설문 결과 차트 컴포넌트
 */
const SurveyChart = ({ ChartItem }) => {
  // State 정의
  const [selectedAxes, setSelectedAxes] = useState([ChartItem.axis[0]]); // 선택된 Y 축
  const [xMin, setXMin] = useState(ChartItem.date[0]); // X 최소값
  const [xMax, setXMax] = useState(ChartItem.date[1]); // X 최대값
  const [isAnnotationEnabled, setIsAnnotationEnabled] = useState(false); // 주석 활성화 여부

  const maxSelectedAxes = 3; // 선택 가능한 최대 Y 축 수
  /**
   * Y 축 선택 핸들러
   * @param {string} axis - 선택된 Y 축
   */
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

  /**
   * 주석 활성화 토글 핸들러
   */
  const handleAnnotationToggle = () => {
    setIsAnnotationEnabled((prevValue) => !prevValue);
  };

  // 차트 옵션 설정
  const axisConfig = ChartItem.axis.reduce((axesConfig, axis) => {
    axesConfig[axis] = getYAxisOptions('linear', selectedAxes.includes(axis), selectedAxes.length > 0 && selectedAxes[0] === axis ? 'left' : 'right', `${axis} 축`);
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
        {/* 주석 활성화 체크박스 */}
        <div>
          <label>
            <input type="checkbox" checked={isAnnotationEnabled} onChange={handleAnnotationToggle} />
            주석 활성화
          </label>
          <label htmlFor="xMinInput">X 최소값:</label>
          <input type="number" id="xMinInput" value={xMin} onChange={(e) => setXMin(e.target.value)} />
          <label htmlFor="xMaxInput">X 최대값:</label>
          <input type="number" id="xMaxInput" value={xMax} onChange={(e) => setXMax(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default SurveyChart;
