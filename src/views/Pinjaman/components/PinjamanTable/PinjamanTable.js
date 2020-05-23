import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardActions,
  CardContent,
  TablePagination
} from '@material-ui/core';
import { SpinnerCard } from '../../InsertPinjaman.style'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PinjamanTable = props => {
  const { className, dataState, loading, ...rest } = props;

  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Jumlah Pinjaman</TableCell>
                  <TableCell>Tanggal Pengajuan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? 
                <TableRow>
                  <TableCell colSpan={9} rowSpan={10} padding="checkbox">
                    <SpinnerCard>
                      <CircularProgress />
                    </SpinnerCard>
                  </TableCell>
                </TableRow>
                 : dataState.slice(0, rowsPerPage).map((pinjaman, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={pinjaman.id}
                  >
                    <TableCell>{(page*10)+(index + 1)}</TableCell>
                    <TableCell>{pinjaman.jumlah_pinjaman}</TableCell>
                    <TableCell>
                      {moment(pinjaman.tanggal_pengajuan).format('DD-MM-YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={loading ? 0 : dataState.length}
          onChangePage={handlePageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </CardActions>
    </Card>
  );
};

PinjamanTable.propTypes = {
  className: PropTypes.string,
  dataState: PropTypes.array.isRequired
};

export default PinjamanTable;
