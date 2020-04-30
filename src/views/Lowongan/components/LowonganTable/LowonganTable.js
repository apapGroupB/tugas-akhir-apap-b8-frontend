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
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { SpinnerCard } from './LowonganTable.style'
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';


import { getInitials } from 'helpers';

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

const UsersTable = props => {
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

  const [selectedLowongan, setSelectedLowongan] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { dataState } = props;

    let selectedLowongan;

    if (event.target.checked) {
      selectedLowongan = dataState.map(user => user.id);
    } else {
      selectedLowongan = [];
    }

    setSelectedLowongan(selectedLowongan);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedLowongan.indexOf(id);
    let newLowongan = [];

    if (selectedIndex === -1) {
      newLowongan = newLowongan.concat(selectedLowongan, id);
    } else if (selectedIndex === 0) {
      newLowongan = newLowongan.concat(selectedLowongan.slice(1));
    } else if (selectedIndex === selectedLowongan.length - 1) {
      newLowongan = newLowongan.concat(selectedLowongan.slice(0, -1));
    } else if (selectedIndex > 0) {
      newLowongan = newLowongan.concat(
        selectedLowongan.slice(0, selectedIndex),
        selectedLowongan.slice(selectedIndex + 1)
      );
    }

    setSelectedLowongan(newLowongan);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  
  // judul: varchar (200)
// tanggal_dibuka: date
// tanggal_ditutup: date
// keterangan: varchar (200)
// jumlah: int
// id_jenis_lowongan: int
// uuid_user: varchar (200)

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
                      checked={selectedLowongan.length === dataState.length}
                      color="primary"
                      indeterminate={
                        selectedLowongan.length > 0 &&
                        selectedLowongan.length < dataState.length
                      }
                      onChange={handleSelectAll}
                    />}
                  </TableCell>
                  <TableCell>Judul</TableCell>
                  <TableCell>Jenis Lowongan</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Tgl Dibuka</TableCell>
                  <TableCell>Tgl Ditutup</TableCell>
                  <TableCell>Keterangan</TableCell>
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
                dataState.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedLowongan.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      {deleteAct ?  
                      <Checkbox
                        checked={selectedLowongan.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      /> : 
                      <IconButton 
                        color="primary" 
                        component="span"
                        onClick={() => {
                          setActionType('Edit')
                          setDataItem(user)
                          toggle()
                        }}
                      >
                        <EditIcon style={{width: 20, height: 20}} />
                      </IconButton>
                      }
                    </TableCell>
                    <TableCell>{user.judul}</TableCell>
                    <TableCell>{
                    jenis.find(e => e.id === user.id_jenis_lowongan) ?
                    jenis.find(e => e.id === user.id_jenis_lowongan).description : 
                    "None"}</TableCell>
                    <TableCell>{user.jumlah}</TableCell>
                    <TableCell>{moment(user.tanggal_dibuka).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      {moment(user.tanggal_ditutup).format('DD/MM/YYYY')}
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

UsersTable.propTypes = {
  className: PropTypes.string,
  dataState: PropTypes.array.isRequired
};

export default UsersTable;
