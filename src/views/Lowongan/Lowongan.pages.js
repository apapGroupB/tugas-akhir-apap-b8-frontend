import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { LowonganToolbar, LowonganTable } from './components';
import mockData from './data';
import AddLowongan from './AddLowongan'

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

  const toggle = () => {
    setShowModal(!showModal)
  }

  const deleteToggle = () => {
    setDeleteAct(!deleteAct)
  }

  const loading = false

  // const [{ data: getData, loading, error: getError }] = useAxios(
  //   "https://backend-situ.herokuapp.com/pengajuan-surat"
  // );

  return (
    <div className={classes.root}>
      {showModal && <AddLowongan toggle={toggle} />}
      <LowonganToolbar 
        toggle={toggle}
        deleteToggle={deleteToggle}
        />
      <div className={classes.content}>
        <LowonganTable 
          dataState={users} 
          loading={loading}
          deleteAct={deleteAct}
        />
      </div>
    </div>
  );
};

export default UserList;
