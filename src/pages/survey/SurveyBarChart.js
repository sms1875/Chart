import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import { DefaultChartOptions } from './ChartConstants';

const SurveyBarChart = ({ data, requiredResponses, labelFormat }) => {
  const [title, setTitle] = useState('');
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(DefaultChartOptions);

  useEffect(() => {
    if (data) {
      const { title, categories, data: chartData, requiredResponses } = data;
      const totalResponses = chartData.reduce((sum, value) => sum + value, 0);

      setSeries(categories.map((category, index) => ({ name: category, data: [chartData[index]] })));

      setTitle(
        <span>
          {title} ({totalResponses}명)
          {requiredResponses ? <Typography variant="body2" color="error">*필수 항목</Typography> : <Box sx={{ mt: 2 }} />}
        </span>
      );

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
  }, [data, requiredResponses, labelFormat]);

  return (
    <div id="chart">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Box sx={{ p: 3, pb: 0 }}>
          <ReactApexChart options={options} series={series} type="bar" />
        </Box>
      </MainCard>
    </div>
  );
};

export default SurveyBarChart;