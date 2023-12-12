import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DefaultChartOptions } from './ChartConstants';

const SurveyPieChart = ({ data, type, shape, labelFormat }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(DefaultChartOptions);

  useEffect(() => {
    if (data) {
      const { categories } = data;
      const values = data.data;

      setSeries(values);

      setOptions((prevOptions) => ({
        ...prevOptions,
        chart: { ...prevOptions.chart, type: type },
        plotOptions: {
          pie: {
            startAngle: shape === 'full' ? 0 : -90,
            endAngle: shape === 'full' ? 360 : 90,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10,
            },
          },
        },
        labels: categories,
        stroke: {
          width: 0,
        },
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
        legend: {
          position: 'bottom',
          formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
      }));
    }
  }, [data, type, shape, labelFormat]);

  return (
    <ReactApexChart options={options} series={series} type={type} />
  );
};

export default SurveyPieChart;