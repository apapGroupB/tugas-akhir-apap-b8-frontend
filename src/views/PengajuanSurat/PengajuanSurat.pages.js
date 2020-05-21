import useAxios from "axios-hooks";
import { BACKEND } from '../../utils'
import UpsertSurat from './UpsertSurat'
import DeleteSurat from './DeleteSurat'
import React, { useState } from 'react';
import {SnackBar} from '../../components'
import { withCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/styles';
import { getAxios, getToken } from '../../utils'

import { PengajuanSuratToolbar, PengajuanSuratTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
}));

const UserList = (props) => {
  const classes = useStyles();
  const [actionType, setActionType] = useState('none')
  const [dataItem, setDataItem] = useState({})
  const [notif, setNotif] = useState({
    showNotif: false,
    status: "success",
    title: "tambah"
  })
  const [access, setUserRole] = useState({
    update: [1, 2],
    delete: [2],
    create: [2, 3, 4]
  })

  const toggle = (mode, user) => {
    setActionType(mode)
    setDataItem(user)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotif({
      showNotif: false,
      status: "success",
      title: "tambah"
    });
  };

  const [{ data: getData, loading, error: getError }, refetch] = useAxios(
    getAxios(BACKEND.GET_ALL_PENGAJUAN, props.allCookies.user.jwttoken)
  );

  return (
    <div className={classes.root}>
      {(actionType === 'Edit' || actionType === 'Tambah') && <UpsertSurat 
        access={access}
        toggle={toggle} 
        refetch={refetch}
        setNotif={setNotif}
        dataItem={dataItem}
        actionType={actionType}/>
      }
      {actionType === 'Hapus' && <DeleteSurat
        dataItem={dataItem}
        toggle={toggle}
        refetch={refetch}
        setNotif={setNotif}
      />}
      <SnackBar 
        notif={notif.showNotif}
        status={notif.status}
        handleClose={handleClose}
        description={
          `Pengajuan Surat telah berhasil di${notif.title} !`
        } 
      />
      <PengajuanSuratToolbar 
        toggle={toggle} 
        access={access}
      />
      <div className={classes.content}>
        <PengajuanSuratTable
          toggle={toggle}
          loading={loading}
          access={access}
          dataState={loading || getError ? [] : getData }
        />
      </div>
    </div>
  );
};

export default withCookies(UserList);
