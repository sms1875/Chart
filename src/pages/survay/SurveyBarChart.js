import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

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

  useEffect(() => {
    const categories = Object.keys(data[0]);
    const seriesData = [{ data: Object.values(data[0]) }];

    setOptions((prevState) => ({
      ...prevState,
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
  }, [data, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default SurveyBarChart;
