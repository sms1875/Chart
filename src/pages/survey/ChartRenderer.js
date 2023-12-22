import React, { useState, useCallback } from 'react';
import SurveyChart from './SurveyChart';
import ChartTable from './ChartTable';

// 선택 가능한 최대 Y 축 수
const maxSelectedAxes = 3;

/**
 * 차트를 렌더링하는 함수형 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.ChartItem - 차트 데이터
 * @returns {JSX.Element} - 렌더링된 차트 컴포넌트
 */
const ChartRenderer = ({ ChartItem }) => {
  // 선택된 Y 축
  const [selectedAxes, setSelectedAxes] = useState([ChartItem.axis[0]]);

  // key 상태
  const [key, setKey] = useState(0);

  // 선택된 차트 값
  const [selectedChartValue, setSelectedChartValue] = useState(null);

  /**
   * Y 축 선택 핸들러
   * @param {string} axis - 선택된 Y 축
   */
  const handleAxisToggle = useCallback((axis) => {
    setSelectedAxes((prevAxes) => {
      if (prevAxes.includes(axis)) {
        // 이미 선택된 축이면 제거
        return prevAxes.filter((a) => a !== axis);
      } else if (prevAxes.length < maxSelectedAxes) {
        // 선택된 축이 최대 수보다 작으면 추가
        return [...prevAxes, axis];
      }
      return prevAxes;
    });
  }, []);

  /**
   * 데이터 갱신 콜백 함수
   */
  const handleDataUpdate = useCallback(() => {
    // key 값을 변경하여 테이블을 다시 그리도록 함
    setKey((prevKey) => prevKey + 1);
  }, []);

  /**
   * 차트 클릭 핸들러
   * @param {string} axis - 선택된 Y 축
   * @param {string} dataLabel - 데이터 라벨
   * @param {string} xValue - X 값
   * @param {number} yValue - Y 값
   */
  const handleClickChart = useCallback((axis, dataLabel, xValue, yValue) => {
    setSelectedChartValue({ axis, dataLabel, xValue, yValue });
  }, []);

  return (
    <div>
      {/* Y 축 선택 체크박스 */}
      <div>
        {ChartItem.axis.map((axis) => (
          <label key={axis}>
            <input
              type="checkbox"
              checked={selectedAxes.includes(axis)}
              onChange={() => handleAxisToggle(axis)}
            />
            {axis}
          </label>
        ))}
      </div>

      {/* 차트 */}
      <div>
        <SurveyChart
          ChartItem={ChartItem}
          selectedAxes={selectedAxes}
          onDataUpdate={handleDataUpdate}
          onClickChart={handleClickChart}
        />
      </div>

      {/* 테이블 */}
      <div>
        <ChartTable
          key={key}
          chartData={ChartItem}
          selectedAxes={selectedAxes}
          selectedChartValue={selectedChartValue}
        />
      </div>
    </div>
  );
};

export default ChartRenderer;