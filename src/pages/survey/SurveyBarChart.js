import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DefaultChartOptions } from './ChartOptions';

/**
 * 설문 막대 차트 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.data - 차트 데이터
 * @param {string} props.labelFormat - 라벨 형식
 * @returns {JSX.Element} - 렌더링된 막대 차트 컴포넌트
 */
const SurveyBarChart = ({ data, labelFormat }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(DefaultChartOptions);

  useEffect(() => {
    if (data) {
      const { categories, data: chartData } = data;
      const totalResponses = chartData.reduce((sum, value) => sum + value, 0);

      setSeries(categories.map((category, index) => ({ name: category, data: [chartData[index]] })));

      setOptions((prevOptions) => ({
        ...prevOptions,
        chart: { ...prevOptions.chart, type: 'bar' },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            borderRadius: 4,
          },
        },
        labels: categories,
        yaxis: {
          show: true,
          labels: {
            formatter: function (val) {
              return labelFormat === 'none' ? '' : val;
            },
          },
        },
        grid: {
          show: true,
          xaxis: {
            show: false,
          },
        },
        legend: {
          position: 'bottom',
          formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex];
          },
        },
        dataLabels: {
          enabled: (labelFormat !== 'none'),
          textAnchor: 'middle',
          formatter: function (val, opts) {
            if (labelFormat === 'percentage') {
              return (val / totalResponses * 100).toFixed(1) + "%";
            } else {
              return opts.w.globals.series[opts.seriesIndex];
            }
          },
        },
      }));
    }
  }, [data, labelFormat]);

  return (
    <ReactApexChart options={options} series={series} type="bar" />
  );
};

export default SurveyBarChart;