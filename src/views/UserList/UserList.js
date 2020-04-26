import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import UpsertUser from './UpsertUser'

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
      {showModal && <UpsertUser 
        dataItem={dataItem}
        actionType={actionType} 
        toggle={toggle} />
      }
      <UsersToolbar 
        setActionType={setActionType} 
        deleteToggle={deleteToggle} 
        toggle={toggle} 
      />
      <div className={classes.content}>
        <UsersTable 
          users={users} 
          toggle={toggle}
          setActionType={setActionType}
          setDataItem={setDataItem}
          deleteAct={deleteAct} 
          // loading={loading}
          // dataState={loading ? [] : getData } 
        />
      </div>
    </div>
  );
};

export default UserList;
