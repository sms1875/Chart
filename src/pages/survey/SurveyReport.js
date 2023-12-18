import React, { forwardRef, useMemo } from "react";
import { Box } from "@mui/material";
import ChartRenderer from "./ChartRenderer";

/**
 * 설문 데이터를 집계하는 함수
 * @param {Array} surveyItems - 설문 항목들의 배열
 * @param {Array} filteredSurveys - 필터링된 설문 데이터 배열
 * @returns {Array} - 집계된 데이터 배열
 */
const aggregateSurveyData = (surveyItems, filteredSurveys) => {
  const aggregatedData = {};

  // 집계 데이터 초기화 함수
  const initializeAggregatedData = () => {
    surveyItems.forEach((item) => {
      aggregatedData[item.title] = {
        title: item.title,
        categories: item.categories,
        data: Array(item.categories.length).fill(0),
        requiredResponses: item.requiredResponses,
      };
    });
  };

  // 설문 데이터 개수 카운트 함수
  const countSurveyData = () => {
    filteredSurveys.forEach((response) => {
      surveyItems.forEach((item) => {
        const categoryValue = response[item.title];
        const categoryIndex = item.categories.indexOf(categoryValue);
        aggregatedData[item.title].data[categoryIndex]++;
      });
    });
  };

  initializeAggregatedData();
  countSurveyData();

  return Object.values(aggregatedData);
};

/**
 * 설문 리포트 컴포넌트
 * @param {string} filterType - 필터 유형
 * @param {string} filterValue - 필터 값
 * @param {Array} surveyItems - 설문 항목들의 배열
 * @param {Object} surveys - 설문 데이터 객체
 * @param {React.Ref} ref - React Forwarded Ref
 * @returns {JSX.Element} - 렌더링된 리포트 컴포넌트
 */
const SurveyReport = forwardRef(
  ({ filterType, filterValue, surveyItems, surveys }, ref) => {
    // 필터링된 데이터를 생성
    const filteredSurveys = useMemo(
      () =>
        surveys.surveys.filter(
          (response) => !filterType || response[filterType] === filterValue
        ),
      [surveys.surveys, filterType, filterValue]
    );

    // 집계된 데이터를 Memoization
    const aggregatedData = useMemo(
      () => aggregateSurveyData(surveyItems, filteredSurveys),
      [surveyItems, filteredSurveys]
    );

    return (
      <Box
        className="SurveyReport print-styles"
        sx={{
          height: '29.7cm',
          width: '21cm',
          backgroundColor: 'green', // 제거예정
          margin: '0 auto',
          padding: '1cm',
        }}
        ref={ref}
      >
        {aggregatedData.map((data, index) => (
          <Box 
            item
            key={data.title || index}
            sx={{
              "@media print": { pageBreakInside: 'avoid' },
            }}
          >
            <ChartRenderer data={data} />
          </Box>
        ))}
      </Box>
    );
  }
);

export default SurveyReport;
