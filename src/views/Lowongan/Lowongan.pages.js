import mockData from './data';
import useAxios from "axios-hooks";
import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import UpsertLowongan from './UpsertLowongan'
import { BACKEND, getAxios } from '../../utils'
import { makeStyles } from '@material-ui/styles';
import { LowonganToolbar, LowonganTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = (props) => {
  const classes = useStyles();

  const [users] = useState(mockData);
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
    getAxios(BACKEND.GET_ALL_LOWONGAN, props.allCookies.token)
  );

  return (
    <div className={classes.root}>
      {showModal && 
      <UpsertLowongan 
        toggle={toggle} 
        dataItem={dataItem}
        actionType={actionType} 
      />}
      <LowonganToolbar 
        toggle={toggle}
        deleteToggle={deleteToggle}
        setActionType={setActionType} 
        />
      <div className={classes.content}>
        <LowonganTable 
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

export default withCookies(UserList);
