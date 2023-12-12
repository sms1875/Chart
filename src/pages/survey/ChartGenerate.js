import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import SurveyTable from './SurveyTable';
import SurveyBarChart from './SurveyBarChart';
import SurveyPieChart from './SurveyPieChart';
import SurveyStackBarChart from './SurveyStackBarChart';
import { pieChartShapes } from './ChartConstants';
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
        <span>
          {title} ({totalResponses}명)
          {requiredResponses ? <Typography variant="body2" color="error">*필수 항목</Typography> : <Box sx={{ mt: 2 }} />}
        </span>
      );
    }
  }, [data, selectedType, selectedShape, selectedLabelFormat]);

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
            key={selectedLabelFormat}
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

  const renderSelectField = (id, label, value, onChange, items) => (
    <TextField
      id={id}
      size="small"
      select
      label={label}
      value={value}
      onChange={onChange}
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

  return (
    <Box>
      {renderSelectField('chart-type-select', 'Chart Type', selectedType, handleChangeType, [
        { value: 'bar', label: 'Bar Chart' },
        { value: 'stack', label: 'Stack' },
        { value: 'pie', label: 'Pie Chart' },
        { value: 'donut', label: 'Donut' },
        { value: 'table', label: 'Table' },
      ])}

      {(selectedType !== 'table') && renderSelectField('chart-label-format-select', 'Data Label Format', selectedLabelFormat, handleChangeLabelFormat, [
        { value: 'none', label: 'None' },
        { value: 'percentage', label: 'Percentage' },
        { value: 'value', label: 'Value' },
      ])}

      {(selectedType === 'pie' || selectedType === 'donut') && (
        <>
          {renderSelectField('chart-mode-select', 'Chart Shape', selectedShape, handleChangeShape, pieChartShapes)}
        </>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5">{chartTitle}</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          {renderChartOrTable(selectedType)}
        </MainCard>
      </Box>
    </Box>
  );
};

ChartGenerate.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default ChartGenerate;