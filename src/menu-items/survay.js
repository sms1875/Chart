// assets
import { ChromeOutlined, QuestionOutlined, PrinterOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  PrinterOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const survay = {
  id: 'survay',
  title: 'Survay',
  type: 'group',
  children: [
    {
      id: 'Results',
      title: 'Results',
      type: 'item',
      url: '/survay/results',
      icon: icons.PrinterOutlined
    }
  ]
};

export default survay;
