// project import
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import SurveyResults from 'pages/survey/SurveyResults';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <SurveyResults />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
