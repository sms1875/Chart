import React, { useEffect, useState } from 'react';
import { Box, Grid, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';

const getColorIntensity = (value, max, min) => {
  const normalizedValue = (value - min) / (max - min);
  const intensity = Math.round(20 + normalizedValue * 80);
  return `rgba(255, 0, 0, ${intensity / 100})`;
};

const colorModes = [
  { value: 'single', label: 'Single Color' },
  { value: 'multiple', label: 'Multiple Colors' },
];

const chartShapes = [
  { value: 'full', label: 'Full' },
  { value: 'half', label: 'Half' },
];

const chartTypes = [
  { value: 'pie', label: 'Pie' },
  { value: 'donut', label: 'Donut' },
];

const pieChartOptions = {
  chart: {
    type: 'pie',
    height: 430,
    toolbar: { 
      show: false 
    },
  },
  plotOptions: {
    pie: {
      startAngle: 0,
      endAngle: 360,
      offsetX: 0,
      offsetY: 0,
      customScale: 1,
      expandOnClick: true,
      dataLabels: {
        offset: 0,
        minAngleToShowLabel: 10,
      },
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    labels: {
      colors: 'grey.500',
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsetX: 2, // Fix the typo here
      offsetY: 2, // Fix the typo here
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

const SurveyPieChart = ({ data }) => {
  const theme = useTheme();
  const { secondary, divider, warning, primary, success } = theme.palette;
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(pieChartOptions);
  const [colorMode, setColorMode] = useState('single');
  const [shape, setShape] = useState('full');
  const [type, setType] = useState('pie');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const categories = data[0]?.categories || Object.keys(data[0]);
    const values = data[0]?.data || Object.values(data[0]);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    setSeries(values);

    setOptions((prevOptions) => ({
      ...prevOptions,
      chart: { ...prevOptions.chart, type: type },
      plotOptions: {
        pie: {
          ...prevOptions.plotOptions.pie,
          startAngle: shape === 'full' ? 0 : -90,
          endAngle: shape === 'full' ? 360 : 90,
        },
      },
      colors: colorMode === 'single'
        ? values.map((value) => getColorIntensity(value, maxValue, minValue))
        : [warning.main, primary.main, success.dark, '#ff5733', '#ffbd33'],
      labels: categories,
      xaxis: {
        labels: { style: { colors: Array(categories.length - 1).fill(secondary) } },
      },
      yaxis: { labels: { style: { colors: [secondary] } } },
      grid: { borderColor: divider },
      tooltip: { theme: 'light' },
    }));

    // Set the chart title
    setTitle(data[0]?.title || 'Default Title');
  }, [data, type, shape, colorMode, secondary, divider, warning, primary, success]);

  return (
    <div id="chart">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="color-mode-select"
            size="small"
            select
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
          >
            {colorModes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="chart-mode-select"
            size="small"
            select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
          >
            {chartShapes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="chart-type-select"
            size="small"
            select
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
          >
            {chartTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <MainCard sx={{ mt: 1.75 }}>
        <Box sx={{ p: 3, pb: 0 }}>
          <ReactApexChart options={options} series={series} type={type} height={430} />
        </Box>
      </MainCard>
    </div>
  );
};

export default SurveyPieChart;
