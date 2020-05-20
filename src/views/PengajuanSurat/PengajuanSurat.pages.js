import useAxios from "axios-hooks";
import { BACKEND } from '../../utils'
import UpsertSurat from './UpsertSurat'
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
  const [showModal, setShowModal] = useState(false)
  const [actionType, setActionType] = useState('Tambah')
  const [dataItem, setDataItem] = useState({})
  const [notif, setNotif] = useState(false)

  const toggle = () => {
    setShowModal(!showModal)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotif(false);
  };

  const [{ data: getData, loading, error: getError }, refetch] = useAxios(
    getAxios(BACKEND.GET_ALL_PENGAJUAN, props.allCookies.user.jwttoken)
  );

  return (
    <div className={classes.root}>
      {showModal && <UpsertSurat 
        toggle={toggle} 
        refetch={refetch}
        setNotif={setNotif}
        dataItem={dataItem}
        actionType={actionType} />
      }
      <SnackBar 
        notif={notif}
        status={"success"}
        handleClose={handleClose}
        description={actionType === 'Tambah' ? 
        'Pengajuan Surat telah berhasil ditambahkan!' : 
        'Pengajuan Surat telah berhasil diedit!'
        } 
      />
      <PengajuanSuratToolbar 
        toggle={toggle} 
        setActionType={setActionType} 
      />
      <div className={classes.content}>
        <PengajuanSuratTable
          toggle={toggle}
          loading={loading}
          setDataItem={setDataItem}
          setActionType={setActionType}
          dataState={loading || getError ? [] : getData }
        />
      </div>
    </div>
  );
};

export default withCookies(UserList);
