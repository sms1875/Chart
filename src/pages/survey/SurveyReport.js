import React, { forwardRef } from "react";
import { Box } from "@mui/material";
import ChartRenderer from "./ChartRenderer";

const SurveyReport = forwardRef(({ ChartItem }, ref) => {
  return (
    <Box
      className="SurveyReport print-styles"
      sx={{
        //a4 기준
        width: '21cm',
        height: '29.7cm',
        backgroundColor: 'green', // 제거예정
        margin: '0 auto',
        padding: '1cm',
      }}
      ref={ref}
    >
      {ChartItem.chartItem.map((item, index) => (
        <Box
          key={index}
          item
          sx={{
            "@media print": { pageBreakInside: 'avoid' },
          }}
        >
          <ChartRenderer ChartItem={item} />
        </Box>
      ))}
    </Box>
  );
});

export default SurveyReport;
