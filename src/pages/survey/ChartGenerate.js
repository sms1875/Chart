import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, TextField } from '@mui/material';
import SurveyTable from './SurveyTable';
import SurveyBarChart from './SurveyBarChart';
import SurveyPieChart from './SurveyPieChart';
import SurveyStackBarChart from './SurveyStackBarChart';
import { pieChartShapes } from './ChartConstants';

const ChartGenerate = ({ data }) => {
  const [selectedType, setSelectedType] = useState('bar');
  const [selectedShape, setSelectedShape] = useState('full');
  const [selectedLabelFormat, setSelectedLabelFormat] = useState('none'); // Add state for selectedLabelFormat

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleChangeShape = (event) => {
    setSelectedShape(event.target.value);
  };

  const handleChangeLabelFormat = (event) => {
    setSelectedLabelFormat(event.target.value);
  };

  const renderChartOrTable = (type) => {
    switch (type) {
      case 'bar':
        return <SurveyBarChart key={selectedLabelFormat} data={data} labelFormat={selectedLabelFormat} />;
      case 'stack':
        return <SurveyStackBarChart key={selectedLabelFormat} data={data} labelFormat={selectedLabelFormat} />;
      case 'pie':
      case 'donut':
        return (
          <SurveyPieChart
            key={selectedLabelFormat} // Add key prop to force re-render
            data={data}
            type={selectedType}
            shape={selectedShape}
            labelFormat={selectedLabelFormat}
          />
        );
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
        sx={{
          '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' },
          marginLeft: 'auto',
          mt: 2,
          "@media print": { display: 'none' }
        }} >
        <MenuItem value="bar">Bar Chart</MenuItem>
        <MenuItem value="stack">Stack</MenuItem>
        <MenuItem value="pie">Pie Chart</MenuItem>
        <MenuItem value="donut">Donut</MenuItem>
        <MenuItem value="table">Table</MenuItem>
      </TextField>
      {(selectedType !== 'table') && (
        <TextField
          id="chart-label-format-select"
          size="small"
          select
          label="Data Label Format"
          value={selectedLabelFormat}
          onChange={handleChangeLabelFormat}
          sx={{
            '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' },
            marginLeft: 'auto',
            mt: 2,
            "@media print": { display: 'none' }
          }} >
          <MenuItem value="none">none</MenuItem>
          <MenuItem value="percentage">Percentage</MenuItem>
          <MenuItem value="value">Value</MenuItem>
        </TextField>
      )}
      {(selectedType === 'pie' || selectedType === 'donut') && (
        <>
          <TextField
            id="chart-mode-select"
            size="small"
            select
            label="Chart Shape"
            value={selectedShape}
            onChange={handleChangeShape}
            sx={{
              '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' },
              marginLeft: 'auto',
              mt: 2,
              "@media print": { display: 'none' }
            }}
          >
            {pieChartShapes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </>
      )}
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