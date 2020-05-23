import useAxios from "axios-hooks";
import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import { SnackBar } from '../../components';
import { BACKEND, getAxios } from '../../utils';
import { makeStyles } from '@material-ui/styles';

import { MasterDataTable, MasterDataToolbar } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  }
}));

const MasterData = (props) => {
  const classes = useStyles();
  const [dataItem, setDataItem] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [actionType, setActionType] = useState('none')
  const [notif, setNotif] = useState({
    showNotif: false,
    status: "success",
    title: "tambah"
  })

  const [{ data: getData, loading, error: getError }, refetch] = useAxios(
    getAxios(BACKEND.GET_ALL_JENIS_SURAT, props.allCookies.user.jwttoken)
  );

  const toggle = (mode, user) => {
    setShowModal(!showModal)
    setActionType(mode)
    setDataItem(user)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotif(false);
  };

  return (
    <div className={classes.root}>
      {/* {(actionType === 'Edit' || actionType === 'Tambah') && <UpsertUser 
        toggle={toggle}
        refetch={refetch}
        dataItem={dataItem}
        setNotif={setNotif}
        actionType={actionType} />
      } */}
      {/* {actionType === 'Hapus' && <DeleteUser
        toggle={toggle}
        refetch={refetch}
        dataItem={dataItem}
        setNotif={setNotif}
      />} */}
      <SnackBar 
        notif={notif.showNotif}
        status={notif.status}
        handleClose={handleClose} 
        description={notif.status === "success" ?
          `Pengajuan Surat telah berhasil di${notif.title} !` :
          `[Error] Something Wrong!`
        }
      />
      <MasterDataToolbar 
        toggle={toggle}
      />
      <div className={classes.content}>
        <MasterDataTable 
          toggle={toggle}
          loading={loading}
          dataState={loading ? [] : getData} 
        />
      </div>
    </div>
  );
};

export default withCookies(MasterData);
