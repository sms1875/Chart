import React, { forwardRef } from "react";
import ChartRenderer from "./ChartRenderer";

const SurveyReport = forwardRef(({ ChartItem }, ref) => {
  return (
    <div
      className="SurveyReport print-styles"
      style={{
        //a4 기준
        width: '21cm',
        height: '29.7cm',
        backgroundColor: 'green', // 제거예정
        margin: '0 auto',
        padding: '1cm',
      }}
      ref={ref}
    >
      <div
        style={{
          "@media print": { pageBreakInside: 'avoid' },
          backgroundColor: 'white', // 제거 예정
        }}
      >
        <ChartRenderer ChartItem={ChartItem} />
      </div>
    </div>
  );
});

export default SurveyReport;
