import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import { Modal, Title, Subtitle, ColumnContainer, ButtonContainer } from './logout.style'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const Logout = props => {
  const history = useHistory()
  const { toggle } = props;
  const classes = useStyles();
  const [dataState, setDataState] = useState({
    nama: "",
    keterangan: ""
  })

  const handleChange = (id, event) => {
    setDataState({
      ...dataState,
      [id]: event.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogin")
    window.location.reload()
  }

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <Dialog 
      className={classes.modal}
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Modal>
      <Title>Logout</Title>
      <Subtitle>Apakah anda ingin keluar?</Subtitle>
      <ButtonContainer>
        <Button 
          color="primary" 
          variant="contained"
          style={{width: 150, marginLeft: 20}} 
          onClick={handleLogout}
        >Ya</Button>
        <Button 
          color="primary" 
          style={{width: 150}} 
          onClick={toggle}
        >Tidak</Button>
      </ButtonContainer>
        
      </Modal>
      </Dialog>
    </Backdrop>
  );
};

export default Logout;
