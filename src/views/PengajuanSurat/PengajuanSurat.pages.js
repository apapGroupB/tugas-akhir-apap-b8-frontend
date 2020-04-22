import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PengajuanSuratToolbar, PengajuanSuratTable } from './components';
import mockData from './data';

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

  return (
    <div className={classes.root}>
      <PengajuanSuratToolbar />
      <div className={classes.content}>
        <PengajuanSuratTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
