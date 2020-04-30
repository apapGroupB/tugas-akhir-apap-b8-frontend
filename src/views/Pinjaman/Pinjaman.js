import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PinjamanToolbar, PinjamanTable } from './components';
import InsertPinjaman from './InsertPinjaman'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Pinjaman = () => {
  const [showModal, setShowModal] = useState(false)
  const [deleteAct, setDeleteAct] = useState(false)
  const [actionType, setActionType] = useState('Tambah')
  const classes = useStyles();

  const [users] = useState([]);

  const toggle = () => {
    setShowModal(!showModal)
  }

  const deleteToggle = () => {
    setDeleteAct(!deleteAct)
  }

  console.log('showModal: ', showModal)

  return (
    <div className={classes.root}>
      {showModal && <InsertPinjaman 
        toggle={toggle} 
        // refetch={refetch}
        // setNotif={setNotif}
        actionType={actionType}
      /> }
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
