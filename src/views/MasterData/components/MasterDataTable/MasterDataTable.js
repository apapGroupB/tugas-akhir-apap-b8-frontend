import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { SpinnerCard } from '../../MasterData.style'
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import { withCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 500
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

const MasterDataTable = props => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { className, loading, dataState, ...rest } = props;
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width="90px">No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Keterangan</TableCell>
                  <TableCell width="100px">Action</TableCell>
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
                  :
                  dataState.slice(0, rowsPerPage).map((user, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                  >
                    <TableCell>{(page*10)+(index + 1)}</TableCell>
                    <TableCell>{user.nama}</TableCell>
                    <TableCell>{user.keterangan}</TableCell>
                    <TableCell>{
                      props.allCookies.user.id_role === 2
                        ?
                      <IconButton 
                        style={{ color: '#c62828' }}
                        // onClick={}
                        component="span">
                        <DeleteIcon style={{width: 20, height: 20}} />
                      </IconButton> :
                      <IconButton  disabled>
                        <DeleteIcon style={{width: 20, height: 20}} />
                      </IconButton>}
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
          count={dataState.length}
          onChangePage={handlePageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </CardActions>
    </Card>
  );
};

MasterDataTable.propTypes = {
  className: PropTypes.string,
  dataState: PropTypes.array.isRequired
};

export default withCookies(MasterDataTable);
