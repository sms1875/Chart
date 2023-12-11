import React, { useEffect, useState } from 'react';
import { Box, Grid, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';

const chartTypes = [
  { value: 'bar', label: 'Bar' },
  { value: 'area', label: 'Area' },
];

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [], // Categories will be dynamically set
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};

const SurveyBarChart = ({ data, requiredResponses }) => {
  const theme = useTheme();
  const info = theme.palette.info.light;
  const { secondary } = theme.palette.text;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(barChartOptions);
  const [type, setType] = useState('bar');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (data) {
      const { title, categories, data: chartData, requiredResponses } = data;
      const totalResponses = chartData.reduce((sum, value) => sum + value, 0);

      setOptions((prevState) => ({
        ...prevState,
        chart: {
          ...prevState.chart,
          type,
        },
        colors: [info],
        xaxis: {
          categories,
          labels: {
            style: {
              colors: Array(categories.length).fill(secondary),
            },
          },
        },
        tooltip: {
          theme: 'light',
        },
      }));

      setSeries([{ data: chartData }]);
      setTitle(
        <span>
          {title} ({totalResponses}명)
          {requiredResponses && <Typography variant="body2" color="error">*필수 항목</Typography>}
        </span>
      );
    }
  }, [data, info, secondary, type, requiredResponses]);

  return (
    <div id="chart">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item />
        <TextField
          id="standard-select-currency"
          size="small"
          select
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' }, marginLeft: 'auto' }}
        >
          {chartTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Box sx={{ p: 3, pb: 0 }}>
        </Box>
        <ReactApexChart options={options} series={series} type={type} height={300} />
      </MainCard>
    </div>
  );
};

export default SurveyBarChart;
