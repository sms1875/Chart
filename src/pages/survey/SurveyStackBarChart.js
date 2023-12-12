import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DefaultChartOptions } from './ChartOptions';

const SurveyStackBarChart = ({ data, requiredResponses, labelFormat }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(DefaultChartOptions);

  useEffect(() => {
    if (data) {
      const { categories, data: chartData } = data;

      setSeries(categories.map((category, index) => ({ name: category, data: [chartData[index]] })));

      setOptions((prevOptions) => ({
        ...prevOptions,
        chart: {
          ...prevOptions.chart,
          type: 'bar',
          stacked: true,
          stackType: '100%',
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        labels: categories,
        dataLabels: {
          enabled: (labelFormat !== 'none'),
          textAnchor: 'middle',
          formatter: function (val, opts) {
            if (labelFormat === 'percentage') {
              return val.toFixed(1) + "%";
            } else {
              return opts.w.globals.series[opts.seriesIndex];
            }
          },
        },
        xaxis: {
          show: true,
          labels: {
            show: true,
            formatter: function (val) {
              return val;
            },
          }
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          },
        },
        legend: {
          position: 'bottom',
          formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
      }));
    }
  }, [data, requiredResponses]);

  return (
    <ReactApexChart options={options} series={series} type='bar' />
  );
};

export default SurveyStackBarChart;
