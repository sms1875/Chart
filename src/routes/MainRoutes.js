import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const SurveyResults = Loadable(lazy(() => import('pages/survey/SurveyResults')));
const SurveyList = Loadable(lazy(() => import('pages/survey/SurveyList')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //
import { surveyList } from 'routes/surveyData';


const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },    
    {
      path: 'survey',
      children: [
        {
          path: 'result',
          element: <SurveyList surveyList={surveyList} />,
        },
        ...surveyList.map((survey) => ({
          path: `result/${survey.id}`,
          element: <SurveyResults surveyItems={survey.items} generatedData={survey.generatedData} />,
        })),
      ]
      // TODO 
      // survey/ 주소로 SurveyList 표시
      // survey/1 주소로 SurveyResults 표시
      // 현재상태 : survey/1로 접속시 SurveyList가 표시
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;