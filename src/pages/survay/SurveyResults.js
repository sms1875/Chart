import React, { useRef } from "react";
import ReactToPrint from 'react-to-print';
import Report from "./Report";
import { Button, Grid } from "@mui/material";

const SurveyResults = () => {
  const ref = useRef();

  return (   
  <Grid container className="App" direction="column">
      <Grid item className="header" container justifyContent="flex-end">
        <Grid item>
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                리포트 출력
              </Button>
            )}
            content={() => ref.current}
            documentTitle="리포트"
          />
        </Grid>
      </Grid>
      <Grid item ref={ref} >
        <Report />
      </Grid>
    </Grid>
  );
};

export default SurveyResults;
