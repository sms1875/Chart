import React from "react";
import { Grid } from '@mui/material';
import ChartGenerate from './ChartGenerate';

const surveyData = [
    {
        title: '만족도 조사',
        categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
        data: [44, 55, 41, 17, 25],
    },
    {
        title: '재구매 의사',
        categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
        data: [44, 55, 41, 17, 25],
    },
    {
        title: '음식 맛 평가',
        categories: ['매우맛있음', '맛있음', '보통', '별로', '매우별로'],
        data: [30, 40, 20, 5, 5],
    },
    {
        title: '서비스 만족도',
        categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
        data: [35, 50, 15, 5, 5],
    },
    {
        title: '음식 가격 평가',
        categories: ['매우적절함', '적절함', '보통', '비쌈', '매우비쌈'],
        data: [25, 45, 20, 5, 5],
    },
    {
        title: '응답자 성별',
        categories: ['남성', '여성', '기타'],
        data: [60, 40, 5],
    },
    {
        title: '응답자 나이대',
        categories: ['10대', '20대', '30대', '40대', '50대 이상'],
        data: [10, 30, 25, 20, 15],
    },
    {
        title: '가게 청결도 평가',
        categories: ['매우깨끗함', '깨끗함', '보통', '더러움', '매우더러움'],
        data: [40, 40, 15, 3, 2],
    },
    {
        title: '음식 다양성 만족도',
        categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
        data: [30, 45, 15, 7, 3],
    },
    {
        title: '음식 주문 속도',
        categories: ['매우빠름', '빠름', '보통', '느림', '매우느림'],
        data: [25, 35, 20, 15, 5],
    },
];

const Report = () => {
    return (
      <Grid container className="App print-styles" rowSpacing={3} columnSpacing={3} sx={{ '@media print': { margin: '10mm' } }}>
        {surveyData.map((data, index) => (
          <Grid item xs={8} md={8} lg={8} key={data.title || index}>
            <ChartGenerate data={data} />
          </Grid>
        ))}
      </Grid>
    );
  };

export default Report;
