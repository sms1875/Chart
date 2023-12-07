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
      id: 'PDF',
      title: 'PDF',
      type: 'item',
      url: '/survay/pdf',
      icon: icons.PrinterOutlined
    }
  ]
};

export default survay;
