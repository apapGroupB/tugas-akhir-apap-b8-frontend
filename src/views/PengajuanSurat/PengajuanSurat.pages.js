import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PengajuanSuratToolbar, PengajuanSuratTable } from './components';
import mockData from './data';
import AddSurat from './AddSurat'
import useAxios from "axios-hooks";
import { corsRequest } from '../../utils'
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

  const toggle = () => {
    setShowModal(!showModal)
  }

  const [{ data: getData, loading, error: getError }] = useAxios(
    "https://backend-situ.herokuapp.com/pengajuan-surat"
  );
  

  // useEffect(() => {
  //   axios.get(`http://localhost:2016/pengajuan-surat`, {headers: {
  //     'Access-Control-Allow-Origin': true,
  //   }})
  //     .then(res => {
  //       const pengajuanSurat = res.data;
  //       console.log('pengajuanSurat: ', pengajuanSurat)
  //     })
  // })

  console.log('showModal: ', getData)

  return (
    <div className={classes.root}>
      {showModal && <AddSurat toggle={toggle} />}
        <PengajuanSuratToolbar toggle={toggle} />
        <div className={classes.content}>
          <PengajuanSuratTable users={loading ? [] : getData } />
        </div>
    </div>
  );
};

export default UserList;
