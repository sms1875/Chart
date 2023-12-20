import React from "react";
import { PrinterOutlined } from '@ant-design/icons';
import ReactToPrint from 'react-to-print';

/**
 * 프린트 버튼 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {React.Ref} props.printRef - 프린트할 컴포넌트의 Ref
 * @returns {JSX.Element} - 렌더링된 프린트 버튼 컴포넌트
 */
const PrintButton = ({ printRef }) => (
  <ReactToPrint
    trigger={() => (
      <button
        style={{
          backgroundColor: '#1976D2',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <PrinterOutlined style={{ marginRight: '8px' }} />
        Print
      </button>
    )}
    content={() => printRef.current}
    documentTitle="Report"
  />
);

export default PrintButton;