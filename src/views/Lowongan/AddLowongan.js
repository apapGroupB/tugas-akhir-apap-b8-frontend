import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Button } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import { Modal, Title, ColumnContainer, ButtonContainer } from './AddLowongan.style'
import TextField from "@material-ui/core/TextField";
import moment from 'moment'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';



const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const AddLowongan = props => {
  const { toggle } = props;
  const classes = useStyles();
  const sports = [ "Baseball", "Basketball", "Cricket", "Field Hockey", "Football", "Table Tennis", "Tennis", "Volleyball" ];

  const [dataState, setDataState] = useState({
    judul: "",
    jumlah: 0,
    keterangan: "",
    jenis_lowongan: 0,
    tanggal_dibuka: moment(),
    tanggal_ditutup: moment(),
  })
  
  const handleNumberChange = (event) => {
    setDataState({
      ...dataState,
      jumlah: event.target.value.replace(/[^0-9]/g, "")
    });
  };

  const handleChange = (id, event) => {
    setDataState({
      ...dataState,
      [id]: event.target.value
    });
  };

  const handleDateChange = (id, date) => {
    console.log(id, date)
    setDataState({
      ...dataState,
      [id]: moment(date).format()
    });
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
        <Title>Tambah Lowongan</Title>
        <ColumnContainer full>
        <TextField
            id="nomor"
            style={{ marginBottom: 15 }}
            label={'Judul'}
            value={dataState.judul}
            onChange={e => (handleChange("judul", e))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </ColumnContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <ColumnContainer>
        <InputLabel id="demo-simple-select-label">Jenis Lowongan</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="jenis_lowongan"
            value={dataState.jenis_lowongan}
            onChange={e => (handleChange("jenis_lowongan", e))}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </ColumnContainer>
        <ColumnContainer>
        <InputLabel id="demo-simple-select-label">Jumlah</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="jumlah"
            value={dataState.jumlah}
            onChange={handleNumberChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </ColumnContainer>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ColumnContainer>
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd MMMM yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Tanggal Dibuka"
            value={dataState.tanggal_pengajuan}
            onChange={e => (handleDateChange("tanggal_pengajuan", e))}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </ColumnContainer>
        <ColumnContainer>
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd MMMM yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Tanggal Ditutup"
            value={dataState.tanggal_disetujui}
            onChange={e => (handleDateChange("tanggal_disetujui", e))}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </ColumnContainer>
        </MuiPickersUtilsProvider>
        </div>
        <ColumnContainer full>
        <TextField
            id="nomor"
            style={{ marginBottom: 15 }}
            label="Keterangan"
            value={dataState.keterangan}
            onChange={e => handleChange('keterangan', e)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </ColumnContainer>
      
      </div>
      <ButtonContainer>
        <Button color="primary" style={{width: 100}} onClick={toggle}>Save</Button>
        <Button color="primary" style={{width: 100}} onClick={toggle}>Cancel</Button>
      </ButtonContainer>
        
      </Modal>
      </Dialog>
    </Backdrop>
  );
};

export default AddLowongan;
