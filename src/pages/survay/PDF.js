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

const colorModes = [
  {
    value: 'single',
    label: 'Single Color'
  },
  {
    value: 'multiple',
    label: 'Multiple Colors'
  }
];

const chartModes = [
  {
    value: 'full',
    label: 'Full'
  },
  {
    value: 'half',
    label: 'Half'
  }
];


const chartTypes = [
  {
    value: 'pie',
    label: 'pie'
  },
  {
    value: 'donut',
    label: 'donut'
  }
];
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const PDF = () => {
  const [value, setValue] = useState('table');
  const [pieChartColorMode, setPieChartColorMode] = useState('single'); // Default to 'single'
  const [chartMode, setChartMode] = useState('full'); // Default to 'full'
  const [chartType, setChartType] = useState('pie'); // Default to 'pie'

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      {/* row 1 */}
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

      {/* row 2 */}
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


      {/* row 3 */}
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
              value={pieChartColorMode}
              onChange={(e) => setPieChartColorMode(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {colorModes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={chartMode}
              onChange={(e) => setChartMode(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {chartModes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {chartTypes.map((option) => (
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
          <SurveyPieChart colorMode={pieChartColorMode} chartMode={chartMode} chartType={chartType} />
        </MainCard>
      </Grid>

      {/* row 5 */}
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
              value={pieChartColorMode}
              onChange={(e) => setPieChartColorMode(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {colorModes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={chartMode}
              onChange={(e) => setChartMode(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {chartModes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {chartTypes.map((option) => (
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
          <SurveyPieChart colorMode={pieChartColorMode} chartMode={chartMode} chartType={chartType} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default PDF;
