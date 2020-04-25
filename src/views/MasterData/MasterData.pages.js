import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { JenisSuratToolbar, JenisSuratTable } from './components/JenisSurat';
import { JenisLowonganToolbar, JenisLowonganTable, InsertJenisLowongan } from './components/JenisLowongan';
import dataJenisSurat from './dataJenisSurat';
import dataJenisLowongan from './dataLowongan';

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

  const [users] = useState(dataJenisSurat);
  const [jenisLowongan, setJenisLowongan] = useState(dataJenisLowongan);
  const [showLowonganModal, setShowLowonganModal] = useState(false)
  const [showSuratModal, setSuratModal] = useState(false)

  const lowonganToggle = () => {
    setShowLowonganModal(!showLowonganModal)
  } 

  const suratToggle = () => {
    setSuratModal(!showSuratModal)
  } 

  return (
    <div className={classes.root}>
      {showLowonganModal && <InsertJenisLowongan 
        toggle={lowonganToggle} />
      }
      {showSuratModal && <InsertJenisLowongan 
        toggle={suratToggle} />
      }
      <div className={classes.content}>
        <JenisSuratToolbar toggle={suratToggle}/>
        <JenisSuratTable users={users} />
      </div>
      <div className={classes.content}>
        <JenisLowonganToolbar toggle={lowonganToggle}/>
        <JenisLowonganTable users={jenisLowongan} />
      </div>
    </div>
  );
};

export default UserList;
