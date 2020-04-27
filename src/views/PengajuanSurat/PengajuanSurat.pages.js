import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PengajuanSuratToolbar, PengajuanSuratTable } from './components';
import UpsertSurat from './UpsertSurat'
import useAxios from "axios-hooks";
import { REST } from '../../utils'

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

  const toggle = () => {
    setShowModal(!showModal)
  }

  const deleteToggle = () => {
    setDeleteAct(!deleteAct)
  }

  const [{ data: getData, loading, error: getError }] = useAxios(
    REST.GET_ALL_PENGAJUAN
  );

  return (
    <div className={classes.root}>
      {showModal && <UpsertSurat 
        dataItem={dataItem}
        actionType={actionType} 
        toggle={toggle} />
      }
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
