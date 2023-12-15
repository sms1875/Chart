/**
 * 기본 차트 옵션
 */
export const DefaultChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      height: 'auto',
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
  };
  
  /**
   * 파이 차트 모양 옵션
   */
  export const pieChartShapes = [
    { value: 'full', label: '전체' },
    { value: 'half', label: '반쪽' },
  ];