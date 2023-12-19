import React from 'react';
import { Box } from '@mui/material';
import SurveyChart from './SurveyChart';

/**
 * 차트를 렌더링하는 함수형 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.data - 차트 데이터
 * @returns {JSX.Element} - 렌더링된 차트 컴포넌트
 */
const ChartRenderer = ({ ChartItem }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white', // 제거 예정
      }}>
      <SurveyChart ChartItem={ChartItem} />
    </Box>
  );
};

export default ChartRenderer;
