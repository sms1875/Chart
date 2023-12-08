import React, { useEffect, useState } from 'react';

// material-ui
import { Box, Grid, MenuItem, TextField, Typography, useTheme } from '@mui/material';

import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';

const chartTypes = [
  {
    value: 'bar',
    label: 'bar'
  },
  {
    value: 'area',
    label: 'area'
  }
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

const SurveyBarChart = ({ data }) => {
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState(barChartOptions);
  const [chartType, setChartType] = useState('bar'); 

  useEffect(() => {
    const categories = Object.keys(data[0]);
    const seriesData = [{ data: Object.values(data[0]) }];

    setOptions((prevState) => ({
      ...prevState,
      chart: {
        ...prevState.chart,
        type: chartType,
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

    setSeries(seriesData);
  }, [data, info, secondary, chartType]);

  return (
    <div id="chart">
       <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">1. 만족도</Typography>
          </Grid>
          <Grid item />
          <TextField
            id="standard-select-currency"
            size="small"
            select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
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
          <ReactApexChart options={options} series={series} type={chartType} height={365} />
        </MainCard>
    </div>
  );
};

export default SurveyBarChart;
