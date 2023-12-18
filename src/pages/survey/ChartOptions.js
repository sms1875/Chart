/**
 * 기본 차트 옵션
 */
export const DefaultChartOptions = {
  chart: {
    background: 'pink', // 제거예정
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    width : '100%',
    height: '100%',
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
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
  tooltip: {
    enabled: false,
  },
  responsive: [{
    breakpoint: undefined,
    options: {},
  }]
};
