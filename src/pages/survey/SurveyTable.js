import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

/**
 * 두 엘리먼트를 비교하여 정렬을 수행하는 함수
 * @param {*} a - 비교할 첫 번째 엘리먼트
 * @param {*} b - 비교할 두 번째 엘리먼트
 * @param {string} orderBy - 정렬할 열의 속성
 * @returns {number} - 비교 결과에 따른 정렬 순서
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

/**
 * 정렬 함수를 반환하는 함수
 * @param {string} order - 정렬 순서 ('asc' 또는 'desc')
 * @param {string} orderBy - 정렬할 열의 속성
 * @returns {Function} - 정렬 함수
 */
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * 안정적인 정렬을 수행하는 함수
 * @param {Array} array - 정렬할 배열
 * @param {Function} comparator - 정렬 함수
 * @returns {Array} - 안정적으로 정렬된 배열
 */
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// 정렬할 열의 속성과 레이블 정보
const headCells = [
  { id: 'trackingNo', align: 'left', disablePadding: false, label: '번호' },
  { id: 'name', align: 'left', disablePadding: true, label: '항목' },
  { id: 'satisfactionLevel', align: 'left', disablePadding: false, label: '응답 수' },
  { id: 'responseRatio', align: 'left', disablePadding: false, label: '응답 비율' }, // 새로운 열
];

/**
 * 설문 결과를 표시하는 테이블 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.data - 테이블 데이터
 * @returns {JSX.Element} - 렌더링된 테이블 컴포넌트
 */
const SurveyTable = ({ data }) => {
  // 정렬 상태를 관리하는 상태
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const { categories, data: satisfactionData } =
    data || { categories: [], data: [] };

  /**
   * 선택 여부를 확인하는 함수
   * @param {number} trackingNo - 추적 번호
   * @returns {boolean} - 선택 여부
   */
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  // 응답자 수 계산
  const respondentsCount = satisfactionData.reduce((sum, value) => sum + value, 0);

  /**
   * 정렬 요청을 처리하는 함수
   * @param {string} property - 정렬할 열의 속성
   */
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer
      sx={{
        width: '100%',
        overflowX: 'auto',
        position: 'relative',
        display: 'block',
        maxWidth: '100%',
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        sx={{
          '& .MuiTableCell-root:first-of-type': { paddingLeft: 2 },
          '& .MuiTableCell-root:last-of-type': { paddingRight: 3 },
        }}
      >
        {/* 정렬을 처리하는 헤더 컴포넌트 */}
        <OrderTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {/* 데이터를 정렬 및 렌더링 */}
          {stableSort(
            categories.map((category, index) => ({
              trackingNo: index + 1,
              name: category,
              satisfactionLevel: satisfactionData[index],
              responseRatio: (satisfactionData[index] / respondentsCount * 100).toFixed(1) + '%',
            })),
            getComparator(order, orderBy)
          ).map((row, index) => {
            const isItemSelected = isSelected(row.trackingNo);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                selected={isItemSelected}
                key={row.trackingNo}
              >
                <TableCell component="th" id={labelId} scope="row" align="left">
                  {row.trackingNo}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.satisfactionLevel}</TableCell>
                <TableCell align="left">{row.responseRatio}</TableCell>
              </TableRow>
            );
          })}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

/**
 * 정렬을 처리하는 헤더 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.order - 정렬 순서
 * @param {string} props.orderBy - 정렬할 열의 속성
 * @param {Function} props.onRequestSort - 정렬 요청 콜백 함수
 */
const OrderTableHead = ({ order, orderBy, onRequestSort }) => {
  /**
   * 정렬을 요청하는 핸들러 함수
   * @param {string} property - 정렬할 열의 속성
   */
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* 테이블 열을 정렬할 레이블 */}
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

OrderTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.oneOf(['trackingNo', 'name', 'satisfactionLevel', 'responseRatio']),
  onRequestSort: PropTypes.func.isRequired,
};

SurveyTable.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default SurveyTable;
