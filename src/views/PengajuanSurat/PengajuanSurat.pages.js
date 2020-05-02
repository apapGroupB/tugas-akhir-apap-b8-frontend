import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { PengajuanSuratToolbar, PengajuanSuratTable } from './components';
import UpsertSurat from './UpsertSurat'
import useAxios from "axios-hooks";
import { BACKEND } from '../../utils'
import {SnackBar} from '../../components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
}));

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
      <SnackBar 
        notif={notif}
        status={"success"}
        handleClose={handleClose}
        description={actionType === 'Tambah' ? 
        'Pengajuan Surat telah berhasil ditambahkan!' : 
        'Pengajuan Surat telah berhasil diedit!'
        } 
      />
      <PengajuanSuratToolbar 
        toggle={toggle} 
        deleteToggle={deleteToggle} 
        setActionType={setActionType} 
      />
      <div className={classes.content}>
        <PengajuanSuratTable 
          toggle={toggle}
          loading={loading}
          deleteAct={deleteAct} 
          setDataItem={setDataItem}
          setActionType={setActionType}
          dataState={loading ? [] : getData } 
        />
      </div>
    </div>
  );
};

export default UserList;
