import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController, Filler } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from 'chartjs-plugin-annotation';
import dragDataPlugin from 'chartjs-plugin-dragdata';

// ChartJS 등록
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    Filler,
    zoomPlugin,
    annotationPlugin,
    dragDataPlugin
);

export const DEFAULT_COLOR_COUNT = 10;

/**
 * Y 축 옵션을 설정하는 함수
 * @param {string} axisType - 축의 유형
 * @param {boolean} display - 표시 여부
 * @param {string} position - 위치
 * @param {string} axisLabel - 축 레이블
 * @returns {Object} - Y 축 옵션
 */
export const getYAxisOptions = (axisType, display, position, axisLabel) => ({
    type: axisType,
    display,
    title: {
        display: true,
        text: axisLabel,
    },
    position,
    grid: {
        drawOnChartArea: false,
    },
    ticks: {
        beginAtZero: true,
    },
    axisLabel,
});

/**
 * 차트 데이터셋을 생성하는 함수
 * @param {Array} selectedAxes - 선택된 Y 축
 * @param {Array} chartData - 차트 데이터
 * @param {Array} colors - 색상 배열
 * @returns {Array} - 생성된 차트 데이터셋 배열
 */
export const generateChartDataSets = (selectedAxes, chartData, colors) => (
    chartData
        .filter(data => selectedAxes.includes(data.axis))
        .map((data, index) => ({
            type: data.type,
            label: data.label,
            borderColor: colors[index],
            backgroundColor: colors[index],
            data: data.data,
            yAxisID: data.axis,
        }))
);

/**
 * 차트 옵션을 생성하는 함수
 * @param {Array} selectedAxes - 선택된 Y 축
 * @param {Object} axisConfig - Y 축 설정
 * @param {number} xMin - X 최소값
 * @param {number} xMax - X 최대값
 * @param {boolean} isAnnotationEnabled - 주석 활성화 여부
 * @param {object} isDragDataRef - ref object for isDragData
 * @param {function} onDataUpdate - 데이터 갱신 콜백 함수
 * @returns {Object} - 차트 옵션
 */
export const getChartOptions = (selectedAxes, axisConfig, xMin, xMax, isAnnotationEnabled, isDragDataRef, onDataUpdate) => ({
    scales: {
        x: {
            stacked: true,
        },
        ...axisConfig,
    },
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        dragData: {
            enabled: true,
            round: 2, // 반올림 자릿수
            onDragStart: () => {
                isDragDataRef.current = true;
            },
            onDrag: () => {
                onDataUpdate(); // 데이터 갱신 콜백 호출
            },
            onDragEnd: () => {
                isDragDataRef.current = false;
                onDataUpdate(); // 데이터 갱신 콜백 호출
            },
        },
        tooltip: {
            callbacks: {
                afterLabel: (context) => {
                    let afterLabel = context.dataset.afterLabel || '';

                    if (context.parsed.y !== null) {
                        afterLabel += `(${context.dataset.yAxisID})`;
                    }
                    return afterLabel;
                },
            },
        },
        zoom: {
            pan: {
                enabled: true,
                onPanStart: () => (isDragDataRef.current ? false : true),
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true,
                },
                mode: 'x',
            },
        },
        annotation: {
            annotations: {
                box1: {
                    display: isAnnotationEnabled,
                    drawTime: 'beforeDraw',
                    type: 'box',
                    xMin,
                    xMax,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
            },
        },
    },
});

/**
 * 색상 배열을 생성하는 함수
 * @param {number} count - 색상 개수
 * @returns {Array} - 생성된 색상 배열
 */
export const generateRandomColors = (count) => (
    Array.from({ length: count }, () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
);

export const colors = generateRandomColors(DEFAULT_COLOR_COUNT);
