import React, { useRef, useMemo } from 'react';
import { Chart as ReactChart } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getYAxisOptions, generateChartDataSets, getChartOptions, colors } from './chartUtils';

/**
 * 설문 결과를 표시하는 차트 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.ChartItem - 차트 데이터 및 설정
 * @param {Array} props.selectedAxes - 선택된 Y 축
 * @param {function} props.onDataUpdate - 데이터 갱신 콜백 함수
 * @returns {JSX.Element} - 렌더링된 설문 결과 차트 컴포넌트
 */
const SurveyChart = ({ ChartItem, selectedAxes, onDataUpdate }) => {
  const axisConfig = useMemo(() => (
    ChartItem.axis.reduce((axesConfig, axis) => {
      axesConfig[axis] = getYAxisOptions('linear', selectedAxes.includes(axis), selectedAxes.length > 0 && selectedAxes[0] === axis ? 'left' : 'right', `${axis} 축`);
      return axesConfig;
    }, {})
  ), [ChartItem.axis, selectedAxes]);

  const filteredDataSets = useMemo(() => generateChartDataSets(selectedAxes, ChartItem.data, colors), [selectedAxes, ChartItem.data]);

  const isDragDataRef = useRef(false);
  const chartOptions = useMemo(() => (
    getChartOptions(selectedAxes, axisConfig, ChartItem.baseline, isDragDataRef, onDataUpdate)
  ), [selectedAxes, axisConfig]);

  return (
    <div>
      <ReactChart type='line' data={{ labels: ChartItem.date, datasets: filteredDataSets }} options={chartOptions} />
    </div>
  );
};


SurveyChart.propTypes = {
  ChartItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.arrayOf(PropTypes.string).isRequired,
    axis: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        axis: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default SurveyChart;