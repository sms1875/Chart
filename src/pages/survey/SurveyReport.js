import React, { forwardRef } from "react";
import ChartRenderer from "./ChartRenderer";

// SurveyReport 컴포넌트
// - ref를 활용하여 외부에서 참조 가능
// - ChartRenderer를 렌더링하고 있음
const SurveyReport = forwardRef(({ ChartItem }, ref) => {
  return (
    <div
      // 컴포넌트 전체 스타일 정의
      className="SurveyReport print-styles"
      style={{
        // A4 기준 크기 및 스타일
        width: '21cm',
        height: '29.7cm',
        backgroundColor: 'green', // 제거 예정
        margin: '0 auto',
        padding: '1cm',
      }}
      ref={ref} // ref를 설정하여 외부에서 참조 가능하도록 함
    >
      <div
        style={{
          "@media print": { pageBreakInside: 'avoid' },
          backgroundColor: 'white', // 제거 예정
        }}
      >
        {/* ChartRenderer 컴포넌트를 렌더링 */}
        <ChartRenderer ChartItem={ChartItem} />
      </div>
    </div>
  );
});

export default SurveyReport;