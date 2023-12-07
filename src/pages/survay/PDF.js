import { useState } from 'react';

// material-ui
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';

// project import
import SurveyResultTable from './SurveyResultTable';
import SurveyBarChart from './SurveyBarChart';
import SurveySatisfactionChart from './SurveySatisfactionChart';
import SurveyPieChart from './SurveyPieChart';
import MainCard from 'components/MainCard';

// sales report status
const status = [
  {
    value: 'table',
    label: 'table'
  },
  {
    value: 'bar',
    label: 'bar'
  },
  {
    value: 'area',
    label: 'area'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const PDF = () => {
  const [value, setValue] = useState('table');

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">1. 만족도</Typography>
          </Grid>
          <Grid item />
          <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
          </Box>
          <SurveyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
          <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <SurveyResultTable />
        </MainCard>
      </Grid>


      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
          <TextField
            id="standard-select-currency"
            size="small"
            select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <SurveySatisfactionChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">5. 만족도</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Box sx={{ p: 3, pb: 0 }}>
          </Box>
          <SurveyPieChart chartType={'table'} />
        </MainCard>
      </Grid>
          
    </Grid>
  );
};

export default PDF;
