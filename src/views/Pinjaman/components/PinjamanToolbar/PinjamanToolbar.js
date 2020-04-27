import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';

import { SearchInput } from 'components';
import { Colors } from 'styles';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const PinjamanToolbar = props => {
  const { 
    className, 
    setActionType, 
    deleteToggle,
    toggle,
    ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <Typography 
          style={{
            fontWeight: 'bold', 
            color: Colors.Purple, 
            fontSize: 'x-large'
          }} >Histori Pinjaman</Typography>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            toggle()
            setActionType('Tambah')
          }}
        >
          Tambah Pinjaman
        </Button>
      </div>
    </div>
  );
};

PinjamanToolbar.propTypes = {
  className: PropTypes.string
};

export default PinjamanToolbar;
