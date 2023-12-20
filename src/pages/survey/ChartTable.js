import React from 'react';

const ChartTable = ({ chartData, selectedAxes }) => {
    // 헤더 생성
    const tableHeaders = ['axis', 'data', ...chartData.date];

    // 각 축에 대한 데이터 생성
    const tableRows = selectedAxes.flatMap((axis) => {
        const axisData = chartData.data.filter((data) => data.axis === axis);
        return axisData.map((rowData) => {
            const values = rowData.data;
            return (
                <tr key={`${axis}-${rowData.label}`}>
                    <td>{axis}</td>
                    <td>{rowData.label}</td>
                    {values.map((value, index) => (
                        <td key={index}>{value}</td>
                    ))}
                </tr>
            );
        });
    });

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
