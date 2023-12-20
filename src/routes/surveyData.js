import { faker } from '@faker-js/faker';

/**
 * 날짜 생성 함수
 * @returns {Array} - 생성된 날짜 배열
 */
const generateDate = () => {
  const data = [];
  for (let year = 17; year <= 23; year++) {
    for (let month = 1; month <= 12; month++) {
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      const value = `${year}.${formattedMonth}`;
      data.push(value);
    }
  }
  return data;
};

/**
 * 차트 데이터 생성 함수
 * @param {string} axisType - Y 축 타입
 * @returns {Array} - 생성된 차트 데이터 배열
 */
const generateChartData = (axisType) => {
  const data = [];
  for (let year = 17; year <= 23; year++) {
    for (let month = 1; month <= 12; month++) {
      let value;
      switch (axisType) {
        case 'axis1':
          value = faker.number.float({ min: -1, max: 1 }).toFixed(2);
          break;
        case 'axis2':
          value = faker.number.int({ min: 20, max: 100 });
          break;
        case 'axis3':
          value = faker.number.float({ min: 1, max: 10 }).toFixed(2);
          break;
        case 'axis4':
          value = faker.number.int({ min: -100, max: 100 }).toFixed(2);
          break;
        case 'axis5':
          value = faker.number.int({ min: 0, max: 100000 }).toFixed(2);
          break;
        default:
          value = 0;
      }
      data.push(value);
    }
  }
  return data;
};

/**
 * 설문 결과 데이터 객체
 */
export const ChartItem = [
  {
    name: 'Chart 1',
    date: generateDate(),
    axis: ['axis1', 'axis2', 'axis3', 'axis4', 'axis5'],
    data: [
      { label: 'data1', axis: 'axis1', data: generateChartData('axis1') },
      { label: 'data2', axis: 'axis2', data: generateChartData('axis2') },
      { label: 'data3', axis: 'axis3', data: generateChartData('axis3') },
      { label: 'data4', axis: 'axis1', data: generateChartData('axis1') },
      { label: 'data5', axis: 'axis2', data: generateChartData('axis2') },
      { label: 'data6', axis: 'axis3', data: generateChartData('axis3') },
      { label: 'data7', axis: 'axis4', data: generateChartData('axis4') },
      { label: 'data8', axis: 'axis5', data: generateChartData('axis5') },
    ],
  },
];

/**
 * 설문 리스트
 */
export const surveyList = [
  {
    id: 1,
    title: '설문조사 1',
    description: '설문조사 1에 대한 설명',
    chartItem: ChartItem,
  },
];