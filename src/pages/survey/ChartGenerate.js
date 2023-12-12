import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import SurveyTable from './SurveyTable';
import SurveyBarChart from './SurveyBarChart';
import SurveyPieChart from './SurveyPieChart';
import SurveyStackBarChart from './SurveyStackBarChart';
import { pieChartShapes } from './ChartOptions';
import MainCard from 'components/MainCard';

const ChartGenerate = ({ data }) => {
  const [selectedType, setSelectedType] = useState('bar');
  const [selectedShape, setSelectedShape] = useState('full');
  const [selectedLabelFormat, setSelectedLabelFormat] = useState('none');
  const [chartTitle, setChartTitle] = useState('');

  useEffect(() => {
    if (data) {
      const { title, data: chartData, requiredResponses } = data;
      const totalResponses = chartData.reduce((sum, value) => sum + value, 0);

      setChartTitle(
        <Box>
          {title} ({totalResponses}명)
          {requiredResponses ? <Typography variant="body2" color="error">*필수 항목</Typography> : <Box sx={{ mt: 4 }} />}
        </Box>
      );
    }
  }, [data, selectedType, selectedShape, selectedLabelFormat]);

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const renderSelectField = (id, label, value, items, setter) => (
    <TextField
      id={id}
      size="small"
      select
      label={label}
      value={value}
      onChange={(event) => handleChange(event, setter)}
      sx={{
        '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' },
        marginLeft: 'auto',
        mt: 2,
        "@media print": { display: 'none' }
      }}
    >
      {items.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderChart = () => {
    const chartProps = { data, type: selectedType, shape: selectedShape, labelFormat: selectedLabelFormat };

    switch (selectedType) {
      case 'bar':
        return <SurveyBarChart key={selectedLabelFormat} {...chartProps} />;
      case 'stack':
        return <SurveyStackBarChart key={selectedLabelFormat} {...chartProps} />;
      case 'pie':
      case 'donut':
        return <SurveyPieChart key={selectedLabelFormat} {...chartProps} />;
      case 'table':
        return <SurveyTable data={data} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      {renderSelectField('chart-type-select', 'Chart Type', selectedType, [
        { value: 'bar', label: 'Bar Chart' },
        { value: 'stack', label: 'Stack' },
        { value: 'pie', label: 'Pie Chart' },
        { value: 'donut', label: 'Donut' },
        { value: 'table', label: 'Table' },
      ], setSelectedType)}

      {(selectedType !== 'table') && renderSelectField('chart-label-format-select', 'Data Label Format', selectedLabelFormat, [
        { value: 'none', label: 'None' },
        { value: 'percentage', label: 'Percentage' },
        { value: 'value', label: 'Value' },
      ], setSelectedLabelFormat)}

      {(selectedType === 'pie' || selectedType === 'donut') && (
        <>
          {renderSelectField('chart-mode-select', 'Chart Shape', selectedShape, pieChartShapes, setSelectedShape)}
        </>
      )}

      <Box sx={{ mt: 2 }}>
        {chartTitle && (
          <Typography variant="h5">
            {chartTitle}
          </Typography>
        )}
        <MainCard sx={{ mt: 2 }} content={false}>
          {renderChart()}
        </MainCard>
      </Box>
    </Box>
  );
};

ChartGenerate.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
    requiredResponses: PropTypes.bool,
  }).isRequired,
};

export default ChartGenerate;
