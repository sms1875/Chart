import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const SurveyList = ({ surveyList }) => (
  <>
    {surveyList.map((survey) => (
      <MainCard key={survey.id} title={`DataSet1 ${survey.id}`}>
        <Typography variant="body2">
          <Link to={`/survey/result/${survey.id}`}>{`View Results ${survey.id}`}</Link>
        </Typography>
      </MainCard>
    ))}
  </>
);

export default SurveyList;
