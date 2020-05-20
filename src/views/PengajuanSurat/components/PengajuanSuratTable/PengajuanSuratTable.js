import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
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
import { SpinnerCard } from './PengajuanSuratTable.style'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import statusConfig from '../../statusConfig.json'
import DeleteSurat from '../../DeleteSurat'
import { StatusBullet } from 'components';

import { getInitials } from 'helpers';
import { Colors } from 'styles';

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
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
}));

const PengajuanSuratTable = props => {
  const jenisSurat = [{
    id: 1,
    description: 'Surat Izin Ikut Kegiatan'
  },
  {
    id: 2,
    description: 'Surat Izin Sakit'
  },
  {
    id: 3,
    description: 'Surat Keterangan Lulus'
  },
  {
    id: 4,
    description: 'Surat Rekomendasi Beasiswa'
  }]
  const { 
    className, 
    dataState, 
    toggle,
    setActionType,
    setDataItem, 
    loading, ...rest } = props;
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [deleteData, setDeleteData] = useState(0)


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
      { deleteData !== 0 && <DeleteSurat setDeleteData={setDeleteData} />}
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nomor</TableCell>
                  <TableCell>Jenis Surat</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tgl Pengajuan</TableCell>
                  <TableCell>Tgl Disetujui</TableCell>
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
                  : dataState.slice(0, rowsPerPage).map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                    >
                      <TableCell>{user.nomor_surat === '0' ? '-' : user.nomor_surat}</TableCell>
                      <TableCell>{jenisSurat.find(data => data.id === user.id_jenis_surat) ? jenisSurat.find(data => data.id === user.id_jenis_surat).description : '-'  }</TableCell>
                      <TableCell>
                        {statusConfig.find(data => data.id === user.status) ?
                        <div  className={classes.statusContainer}>
                          <StatusBullet
                            className={classes.status}
                            color={statusConfig[user.status].color}
                            size="sm"
                          />
                          {statusConfig[user.status].name}
                        </div> : 
                        '-'  }</TableCell>
                      <TableCell>{moment(user.tanggal_pengajuan).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>
                        {user.tanggal_disetujui === null ? '-' : moment(user.tanggal_disetujui).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{user.keterangan}</TableCell>
                      <TableCell>
                        {[1, 2].includes(props.allCookies.user.id_role) &&
                          user.status === 0 ?
                        <IconButton 
                          color="primary" 
                          onClick={() => {
                            setActionType('Edit')
                            setDataItem(user)
                            toggle()
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
                        {
                          user.uuid_user === props.allCookies.user.uuid ||
                            (props.allCookies.user.id_role === 2
                              && user.status === 0
                            ) ?
                        <IconButton 
                          style={{ color: '#c62828' }}
                          onClick={() => {
                            setDeleteData(user.id)
                            setDataItem(user)
                            toggle()
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
          count={dataState.length}
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

PengajuanSuratTable.propTypes = {
  className: PropTypes.string,
  dataState: PropTypes.array.isRequired
};

export default withCookies(PengajuanSuratTable);
