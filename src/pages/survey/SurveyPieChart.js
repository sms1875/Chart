import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import { DefaultChartOptions } from './ChartConstants';

const SurveyPieChart = ({ data, type, shape, requiredResponses, labelFormat }) => {
  const [title, setTitle] = useState('');
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(DefaultChartOptions);

  useEffect(() => {
    if (data) {
      const { title, categories, data: chartData, requiredResponses } = data;
      const totalResponses = chartData.reduce((sum, value) => sum + value, 0);
      const values = data.data;

      setSeries(values);

      setTitle(
        <span>
          {title} ({totalResponses}명)
          {requiredResponses && <Typography variant="body2" color="error">*필수 항목</Typography>}
        </span>
      );

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
  }, [data, type, shape, requiredResponses, labelFormat]);

  return (
    <div id="chart">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Box sx={{ p: 3, pb: 0 }}>
          <ReactApexChart options={options} series={series} type={type} />
        </Box>
      </MainCard>
    </div>
  );
};

export default SurveyPieChart;