// import { useState } from 'react';

// material-ui
import {
  Grid,
} from '@mui/material';

// project import
import SurveyResultTable from './SurveyResultTable';
import SurveyBarChart from './SurveyBarChart';
import SurveyPieChart from './SurveyPieChart';

const testData = [
  {
    title : '만족도 조사',
    categories: ['매우만족', '만족', '보통', '불만족', '매우불만족'],
    data: [44, 55, 41, 17, 25]
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const PDF = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>

       {/* row 1 */}
       <Grid item xs={12} md={7} lg={8}>
          <SurveyBarChart data={testData} />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <SurveyResultTable data={testData}/>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
          <SurveyPieChart data={testData} />
      </Grid>

      {/* row 5 */}
      <Grid item xs={12} md={7} lg={8}>
          <SurveyPieChart data={testData} />
      </Grid>

    </Grid>
  );
};

export default PDF;
