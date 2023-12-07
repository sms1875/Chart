import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

// chart options for pie chart
const pieChartOptions = {
  chart: {
    type: 'pie',
    height: 430,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
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

// ==============================|| SALES PIE CHART ||============================== //

const SurveyPieChart = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series] = useState([180, 90, 135, 114, 120]); // Use a single series for pie chart

  const [options, setOptions] = useState(pieChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
      labels: ['매우만족', '만족', '보통', '불만족', '매우불만족'], // Add labels for each data point
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary],
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
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="pie" height={430} />
    </div>
  );
};

export default SurveyPieChart;
