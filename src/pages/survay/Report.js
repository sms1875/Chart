import React, {useState} from "react";
import { Grid, TextField, MenuItem } from '@mui/material';
import ChartGenerate from './ChartGenerate';

const surveyItems = [
    {
        title: '응답자 성별',
        categories: ['남성', '여성', '기타'],
        requiredResponses: true,
    },
    {
        title: '응답자 나이대',
        categories: ['10대', '20대', '30대', '40대', '50대 이상'],
        requiredResponses: true,
    },
    {
        title: '만족도 조사',
        categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
        requiredResponses: true,
    },
    {
        title: '재구매 의사',
        categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
        requiredResponses: true,
    },
    {
        title: '음식 맛 평가',
        categories: ['매우맛있음', '맛있음', '보통', '별로', '매우별로'],
        requiredResponses: true,
    },
];

const surveys = {
    surveys: [
        {
            '응답자 성별': '남성',
            '응답자 나이대': '10대',
            '만족도 조사': '매우만족',
            '재구매 의사': '매우만족',
            '음식 맛 평가': '매우맛있음',
        },
        {
            '응답자 성별': '여성',
            '응답자 나이대': '20대',
            '만족도 조사': '만족',
            '재구매 의사': '만족',
            '음식 맛 평가': '맛있음',
        },
        {
            '응답자 성별': '남성',
            '응답자 나이대': '30대',
            '만족도 조사': '보통',
            '재구매 의사': '보통',
            '음식 맛 평가': '보통',
        },
        {
            '응답자 성별': '여성',
            '응답자 나이대': '40대',
            '만족도 조사': '불만족',
            '재구매 의사': '불만족',
            '음식 맛 평가': '별로',
        },
        {
            '응답자 성별': '기타',
            '응답자 나이대': '50대 이상',
            '만족도 조사': '매우불만족',
            '재구매 의사': '매우불만족',
            '음식 맛 평가': '매우별로',
        },
    ],
};

const generateData = (surveyItems, surveys, filterType, filterValue) => {
    const surveyData = [];
  
    surveyItems.forEach((item) => {
      const dataItem = {
        title: item.title,
        categories: item.categories,
        data: Array(item.categories.length).fill(0), // Initialize data array with zeros
      };
  
      surveys.surveys.forEach((response) => {
        if (!filterType || response[filterType] === filterValue) {
          const categoryValue = response[item.title];
  
          // Find the index of the category in the data array
          const categoryIndex = item.categories.indexOf(categoryValue);
  
          // Increment the corresponding category count
          dataItem.data[categoryIndex]++;
        }
      });
  
      surveyData.push(dataItem);
    });
  
    return surveyData;
  };
  
  const Report = () => {
    const [filterType, setFilterType] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const surveyData = generateData(surveyItems, surveys, filterType, filterValue);
  
    const handleFilterTypeChange = (event) => {
      setFilterType(event.target.value);
      setFilterValue(""); // Reset filter value when filter type changes
    };
  
    const handleFilterValueChange = (event) => {
      setFilterValue(event.target.value);
    };
  
    return (
      <Grid
        container
        className="App print-styles"
        rowSpacing={3}
        columnSpacing={3}
        sx={{ "@media print": { margin: "10mm" } }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            id="filter-type-select"
            select
            label="Filter Type"
            value={filterType}
            onChange={handleFilterTypeChange}
            fullWidth
          >
            <MenuItem value="">전체</MenuItem>
            {surveyItems.map((item) => (
              <MenuItem key={item.title} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {filterType && (
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              id="filter-value-select"
              select
              label={`Filter Value (${filterType})`}
              value={filterValue}
              onChange={handleFilterValueChange}
              fullWidth
            >
              <MenuItem value="">전체</MenuItem>
              {surveyItems
                .find((item) => item.title === filterType)
                .categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        )}
        {surveyData.map((data, index) => (
          <Grid item xs={8} md={8} lg={8} key={data.title || index}>
            <ChartGenerate data={data} />
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default Report;

/*
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
    }
];
*/