import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Button } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import { Modal, Title, ColumnContainer, ButtonContainer } from './UpsertLowongan.style'
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
import FormControl from '@material-ui/core/FormControl';



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

const UpsertLowongan = props => {
  const { toggle, actionType, dataItem } = props;
  const classes = useStyles();
  

  const [dataState, setDataState] = useState(
    actionType === 'Edit' ?
    dataItem : 
    {
    judul: "",
    jumlah: "",
    keterangan: "",
    id_jenis_lowongan: 0,
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

  console.log('dataState: ', dataState)

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
        <Title>{actionType + ' Lowongan'}</Title>
        <ColumnContainer full>
        <TextField
            id="nomor"
            style={{ marginBottom: 15 }}
            label={'Judul'}
            value={dataState.judul}
            onChange={e => (handleChange("judul", e))}
          />
        </ColumnContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <ColumnContainer>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Jenis Lowongan</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="id_jenis_lowongan"
              value={dataState.id_jenis_lowongan}
              onChange={e => (handleChange("id_jenis_lowongan", e))}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={1}>Full Time</MenuItem>
              <MenuItem value={2}>Part Time</MenuItem>
              <MenuItem value={3}>Kontrak</MenuItem>
            </Select>
        </FormControl>
        </ColumnContainer>
        <ColumnContainer>
        <TextField
            id="jumlah"
            style={{ marginBottom: 15 }}
            label="Jumlah"
            value={dataState.jumlah}
            onChange={handleNumberChange}
          />
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
          />
        </ColumnContainer>
      
      </div>
      <ButtonContainer>
        <Button 
          color="primary" 
          style={{width: 100, marginLeft: 20}} 
          onClick={toggle}
          variant="contained"
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

export default UpsertLowongan;
