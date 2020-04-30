import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import UpsertUser from './UpsertUser'
import { WEBSERVICE } from '../../utils'
import useAxios from "axios-hooks";
import axios from 'axios';

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

  const [{ data: getData, loading, error: getError }, refetch] = useAxios(
    WEBSERVICE.GET_ALL_PEGAWAI
  );

  // console.log('WEBSERVICE.GET_ALL_PEGAWAI: ', WEBSERVICE.GET_ALL_PEGAWAI)
  // console.log('getData: ', getData)

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
          // users={users} 
          // toggle={toggle}
          // setActionType={setActionType}
          // setDataItem={setDataItem}
          // deleteAct={deleteAct} 
          loading={loading}
          users={loading || getError ? [] : getData } 
        />
      </div>
    </div>
  );
};

export default UserList;
