import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import UpsertUser from './UpsertUser'
import { getAxios } from '../../utils'
import { WEBSERVICE, BACKEND } from '../../utils'
import useAxios from "axios-hooks";
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { SnackBar } from '../../components'
import _ from 'lodash'
import DeleteUser from './DeleteUser'


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
  const [actionType, setActionType] = useState('none')
  const [dataItem, setDataItem] = useState({})
  const [notif, setNotif] = useState({
    showNotif: false,
    status: "success",
    title: "tambah"
  })

  const toggle = (mode, user) => {
    setActionType(mode)
    setDataItem(user)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotif(false);
  };

  const [{ data: getData, loading, error: getError }] = useAxios(
    WEBSERVICE.GET_USER_SIVITAS
  );

  const [{ data: getDataUser, loading: userLoading, error: userError }, refetch] = useAxios(
    getAxios(BACKEND.GET_ALL_USER, props.allCookies.user.jwttoken)
  );
  const uniqueUUid = (sivitasUser, tuUser) => {
    if (sivitasUser && tuUser) {
      const newSivitas = sivitasUser.result.map((data, index) => 
        Object.assign({}, {
          ...data,
          uuid: data.idUser,
          tempat_lahir: data.tempatLahir,
          tanggal_lahir: data.tanggalLahir
        })
      ).filter(dt => !tuUser.map(dt => dt.uuid).includes(dt.idUser))
        .concat(_.orderBy(tuUser, ['id'], ['desc']))
      
      const newRow = Array(newSivitas.length % 10 !== 0 ? 10 - newSivitas.length % 10 : 0).fill({});
      return newSivitas.concat(newRow)
    } else {
      return []
    }
  }

  return (
    <div className={classes.root}>
      {(actionType === 'Edit' || actionType === 'Tambah') && <UpsertUser 
        toggle={toggle}
        refetch={refetch}
        dataItem={dataItem}
        setNotif={setNotif}
        actionType={actionType} />
      }
      {actionType === 'Hapus' && <DeleteUser
        toggle={toggle}
        refetch={refetch}
        dataItem={dataItem}
        setNotif={setNotif}
      />}
      <SnackBar 
        notif={notif.showNotif}
        status={notif.status}
        handleClose={handleClose} 
        description={notif.status === "success" ?
          `Pengajuan Surat telah berhasil di${notif.title} !` :
          `[Error] Something Wrong!`
        }
      />
      <UsersToolbar 
        toggle={toggle}
      />
      <div className={classes.content}>
        <UsersTable 
          toggle={toggle}
          loading={loading || userLoading}
          users={(loading && userLoading) ? [] : uniqueUUid(getData, getDataUser)} 
        />
      </div>
    </div>
  );
};

export default withCookies(UserList);
