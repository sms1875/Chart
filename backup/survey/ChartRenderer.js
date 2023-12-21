import React, { useState } from 'react';
import SurveyChart from './SurveyChart';
import ChartTable from './ChartTable';

const maxSelectedAxes = 3; // 선택 가능한 최대 Y 축 수

/**
 * 차트를 렌더링하는 함수형 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.data - 차트 데이터
 * @returns {JSX.Element} - 렌더링된 차트 컴포넌트
 */
const ChartRenderer = ({ ChartItem }) => {
  const [selectedAxes, setSelectedAxes] = useState([ChartItem.axis[0]]); // 선택된 Y 축
  const [annotationXValue, setAnnotationXValue] = useState({
    min: ChartItem.date[0], // X 최소값
    max: ChartItem.date[1], // X 최대값
  });
  const [isAnnotationEnabled, setIsAnnotationEnabled] = useState(false); // 주석 활성화 여부
  const [key, setKey] = useState(0); // key 상태

  /**
   * 데이터 갱신 콜백 함수
   */
  const handleDataUpdate = () => {
    // key 값을 변경하여 테이블을 다시 그리도록 함
    setKey(prevKey => prevKey + 1);
  };

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

  return (
    <div>
      {/* Y 축 선택 체크박스 */}
      <div>
        {ChartItem.axis.map((axis) => (
          <label key={axis}>
            <input type="checkbox" checked={selectedAxes.includes(axis)} onChange={() => handleAxisToggle(axis)} />
            {axis}
          </label>
        ))}
      </div>

      {/* 주석 활성화 체크박스 */}
      <div>
        <label>
          <input type="checkbox" checked={isAnnotationEnabled} onChange={handleAnnotationToggle} />
          annotation 활성화
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

      {/* 차트 */}
      <div>
        <SurveyChart
          ChartItem={ChartItem}
          selectedAxes={selectedAxes}
          annotationXValue={annotationXValue}
          isAnnotationEnabled={isAnnotationEnabled}
          onDataUpdate={handleDataUpdate}
        />
      </div>

      {/* 테이블 */}
      <div style={{ overflowX: 'auto' }}> {/* 스크롤을 추가하는 부분 */}
        <ChartTable
          key={key} // key 값을 ChartTable 컴포넌트에 전달
          chartData={ChartItem}
          selectedAxes={selectedAxes}
        />
      </div>
    </div>
  );
};

export default ChartRenderer;
