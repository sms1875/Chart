import React, { useState, useRef } from "react";
import ReactToPrint from 'react-to-print';
import Report from "./Report";
import { Button, Grid, TextField, MenuItem } from "@mui/material";
import { PrinterOutlined } from '@ant-design/icons';


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

const ALL_OPTIONS = '전체'; 

const SurveyResults = () => {
  const ref = useRef();
  const [filterType, setFilterType] = useState(ALL_OPTIONS);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterTypeChange = (event) => {
    const newFilterType = event.target.value;
    setFilterType(newFilterType);
    setFilterValue(""); // Reset filter value when filter type changes
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const getFilterCategories = () => {
    const selectedCategory = surveyItems.find((item) => item.title === filterType);
    return selectedCategory ? selectedCategory.categories : [];
  };

  const defaultFilterValue = filterType ? getFilterCategories()[0] : "";

  return (
    <Grid container className="App" direction="column">
      <Grid item className="header" container justifyContent="flex-end" sx={{ mt: 2 }}>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              <PrinterOutlined /> 
            </Button>
          )}
          content={() => ref.current}
          documentTitle="리포트"
        />
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              id="filter-type-select"
              select
              label="Filter Type"
              value={filterType}
              onChange={handleFilterTypeChange}
              fullWidth
            >
              <MenuItem value={ALL_OPTIONS}>{ALL_OPTIONS}</MenuItem>
              {surveyItems.map((item) => (
                <MenuItem key={item.title} value={item.title}>
                  {item.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {filterType && filterType !== ALL_OPTIONS && (
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                id="filter-value-select"
                select
                label={`Filter Value (${filterType})`}
                value={filterValue || defaultFilterValue}
                onChange={handleFilterValueChange}
                fullWidth
              >
                {getFilterCategories().map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Report
          filterType={filterType}
          filterValue={filterValue || defaultFilterValue}
          onFilterTypeChange={handleFilterTypeChange}
          onFilterValueChange={handleFilterValueChange}
          surveyItems={surveyItems}
          surveys={surveys}
          ref={ref}
        />
      </Grid>
    </Grid>
  );
};

export default SurveyResults;