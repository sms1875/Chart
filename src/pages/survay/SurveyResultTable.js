import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import MainCard from 'components/MainCard';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
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
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: '번호',
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: '항목',
  },
  {
    id: 'satisfactionLevel',
    align: 'left',
    disablePadding: false,
    label: '응답 수',
  },
];

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

export default function SurveyResultTable({ data }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  const { title, categories, data: satisfactionData } = data || { title: '', categories: [], data: [] };

  return (
    <div id="table">
      <Box>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
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
                '& .MuiTableCell-root:first-of-type': {
                  paddingLeft: 2,
                },
                '& .MuiTableCell-root:last-of-type': {
                  paddingRight: 3,
                },
              }}
            >
              <OrderTableHead order={order} orderBy={orderBy} />
              <TableBody>
                {stableSort(
                  categories.map((category, index) => ({
                    trackingNo: index + 1,
                    name: category,
                    satisfactionLevel: satisfactionData[index],
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Box>
    </div>
  );
}
