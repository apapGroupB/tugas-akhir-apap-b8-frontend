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
  LatestOrders,
  TasksProgress,
  UsersByDevice,
  TopFiveLowongan
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


  console.log('dashboardData: ', dashboardData)

  return (
    <div className={classes.root}>
      
      <Grid
        container
        spacing={1}
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <LatestOrders
            refetch={refetch}
            dashboardData={dashboardData}
            loading={loading}
          />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Budget
              style={{marginBottom: 8}}
              dashboardData={dashboardData}
              loading={loading}
            />
            <TotalUsers
              style={{marginBottom: 8}}
              dashboardData={dashboardData}
              loading={loading}
            />
            <TasksProgress
              dashboardData={dashboardData}
              loading={loading}
            />
          </div>
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice
            loading={loading}
            dashboardData={dashboardData}
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <TopFiveLowongan />
        </Grid>
      </Grid>
    </div>
  );
};

export default withCookies(Dashboard);
