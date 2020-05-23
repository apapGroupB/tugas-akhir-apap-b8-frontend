import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
import _ from 'lodash'
import { withCookies } from 'react-cookie';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { SpinnerCard } from './LowonganTable.style'
import IconButton from '@material-ui/core/IconButton';
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

const LowonganTable = props => {
  const { 
    className, 
    dataState, 
    deleteToggle, 
    loading, 
    deleteAct, 
    toggle,
    setActionType,
    setDataItem,
    ...rest } = props;

  const classes = useStyles();

  const jenis = [{
    id: 1,
    description: "Full Time"
  },
  {
    id: 2,
    description: "Part Time"
  },
  {
    id: 3,
    description: "Kontrak"
  }];

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
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
                  <TableCell>No</TableCell>
                  <TableCell>Judul</TableCell>
                  <TableCell>Jenis Lowongan</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Tgl Dibuka</TableCell>
                  <TableCell>Tgl Ditutup</TableCell>
                  <TableCell>Keterangan</TableCell>
                  <TableCell>Action</TableCell>
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
                _.orderBy(dataState, ['id'], ['desc']).slice(0, rowsPerPage).map((user, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                  >
                    <TableCell>{(page*10)+(index + 1)}</TableCell>
                    <TableCell>{user.judul}</TableCell>
                    <TableCell>{
                    jenis.find(e => e.id === user.id_jenis_lowongan) ?
                    jenis.find(e => e.id === user.id_jenis_lowongan).description : "None"}
                    </TableCell>
                    <TableCell>{user.jumlah}</TableCell>
                    <TableCell>{moment(user.tanggal_dibuka).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      {moment(user.tanggal_ditutup).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{user.keterangan}</TableCell>
                    <TableCell>
                      {props.allCookies.user.id_role === 2 &&
                        moment().format() < moment(user.tanggal_dibuka).format() ?
                        <IconButton 
                          color="primary" 
                          onClick={() => {
                            toggle('Edit', user)
                          }}
                          >
                          <EditIcon style={{width: 20, height: 20}} />
                          </IconButton> :
                          <IconButton 
                            color="primary" 
                            disabled
                          >
                          <EditIcon style={{width: 20, height: 20}} />
                          </IconButton>}
                        {props.allCookies.user.id_role === 2  &&
                        moment().format() < moment(user.tanggal_dibuka).format() ?
                        <IconButton 
                          style={{ color: '#c62828' }}
                          onClick={() => {
                            toggle('Hapus', user)
                          }}
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
          count={loading || !dataState ? 0 : dataState.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

LowonganTable.propTypes = {
  className: PropTypes.string,
  dataState: PropTypes.array.isRequired
};

export default withCookies(LowonganTable);
