import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, TextField } from '@mui/material';
import SurveyTable from './SurveyTable';
import SurveyBarChart from './SurveyBarChart';
import SurveyPieChart from './SurveyPieChart';

const ChartGenerate = ({ data }) => {
  const [selectedType, setSelectedType] = useState('bar');

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const renderChartOrTable = (type) => {
    switch (type) {
      case 'bar':
        return <SurveyBarChart data={data} />;
      case 'pie':
        return <SurveyPieChart data={data} />;
      case 'table':
        return <SurveyTable data={data} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <TextField
        id="chart-type-select"
        size="small"
        select
        label="Chart Type"
        value={selectedType}
        onChange={handleChangeType}
        sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' }, marginLeft: 'auto', mt: 2 }}
      >
        <MenuItem value="bar">Bar Chart</MenuItem>
        <MenuItem value="pie">Pie Chart</MenuItem>
        <MenuItem value="table">Table</MenuItem>
      </TextField>
      <Box sx={{ mt: 2 }}>
        {renderChartOrTable(selectedType)}
      </Box>
    </Box>
  );
};

ChartGenerate.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default ChartGenerate;
