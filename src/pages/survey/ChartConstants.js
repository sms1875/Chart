export const DefaultChartOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false
        },
        height: 'auto'
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        labels: {
            show: false
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

export const colorModes = [
    { value: 'single', label: 'Single Color' },
    { value: 'multiple', label: 'Multiple Colors' },
];

export const pieChartShapes = [
    { value: 'full', label: 'Full' },
    { value: 'half', label: 'Half' },
];