import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import JenisSurat from './components/JenisSurat';
import JenisLowongan from './components/JenisLowongan';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  command: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
    justifyContent: 'space-between'
  },
  content: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
    justifyContent: 'space-between'
  }
}));

const UserList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={6}>
          <JenisSurat />
        </Grid>
        <Grid item lg={6}>
          <JenisLowongan />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserList;
