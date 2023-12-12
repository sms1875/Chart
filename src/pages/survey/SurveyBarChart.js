import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DefaultChartOptions } from './ChartOptions';

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