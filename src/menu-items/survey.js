// assets
import { ChromeOutlined, QuestionOutlined, PrinterOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  PrinterOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const survey = {
  id: 'survey',
  title: 'survey',
  type: 'group',
  children: [
    {
      id: 'Results',
      title: 'Results',
      type: 'item',
      url: '/survey/result',
      icon: icons.PrinterOutlined
    },
  ]
};

export default survey;
