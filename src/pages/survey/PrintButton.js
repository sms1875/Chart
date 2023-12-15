import React from "react";
import { Button } from "@mui/material";
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
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        <PrinterOutlined />
      </Button>
    )}
    content={() => printRef.current}
    documentTitle="리포트"
  />
);

export default PrintButton;