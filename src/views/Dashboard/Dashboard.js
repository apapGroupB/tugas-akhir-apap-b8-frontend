import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { withCookies } from 'react-cookie';
import PengajuanSurat from './PengajuanSurat'
import { BACKEND, getAxios } from 'utils';
import useAxios from "axios-hooks";


import {
  Budget,
  TotalUsers,
  TasksProgress,
  UsersByDevice,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
  }
}));


const Dashboard = (props) => {
  const classes = useStyles();
  const { allCookies } = props;
  const [{ data: dashboardData, loading, error }, refetch] = useAxios(
    getAxios(BACKEND.GET_DASHBOARD, allCookies.user.jwttoken)
  );
  
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          {/* <PengajuanSurat dataState={dataState} /> */}
          <LatestOrders
            refetch={refetch}
            dashboardData={dashboardData}
            loading={loading}
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
      </Grid>
    </div>
  );
};

export default withCookies(Dashboard);
