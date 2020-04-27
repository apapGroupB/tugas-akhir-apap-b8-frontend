import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PinjamanToolbar, PinjamanTable } from './components';
import UpsertUser from './InsertPinjaman'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Pinjaman = () => {
  const classes = useStyles();

  const [users] = useState([]);

  const toggle = () => {
    setShowModal(!showModal)
  }

  const [showModal, setShowModal] = useState(false)
  const [deleteAct, setDeleteAct] = useState(false)
  const [actionType, setActionType] = useState('Tambah')
  const [dataItem, setDataItem] = useState({})

  const deleteToggle = () => {
    setDeleteAct(!deleteAct)
  }

  return (
    <div className={classes.root}>
      <PinjamanToolbar 
        setActionType={setActionType} 
        deleteToggle={deleteToggle} 
        toggle={toggle} 
      />
      <div className={classes.content}>
        <PinjamanTable 
          users={users} 
          // toggle={toggle}
          // setActionType={setActionType}
          // setDataItem={setDataItem}
          // deleteAct={deleteAct} 
          // loading={loading}
          // dataState={loading ? [] : getData } 
        />
      </div>
    </div>
  );
};

export default Pinjaman;
