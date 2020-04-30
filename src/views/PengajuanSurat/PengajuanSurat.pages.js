import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { PengajuanSuratToolbar, PengajuanSuratTable } from './components';
import UpsertSurat from './UpsertSurat'
import useAxios from "axios-hooks";
import { BACKEND } from '../../utils'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserList = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false)
  const [deleteAct, setDeleteAct] = useState(false)
  const [actionType, setActionType] = useState('Tambah')
  const [dataItem, setDataItem] = useState({})
  const [notif, setNotif] = useState(false)

  const toggle = () => {
    setShowModal(!showModal)
  }

  const deleteToggle = () => {
    setDeleteAct(!deleteAct)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotif(false);
  };

  const [{ data: getData, loading, error: getError }, refetch] = useAxios(
    BACKEND.GET_ALL_PENGAJUAN
  );

  return (
    <div className={classes.root}>
      {showModal && <UpsertSurat 
        toggle={toggle} 
        refetch={refetch}
        setNotif={setNotif}
        dataItem={dataItem}
        actionType={actionType} />
      }
      <Snackbar 
        open={notif} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        <Alert onClose={handleClose} severity="success">
          {actionType === 'Tambah' ? 
          'Pengajuan Surat telah berhasil ditambahkan!' : 
          'Pengajuan Surat telah berhasil diedit!'
          }
        </Alert>
      </Snackbar>
      <PengajuanSuratToolbar 
        setActionType={setActionType} 
        deleteToggle={deleteToggle} 
        toggle={toggle} 
      />
      <div className={classes.content}>
        <PengajuanSuratTable 
          toggle={toggle}
          setActionType={setActionType}
          setDataItem={setDataItem}
          deleteAct={deleteAct} 
          loading={loading}
          dataState={loading ? [] : getData } 
        />
      </div>
    </div>
  );
};

export default UserList;
