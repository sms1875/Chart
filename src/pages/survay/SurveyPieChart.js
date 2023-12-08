import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const getColorIntensity = (value, max, min) => {
  // Calculate the color intensity based on the value, max, and min
  const normalizedValue = (value - min) / (max - min);
  const intensity = Math.round(20 + normalizedValue * 80); // Adjust the range (20% - 100%) as needed
  return `rgba(255, 0, 0, ${intensity / 100})`;
};


const colorModes = [
  {
    value: 'single',
    label: 'Single Color'
  },
  {
    value: 'multiple',
    label: 'Multiple Colors'
  }
];

const chartModes = [
  {
    value: 'full',
    label: 'Full'
  },
  {
    value: 'half',
    label: 'Half'
  }
];


const chartTypes = [
  {
    value: 'pie',
    label: 'pie'
  },
  {
    value: 'donut',
    label: 'donut'
  }
];

const pieChartOptions = {
  chart: {
    type: 'pie', // Default type
    height: 430,
    toolbar: {
      show: false,
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
      offsexX: 2,
      offsexY: 2,
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
  const { secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const values = Object.values(data[0]);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  const [series] = useState(values);

  const [options, setOptions] = useState(pieChartOptions);
  const [pieChartColorMode, setPieChartColorMode] = useState('single'); // Default to 'single'
  const [chartMode, setChartMode] = useState('full'); // Default to 'full'
  const [chartType, setChartType] = useState('pie'); // Default to 'pie'

  useEffect(() => {
    setOptions((prevState) => {
      let updatedColors;
      if (pieChartColorMode === 'single') {
        updatedColors = values.map((value) => getColorIntensity(value, maxValue, minValue));
      } else {
        updatedColors = [warning, primaryMain, successDark, '#ff5733', '#ffbd33'];
      }

      return {
        ...prevState,
        chart: {
          ...prevState.chart,
          type: chartType,
        },
        plotOptions: {
          pie: {
            ...prevState.plotOptions.pie,
            startAngle: chartMode === 'full' ? 0 : -90,
            endAngle: chartMode === 'full' ? 360 : 90,
          },
        },
        colors: updatedColors,
        labels: Object.keys(data[0]),
        xaxis: {
          labels: {
            style: {
              colors: Array(Object.keys(data[0]).length - 1).fill(secondary),
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: [secondary],
            },
          },
        },
        grid: {
          borderColor: line,
        },
        tooltip: {
          theme: 'light',
        },
      };
    });
  }, [values, secondary, line, warning, primaryMain, successDark, pieChartColorMode, chartMode, chartType]);

  return (
    <div id="chart">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">5. 만족도</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="standard-select-currency"
            size="small"
            select
            value={pieChartColorMode}
            onChange={(e) => setPieChartColorMode(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
          >
            {colorModes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            size="small"
            select
            value={chartMode}
            onChange={(e) => setChartMode(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
          >
            {chartModes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
      </Grid>
      <MainCard sx={{ mt: 1.75 }}>
        <Box sx={{ p: 3, pb: 0 }}>
        </Box>
        <ReactApexChart options={options} series={series} type={chartType} height={430} />
      </MainCard>
    </div>
  );
};

export default SurveyPieChart;