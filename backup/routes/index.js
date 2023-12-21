import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //


// 20231221 템플릿 


export default function ThemeRoutes() {
  return useRoutes([MainRoutes, LoginRoutes]);
}
