// import { useState } from 'react';

// material-ui
import {
  Grid,
  Typography
} from '@mui/material';

// project import
import SurveyResultTable from './SurveyResultTable';
import SurveyBarChart from './SurveyBarChart';
import SurveySatisfactionChart from './SurveySatisfactionChart';
import SurveyPieChart from './SurveyPieChart';
import MainCard from 'components/MainCard';

const testData = [
  {
    '매우 만족': 25,
    '만족': 20,
    '보통': 15,
    '불만족': 10,
    '매우 불만족': 5
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
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {/* Pass the testData to SurveyResultTable */}
          <SurveyResultTable data={testData} />
        </MainCard>
      </Grid>


      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
          <SurveySatisfactionChart />
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
