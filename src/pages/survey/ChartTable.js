import React, { useEffect, useRef, useMemo } from 'react';

/**
 * 특정 축에 대한 데이터 행을 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.axis - 축 이름
 * @param {Object} props.rowData - 축에 대한 데이터
 * @param {boolean} props.isSelected - 항목이 선택되었는지 여부
 * @param {number} props.selectedColumnIndex - 선택된 열의 인덱스
 * @returns {JSX.Element} - 특정 축에 대한 데이터 행 요소
 */
const AxisDataRow = ({ axis, rowData, isSelected, selectedColumnIndex }) => (
  <tr key={`${axis}-${rowData.label}`}>
    <td>{axis}</td>
    <td>{rowData.label}</td>
    {rowData.data.map((value, index) => (
      <td
        key={index}
        style={(isSelected && index === selectedColumnIndex) ? { backgroundColor: 'yellow', fontWeight: 'bold' } : {}}
      >
        {value}
      </td>
    ))}
  </tr>
);

/**
 * 차트 데이터를 테이블로 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.chartData - 차트 데이터
 * @param {Array} props.selectedAxes - 선택된 축 배열
 * @param {Object} props.selectedChartValue - 선택된 차트 값
 * @returns {JSX.Element} - 렌더링된 차트 데이터 테이블
 */
const ChartTable = ({ chartData, selectedAxes, selectedChartValue }) => {
  // 테이블 헤더 목록
  const tableHeaders = useMemo(() => ['axis', 'data', ...chartData.date], [chartData.date]);

  // 선택된 X 값의 인덱스 찾기
  const selectedColumnIndex = useMemo(() => chartData.date.indexOf(selectedChartValue?.xValue), [chartData.date, selectedChartValue?.xValue]);

  // 선택된 헤더를 참조하는 useRef
  const selectedHeaderRef = useRef();

  useEffect(() => {
    // 선택된 헤더가 있다면 스크롤하여 가운데로 이동
    if (selectedHeaderRef.current) {
      selectedHeaderRef.current.scrollIntoView({ inline: 'center' });
    }
  }, [selectedColumnIndex]);

  // 선택된 축에 대한 데이터 행 렌더링
  const tableRows = useMemo(() => {
    return selectedAxes.flatMap((axis) => {
      const axisData = chartData.data.filter((data) => data.axis === axis);
      return axisData.map((rowData) => {
        const isSelected = selectedChartValue && selectedChartValue.axis === axis && selectedChartValue.dataLabel === rowData.label;
        return <AxisDataRow key={`${axis}-${rowData.label}`} axis={axis} rowData={rowData} isSelected={isSelected} selectedColumnIndex={selectedColumnIndex} />;
      });
    });
  }, [chartData.data, selectedAxes, selectedChartValue, selectedColumnIndex]);

  return (
    <div style={{ overflow: 'scroll' }}>
      <table border="1">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                ref={index === selectedColumnIndex + 2 ? selectedHeaderRef : null}
                style={index === selectedColumnIndex + 2 ? { backgroundColor: 'yellow', fontWeight: 'bold' } : {}}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default ChartTable;
