import React, { useState, useRef, useCallback } from "react";
import SurveyReport from "./SurveyReport";
import PrintButton from "./PrintButton";
import FilterSection from "./FilterSection";
import { Grid } from "@mui/material";

// "전체" 옵션을 나타내는 상수
const ALL_OPTIONS = '전체';

/**
 * 설문 결과를 표시하는 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.surveyItems - 설문 항목 목록
 * @param {Object} props.generatedData - 생성된 설문 데이터
 * @returns {JSX.Element} - 렌더링된 설문 결과 컴포넌트
 */
const SurveyResults = ({ surveyItems, generatedData }) => {
  // 프린트를 위한 레퍼런스
  const printRef = useRef();

  // 필터 상태를 관리하는 상태
  const [filterType, setFilterType] = useState(ALL_OPTIONS);
  const [filterValue, setFilterValue] = useState("");

  /**
   * 필터 값 변경을 처리하는 콜백 함수
   * @param {string} type - 변경된 필터 타입
   * @param {string} value - 변경된 필터 값
   */
  const handleFilterChange = useCallback((type, value) => {
    setFilterType(type);
    setFilterValue(value);
  }, []);

  /**
   * 선택된 필터 타입에 기반하여 필터 카테고리를 가져오는 함수
   * @returns {Array} - 선택된 필터 타입의 카테고리 목록
   */
  const getFilterCategories = useCallback(() => {
    const selectedCategory = surveyItems.find((item) => item.title === filterType);
    return selectedCategory ? selectedCategory.categories : [];
  }, [surveyItems, filterType]);

  // 선택된 필터 타입에 따라 기본 필터 값 설정
  const defaultFilterValue = filterType ? getFilterCategories()[0] : "";

  return (
    <Grid container className="App" direction="column">
      {/* 헤더 */}
      <Grid item className="header" container justifyContent="flex-end" sx={{ mt: 2 }}>
        {/* 프린트 버튼 */}
        <PrintButton printRef={printRef} />
      </Grid>

      {/* 필터 */}
      <Grid item>
        {/* 필터 섹션 */}
        <FilterSection
          filterType={filterType}
          filterValue={filterValue || defaultFilterValue}
          onFilterChange={handleFilterChange}
          surveyItems={surveyItems}
        />
      </Grid>

      {/* 리포트 */}
      <Grid item>
        {/* 필터 프롭스를 Report 컴포넌트에 전달 */}
        <SurveyReport
          filterType={filterType}
          filterValue={filterValue || defaultFilterValue}
          onFilterChange={handleFilterChange}
          surveyItems={surveyItems}
          surveys={generatedData}
          ref={printRef}
        />
      </Grid>
    </Grid>
  );
};

export default SurveyResults;
