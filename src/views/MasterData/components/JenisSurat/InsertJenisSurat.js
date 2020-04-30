import useAxios from "axios-hooks";
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from "@material-ui/core/TextField";
import { Modal, Title, ColumnContainer, ButtonContainer } from './InsertJenisSurat.style'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const InsertJenisSurat = props => {
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

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <Dialog 
      className={classes.modal}
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Modal>
      <div>
      <Title>{'Tambah Jenis Surat'}</Title>
      <ColumnContainer full>
      <TextField
          // error={errorField.find((dt) => dt === data.id) ? true : false}
          id="nama"
          style={{ marginBottom: 15 }}
          label={'Nama'}
          value={dataState.nama}
          onChange={(event) => handleChange("nama", event)}
          // helperText={
          //   errorField.find((dt) => dt === data.id)
          //     ? "Please Fill This Field"
          //     : ""
          // }
        />
      </ColumnContainer>
      <ColumnContainer full>
      <TextField
          // error={errorField.find((dt) => dt === data.id) ? true : false}
          id="keterangan"
          style={{ marginBottom: 15 }}
          label={'Keterangan'}
          value={dataState.nomor_surat}
          onChange={(event) => handleChange("keterangan", event)}
          // helperText={
          //   errorField.find((dt) => dt === data.id)
          //     ? "Please Fill This Field"
          //     : ""
          // }
        />
      </ColumnContainer>
      </div>
      <ButtonContainer>
        <Button 
          color="primary" 
          variant="contained"
          style={{width: 100, marginLeft: 20}} 
          onClick={toggle}
        >Save</Button>
        <Button 
          color="primary" 
          style={{width: 100}} 
          onClick={toggle}
        >Cancel</Button>
      </ButtonContainer>
        
      </Modal>
      </Dialog>
    </Backdrop>
  );
};

export default InsertJenisSurat;
