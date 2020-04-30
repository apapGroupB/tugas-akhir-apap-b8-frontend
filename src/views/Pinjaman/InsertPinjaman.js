import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import { Modal, Title, ColumnContainer, ButtonContainer } from './InsertPinjaman.style'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const InsertPinjaman = props => {
  const { toggle } = props;
  const classes = useStyles();
  const [errorField, setErrorField] = useState(false)
  const [dataState, setDataState] = useState({
    jumlah_pinjaman: "",
    tanggal_pengajuan: moment()
  })

  const handleDateChange = date => {
    setDataState({
      ...dataState,
      tanggal_pengajuan: moment(date).format()
    });
  }

  const handleNumberChange = (event) => {
    setDataState({
      ...dataState,
      jumlah_pinjaman: event.target.value.replace(/[^0-9]/g, "")
    });
  };

  const validation = () => {
    if(dataState.jumlah_pinjaman !== "") {
      toggle()
    } else {
      setErrorField(true)
    }
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
      <div>
      <Title>{'Ajukan Pinjaman'}</Title>
      <ColumnContainer full>
      <TextField
          error={errorField}
          id="jumlah_pinjaman"
          label={'Jumlah Pinjaman'}
          value={dataState.jumlah_pinjaman}
          onChange={handleNumberChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
          }}
          helperText={
            errorField
              ? "Please Fill This Field"
              : ""
          }
        />
      </ColumnContainer>
      <ColumnContainer full>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd-MM-yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Tanggal Pengajuan"
            value={dataState.tanggal_pengajuan}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </ColumnContainer>
      </div>
      <ButtonContainer>
        <Button 
          color="primary" 
          variant="contained"
          style={{width: 100, marginLeft: 20}} 
          onClick={validation}
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

export default InsertPinjaman;
