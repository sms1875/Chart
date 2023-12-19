import React, { useState, useMemo } from 'react';
import { Chart as ReactChart } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getYAxisOptions, generateChartDataSets, getChartOptions, colors } from './chartUtils';

/**
 * 설문 결과를 표시하는 차트 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.ChartItem - 차트 데이터 및 설정
 * @returns {JSX.Element} - 렌더링된 설문 결과 차트 컴포넌트
 */
const SurveyChart = ({ ChartItem }) => {
  // State 정의
  const [selectedAxes, setSelectedAxes] = useState([ChartItem.axis[0]]); // 선택된 Y 축
  const [annotationXValue, setAnnotationXValue] = useState({
    min: ChartItem.date[0], // X 최소값
    max: ChartItem.date[1], // X 최대값
  });
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
  const axisConfig = useMemo(() => {
    return ChartItem.axis.reduce((axesConfig, axis) => {
      axesConfig[axis] = getYAxisOptions('linear', selectedAxes.includes(axis), selectedAxes.length > 0 && selectedAxes[0] === axis ? 'left' : 'right', `${axis} 축`);
      return axesConfig;
    }, {});
  }, [ChartItem.axis, selectedAxes]);

  const filteredDataSets = useMemo(() => generateChartDataSets(selectedAxes, ChartItem.data, colors), [selectedAxes, ChartItem.data]);

  const chartOptions = useMemo(() => getChartOptions(selectedAxes, axisConfig, annotationXValue.min, annotationXValue.max, isAnnotationEnabled), [selectedAxes, axisConfig, annotationXValue.min, annotationXValue.max, isAnnotationEnabled]);

  return (
    <div>
      <ReactChart type='line' data={{ labels: ChartItem.date, datasets: filteredDataSets }} options={chartOptions} />
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
          <label htmlFor="annotationXMinInput">X 최소값:</label>
          <input
            type="number"
            id="annotationXMinInput"
            value={annotationXValue.min}
            onChange={(e) => setAnnotationXValue({ ...annotationXValue, min: e.target.value })}
          />
          <label htmlFor="annotationXMaxInput">X 최대값:</label>
          <input
            type="number"
            id="annotationXMaxInput"
            value={annotationXValue.max}
            onChange={(e) => setAnnotationXValue({ ...annotationXValue, max: e.target.value })}
          />
        </div>
      </div>
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
