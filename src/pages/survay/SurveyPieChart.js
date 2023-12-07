import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const getColorIntensity = (value, max, min) => {
  // Calculate the color intensity based on the value, max, and min
  const normalizedValue = (value - min) / (max - min);
  const intensity = Math.round(20 + normalizedValue * 80); // Adjust the range (20% - 100%) as needed
  return `rgba(255, 0, 0, ${intensity / 100})`;
};

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

const SurveyPieChart = ({ colorMode, chartMode, chartType, data }) => {
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
  
  useEffect(() => {
    setOptions((prevState) => {
      let updatedColors;
      if (colorMode === 'single') {
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
  }, [values, secondary, line, warning, primaryMain, successDark, colorMode, chartMode, chartType]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type={chartType} height={430} />
    </div>
  );
};

export default SurveyPieChart;