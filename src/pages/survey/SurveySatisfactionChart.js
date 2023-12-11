import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1.5
  },
  grid: {
    strokeDashArray: 4
  },
  xaxis: {
    type: 'category', // Change to category for discrete x-axis values
    categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'], // Update categories
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  tooltip: {
    x: {
      show: false // Disable x tooltip
    }
  }
};

// ==============================|| SURVEY SATISFACTION CHART ||============================== //

const SurveySatisfactionChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        show: false // Disable legend
      }
    }));
  }, [primary, secondary, line, theme]);

  const [series] = useState([
    {
      name: 'Satisfaction Levels',
      data: [20, 30, 25, 35, 40] // Update data based on survey results
    }
  ]);

  return <ReactApexChart options={options} series={series} type="line" height={345} />;
};

export default SurveySatisfactionChart;
