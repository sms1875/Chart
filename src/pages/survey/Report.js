import React, { forwardRef } from "react";
import { Grid } from "@mui/material";
import ChartGenerate from "./ChartGenerate";

const generateData = (surveyItems, surveys, filterType, filterValue) => {
  const filteredSurveys = surveys.surveys.filter(
    (response) => !filterType || response[filterType] === filterValue
  );

  const aggregatedData = {};

  surveyItems.forEach((item) => {
    aggregatedData[item.title] = {
      title: item.title,
      categories: item.categories,
      data: Array(item.categories.length).fill(0),
      requiredResponses: item.requiredResponses, // Add requiredResponses property
    };
  });

  filteredSurveys.forEach((response) => {
    surveyItems.forEach((item) => {
      const categoryValue = response[item.title];
      const categoryIndex = item.categories.indexOf(categoryValue);
      aggregatedData[item.title].data[categoryIndex]++;
    });
  });

  return Object.values(aggregatedData);
};

const Report = forwardRef(
  (
    {
      filterType,
      filterValue,
      surveyItems,
      surveys,
    },
    ref
  ) => {
    const surveyData = generateData(
      surveyItems,
      surveys,
      filterType,
      filterValue
    );

    return (
      <Grid
        container
        className="App print-styles"
        rowSpacing={3}
        columnSpacing={3}
        sx={{ "@media print": { margin: "10mm" } }}
        ref={ref}
      >
        {surveyData.map((data, index) => (
          <Grid item xs={8} md={8} lg={8} key={data.title || index}>
            <ChartGenerate data={data} requiredResponses={data.requiredResponses} />
          </Grid>
        ))}
      </Grid>
    );
  }
);

export default Report;
