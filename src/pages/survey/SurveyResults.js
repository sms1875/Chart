import React, { useState, useRef } from "react";
import ReactToPrint from 'react-to-print';
import Report from "./Report";
import { Button, Grid, TextField, MenuItem } from "@mui/material";
import { PrinterOutlined } from '@ant-design/icons';

const ALL_OPTIONS = '전체';

const SurveyResults = ({ surveyItems, generatedData }) => {
  const ref = useRef();
  const [filterType, setFilterType] = useState(ALL_OPTIONS);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterTypeChange = (event) => {
    const newFilterType = event.target.value;
    setFilterType(newFilterType);
    setFilterValue(""); // Reset filter value when filter type changes
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const getFilterCategories = () => {
    const selectedCategory = surveyItems.find((item) => item.title === filterType);
    return selectedCategory ? selectedCategory.categories : [];
  };

  const renderFilterMenuItem = (item) => (
    <MenuItem key={item.title} value={item.title}>
      {item.title}
    </MenuItem>
  );

  const renderFilterValueMenuItem = (category) => (
    <MenuItem key={category} value={category}>
      {category}
    </MenuItem>
  );

  const defaultFilterValue = filterType ? getFilterCategories()[0] : "";

  return (
    <Grid container className="App" direction="column">
      <Grid item className="header" container justifyContent="flex-end" sx={{ mt: 2 }}>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              <PrinterOutlined />
            </Button>
          )}
          content={() => ref.current}
          documentTitle="리포트"
        />
      </Grid>
      <Grid item>
        <TextField
          id="filter-type-select"
          select
          label="Filter Type"
          value={filterType}
          onChange={handleFilterTypeChange}
          fullWidth
        >
          <MenuItem value={ALL_OPTIONS}>{ALL_OPTIONS}</MenuItem>
          {surveyItems.map(renderFilterMenuItem)}
        </TextField>
        {filterType && filterType !== ALL_OPTIONS && (
          <TextField
            id="filter-value-select"
            select
            label={`Filter Value (${filterType})`}
            value={filterValue || defaultFilterValue}
            onChange={handleFilterValueChange}
            fullWidth
          >
            {getFilterCategories().map(renderFilterValueMenuItem)}
          </TextField>
        )}
      </Grid>
      <Grid item>
        <Report
          filterType={filterType}
          filterValue={filterValue || defaultFilterValue}
          onFilterTypeChange={handleFilterTypeChange}
          onFilterValueChange={handleFilterValueChange}
          surveyItems={surveyItems}
          surveys={generatedData}
          ref={ref}
        />
      </Grid>
    </Grid>
  );
};

export default SurveyResults;