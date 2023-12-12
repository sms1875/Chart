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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'trackingNo', align: 'left', disablePadding: false, label: '번호' },
  { id: 'name', align: 'left', disablePadding: true, label: '항목' },
  { id: 'satisfactionLevel', align: 'left', disablePadding: false, label: '응답 수' },
  { id: 'responseRatio', align: 'left', disablePadding: false, label: '응답 비율' }, // New column
];

const SurveyTable = ({ data }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const { categories, data: satisfactionData } =
    data || { categories: [], data: [] };

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const respondentsCount = satisfactionData.reduce((sum, value) => sum + value, 0);

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
        <OrderTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
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
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.trackingNo}
                selected={isItemSelected}
              >
                <TableCell component="th" id={labelId} scope="row" align="left">
                  {row.trackingNo}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.satisfactionLevel}</TableCell>
                <TableCell align="left">{row.responseRatio}</TableCell> {/* New column */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const OrderTableHead = ({ order, orderBy, onRequestSort }) => {
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
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func.isRequired,
};

SurveyTable.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    requiredResponses: PropTypes.bool,
  }),
};

export default SurveyTable;