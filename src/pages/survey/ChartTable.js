import React, { useEffect, useRef } from 'react';

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
      <td key={index} style={(isSelected && index === selectedColumnIndex) ? { backgroundColor: 'yellow', fontWeight: 'bold' } : {}}>
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
  const tableHeaders = ['axis', 'data', ...chartData.date];

  // Find the index of the selected x value in the headers
  const selectedColumnIndex = chartData.date.indexOf(selectedChartValue?.xValue);

  // Ref for the selected th element
  const selectedHeaderRef = useRef();

  useEffect(() => {
    // Scroll the selected header into view
    if (selectedHeaderRef.current) {
      selectedHeaderRef.current.scrollIntoView({ inline: 'center' });
    }
  }, [selectedColumnIndex]);

  const tableRows = selectedAxes.flatMap((axis) => {
    const axisData = chartData.data.filter((data) => data.axis === axis);
    return axisData.map((rowData) => {
      const isSelected = selectedChartValue && selectedChartValue.axis === axis && selectedChartValue.dataLabel === rowData.label;
      return <AxisDataRow key={`${axis}-${rowData.label}`} axis={axis} rowData={rowData} isSelected={isSelected} selectedColumnIndex={selectedColumnIndex} />;
    });
  });

  return (
    <div style={{ overflow: 'scroll' }}>
      <table border="1">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} ref={index === selectedColumnIndex + 2 ? selectedHeaderRef : null} style={index === selectedColumnIndex + 2 ? { backgroundColor: 'yellow', fontWeight: 'bold' } : {}}>
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
