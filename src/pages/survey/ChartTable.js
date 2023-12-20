import React from 'react';

/**
 * 특정 축에 대한 데이터 행을 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.axis - 축 이름
 * @param {Object} props.rowData - 축에 대한 데이터
 * @returns {JSX.Element} - 특정 축에 대한 데이터 행 요소
 */
const AxisDataRow = ({ axis, rowData }) => (
  <tr key={`${axis}-${rowData.label}`}>
    <td>{axis}</td>
    <td>{rowData.label}</td>
    {rowData.data.map((value, index) => (
      <td key={index}>{value}</td>
    ))}
  </tr>
);

/**
 * 차트 데이터를 테이블로 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.chartData - 차트 데이터
 * @param {Array} props.selectedAxes - 선택된 축 배열
 * @returns {JSX.Element} - 렌더링된 차트 데이터 테이블
 */
const ChartTable = ({ chartData, selectedAxes }) => {
  // 테이블 헤더 생성
  const tableHeaders = ['axis', 'data', ...chartData.date];

  // 선택된 축에 대한 데이터 행 생성
  const tableRows = selectedAxes.flatMap((axis) => {
    const axisData = chartData.data.filter((data) => data.axis === axis);
    return axisData.map((rowData) => (
      <AxisDataRow key={`${axis}-${rowData.label}`} axis={axis} rowData={rowData} />
    ));
  });

  // 테이블 컴포넌트 반환
  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default ChartTable;
