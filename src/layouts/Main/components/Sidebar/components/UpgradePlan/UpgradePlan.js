import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, colors } from '@material-ui/core';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import BookIcon from '@material-ui/icons/Book';
import StoreIcon from '@material-ui/icons/Store';
import { Colors } from 'styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: colors.grey[50]
  },
  media: {
    paddingTop: theme.spacing(2),
    height: 80,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  content: {
    padding: theme.spacing(1, 5)
  },
  actions: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
}));

const UpgradePlan = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.content}>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          QUICK ACCESS
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          color="primary"
          style={{
            background: '#ffe8cf',
            width: "100%",
            marginBottom: 10,
            justifyContent: 'flex-start',
            color: '#c48643'
          }}
          component="a"
          target="_blank"
          size="small"
          href="https://si-perpus-b6-frontend.herokuapp.com/sign-in"
        >
          <HomeWorkIcon style={{ margin: 5 }} />
          SI Ruangan
        </Button>
        <Button
          color="primary"
          style={{
            background: '#DEE8E1',
            width: "100%",
            marginBottom: 10,
            justifyContent: 'flex-start',
            color: '#4a6353'
          }}
          target="_blank"
          component="a"
          size="small"
          href="https://si-perpus-b6-frontend.herokuapp.com/sign-in"
        >
          <BookIcon style={{ margin: 5}} />
          SI Perpustakaan
        </Button>
        <Button
          color="primary"
          style={{
            background: '#dee5ff',
            width: "100%",
            marginBottom: 10,
            justifyContent: 'flex-start'
          }}
          component="a"
          target="_blank"
          size="small"
          href="https://si-perpus-b6-frontend.herokuapp.com/sign-in"
        >
          <StoreIcon style={{ margin: 5 }} />
          SI Koperasi
        </Button>
      </div>
    </div>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string
};

export default UpgradePlan;
