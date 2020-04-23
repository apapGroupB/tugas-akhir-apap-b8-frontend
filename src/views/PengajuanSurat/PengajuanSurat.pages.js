import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PengajuanSuratToolbar, PengajuanSuratTable } from './components';
import mockData from './data';
import UpsertSurat from './UpsertSurat'
import useAxios from "axios-hooks";
import { corsRequest } from '../../utils'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);
  const [showModal, setShowModal] = useState(false)
  const [deleteAct, setDeleteAct] = useState(false)
  const [actionType, setActionType] = useState('ADD')

  const toggle = () => {
    setShowModal(!showModal)
  }

  const deleteToggle = () => {
    setDeleteAct(!deleteAct)
  }

  const [{ data: getData, loading, error: getError }] = useAxios(
    "https://backend-situ.herokuapp.com/pengajuan-surat"
  );

  const setType = (type) => {
    setActionType(type)
  }
  

  console.log('showModal: ', getData)

  return (
    <div className={classes.root}>
      {showModal && <UpsertSurat actionType={actionType} toggle={toggle} />}
        <PengajuanSuratToolbar deleteToggle={deleteToggle} toggle={toggle} />
        <div className={classes.content}>
          <PengajuanSuratTable 
            deleteAct={deleteAct} 
            loading={loading}
            dataState={loading ? [] : getData } 
          />
        </div>
    </div>
  );
};

export default UserList;
