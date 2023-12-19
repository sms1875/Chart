import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import SurveyChart from './SurveyChart';

/**
 * 차트를 렌더링하는 함수형 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.data - 차트 데이터
 * @returns {JSX.Element} - 렌더링된 차트 컴포넌트
 */
const ChartRenderer = ({ data }) => {
  const [selectedType, setSelectedType] = useState('bar');
  const [selectedShape, setSelectedShape] = useState('full');
  const [selectedLabelFormat, setSelectedLabelFormat] = useState('none');
  const [chartTitle, setChartTitle] = useState('');
  const [isFilterOptionsVisible, setIsFilterOptionsVisible] = useState(false);

  useEffect(() => {
    if (data) {
      const { title, data: chartData, requiredResponses } = data;
      const totalResponses = chartData.reduce((sum, value) => sum + value, 0);

      // 차트 타이틀 및 필수 항목 표시
      setChartTitle(
        <Box>
          {title} ({totalResponses}명)
          {requiredResponses ? <Typography variant="body2" color="error">*필수 항목</Typography> : <Box sx={{ mt: 2.5 }} />}
        </Box>
      );
    }
  }, [data, selectedType, selectedShape, selectedLabelFormat]);

  // 입력값 변경 핸들러
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleMouseEnter = () => {
    //setIsFilterOptionsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsFilterOptionsVisible(false);
  };

  // 선택창 렌더링 함수
  const renderSelectField = (id, label, value, items, setter) => (
    isFilterOptionsVisible && (  // Conditionally render based on visibility
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
          visibility: isFilterOptionsVisible ? 'visible' : 'hidden',
          opacity: isFilterOptionsVisible ? 1 : 0,
          transition: 'visibility 0s, opacity 0.5s linear',
          "@media print": {
            display: "none"  // Hide when printing
          },
        }}
      >
        {items.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )
  );

  // 차트 렌더링 함수
  const renderChart = () => {
    return <SurveyChart />;

  };

  return (
    <Box
      sx={{
        backgroundColor: 'white', // 제거예정
        magrin: '0 auto',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
          {renderSelectField('chart-mode-select', 'Chart Shape', selectedShape, [
            { value: 'full', label: 'Full' },
            { value: 'half', label: 'Half' },
          ], setSelectedShape)}
        </>
      )}

      <Box sx={{ mt: 2 }}>
        {chartTitle && (
          <Typography variant="h5">
            {chartTitle}
          </Typography>
        )}
        {renderChart()}
      </Box>
    </Box>
  );
};

ChartRenderer.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
    requiredResponses: PropTypes.bool,
  }).isRequired,
};

export default ChartRenderer;
