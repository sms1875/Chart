import React, { useRef } from "react";
import SurveyReport from "./SurveyReport";
import PrintButton from "./PrintButton";
import { Grid } from "@mui/material";


/**
 * 설문 결과를 표시하는 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.surveyItems - 설문 항목 목록
 * @param {Object} props.generatedData - 생성된 설문 데이터
 * @returns {JSX.Element} - 렌더링된 설문 결과 컴포넌트
 */
const SurveyResults = ({ ChartItem }) => {
  // 프린트를 위한 레퍼런스
  const printRef = useRef();

  /**
   * 선택된 필터 타입에 기반하여 필터 카테고리를 가져오는 함수
   * @returns {Array} - 선택된 필터 타입의 카테고리 목록
   */

  return (
    <Grid container className="App" direction="column">
      {/* 헤더 */}
      <Grid item className="header" container justifyContent="flex-end" sx={{ mt: 2 }}>
        {/* 프린트 버튼 */}
        <PrintButton printRef={printRef} />
      </Grid>

      {/* 리포트 */}
      <Grid item>
        {/* 필터 프롭스를 Report 컴포넌트에 전달 */}
        <SurveyReport
          ChartItem={ChartItem}
          ref={printRef}
        />
      </Grid>
    </Grid>
  );
};

export default SurveyResults;
