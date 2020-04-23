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
import { SpinnerCard } from './PengajuanSuratTable.style'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  }
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
  const { className, dataState, deleteToggle, deleteAct, loading, ...rest } = props;
  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { dataState } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = dataState.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {deleteAct && <Checkbox
                      checked={selectedUsers.length === dataState.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < dataState.length
                      }
                      onChange={handleSelectAll}
                    />}
                  </TableCell>
                  <TableCell>Nomor</TableCell>
                  <TableCell>Jenis Surat</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tgl Pengajuan</TableCell>
                  <TableCell>Tgl Disetujui</TableCell>
                  <TableCell>Keterangan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? 
                <TableCell colSpan={9} rowSpan={10} padding="checkbox">
                  <SpinnerCard>
                    <CircularProgress />
                  </SpinnerCard>
                </TableCell>
                  : dataState.slice(0, rowsPerPage).map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                      selected={selectedUsers.indexOf(user.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        {deleteAct ? 
                        <Checkbox
                          checked={selectedUsers.indexOf(user.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, user.id)}
                          value="true"
                        /> : 
                        <IconButton color="primary" component="span">
                          <EditIcon style={{width: 20, height: 20}} />
                        </IconButton>}
                      </TableCell>
                      <TableCell>{user.nomor_surat}</TableCell>
                      <TableCell>{jenisSurat.find(data => data.id === user.id_jenis_surat) ? jenisSurat.find(data => data.id === user.id_jenis_surat).description : '-'  }</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>{moment(user.tanggal_pengajuan).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>
                        {moment(user.tanggal_disetujui).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{user.keterangan}</TableCell>
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

export default PengajuanSuratTable;
