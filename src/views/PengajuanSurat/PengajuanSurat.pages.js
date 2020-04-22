import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PengajuanSuratToolbar, PengajuanSuratTable } from './components';
import mockData from './data';
import AddSurat from './AddSurat'

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

  console.log('showModal: ', showModal)

  return (
    <div className={classes.root}>
      {showModal && <AddSurat toggle={toggle} />}
        <PengajuanSuratToolbar toggle={toggle} />
        <div className={classes.content}>
          <PengajuanSuratTable users={users} />
        </div>
    </div>
  );
};

export default UserList;
