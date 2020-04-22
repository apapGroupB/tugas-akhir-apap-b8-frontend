import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { LowonganToolbar, LowonganTable } from './components';
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
      <LowonganToolbar />
      <div className={classes.content}>
        <LowonganTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
