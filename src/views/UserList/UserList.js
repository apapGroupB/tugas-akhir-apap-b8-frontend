import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import UpsertUser from './UpsertUser'
import { WEBSERVICE, BACKEND } from '../../utils'
import useAxios from "axios-hooks";
import axios from 'axios';
import { SnackBar } from '../../components'


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
    WEBSERVICE.GET_ALL_USER
  );

  console.log(WEBSERVICE.GET_ALL_USER)
  console.log('getData: ', getData)


  return (
    <div className={classes.root}>
      {showModal && <UpsertUser 
        toggle={toggle}
        refetch={refetch}
        dataItem={dataItem}
        setNotif={setNotif}
        actionType={actionType} />
      }
      <SnackBar 
        notif={notif}
        status={"success"}
        handleClose={handleClose} 
        description={actionType === 'Tambah' ? 
        'User telah berhasil ditambahkan!' : 
        'User telah berhasil diedit!'
        }
      />
      <UsersToolbar 
        toggle={toggle}
        deleteToggle={deleteToggle} 
        setActionType={setActionType} 
      />
      <div className={classes.content}>
        <UsersTable 
          // users={users} 
          // toggle={toggle}
          // setActionType={setActionType}
          // setDataItem={setDataItem}
          // deleteAct={deleteAct} 
          loading={loading}
          users={loading || getError ? [] : getData.result } 
        />
      </div>
    </div>
  );
};

export default UserList;
