import React, { useRef } from "react";
import SurveyReport from "./SurveyReport";
import PrintButton from "./PrintButton";

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

  return (
    <div className="App">
      {/* 헤더 */}
      <div className="header" style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        {/* 프린트 버튼 */}
        <PrintButton printRef={printRef} />
      </div>

      {/* 리포트 */}
      <div>
        {/* 필터 프롭스를 Report 컴포넌트에 전달 */}
        <SurveyReport ChartItem={ChartItem} ref={printRef} />
      </div>
    </div>
  );
};

export default SurveyResults;
