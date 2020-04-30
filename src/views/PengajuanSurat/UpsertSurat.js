import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import { Modal, Title, ColumnContainer, ButtonContainer, SpinnerCard } from './UpsertSurat.style'
import TextField from "@material-ui/core/TextField";
import moment from 'moment'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import statusConfig from './statusConfig.json'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Colors } from '../../styles/color'
import { BACKEND } from '../../utils'
import useAxios from "axios-hooks";
import axios from 'axios'


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

const UpsertSurat = props => {
  const { toggle, actionType, dataItem, refetch, setNotif } = props;
  const classes = useStyles();
  const [postLoading, setPostLoading] = useState(false)
  const [dataState, setDataState] = useState(
    actionType === 'Edit' ?
    dataItem :
    {
    nomor_surat: "",
    id_jenis_surat: 1,
    status: 0,
    tanggal_pengajuan: moment().format('YYYY-MM-DD'),
    tanggal_disetujui: moment(),
    keterangan: ""
  })


  
  const handleNumberChange = (event) => {
    setDataState({
      ...dataState,
      nomor_surat: event.target.value.replace(/[^0-9]/g, "")
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

  const validation = () => {
    setPostLoading(true)
    axios.post(BACKEND.ADD_PENGAJUAN_SURAT, {
      ...dataState,
      tanggal_pengajuan: moment(dataState.tanggal_pengajuan).format('YYYY-MM-DD'),
      tanggal_disetujui: null
    }).then(res => {
      setNotif(true)
      toggle()
      refetch()
      setPostLoading(false)
    })
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
        <Title>{actionType + ' Pengajuan Surat'}</Title>
        <ColumnContainer full>
        <TextField
            // error={errorField.find((dt) => dt === data.id) ? true : false}
            disabled
            id="nomor_surat"
            style={{ marginBottom: 15 }}
            label={'Nomor Surat'}
            value={dataState.nomor_surat === "" ? "XXXXXXXXXXXXXX" : dataState.nomor_surat}
            onChange={handleNumberChange}
            InputLabelProps={{
              shrink: true,
            }}
            // helperText={
            //   errorField.find((dt) => dt === data.id)
            //     ? "Please Fill This Field"
            //     : ""
            // }
          />
        </ColumnContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <ColumnContainer>
        <InputLabel id="demo-simple-select-label">Jenis Surat</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="id_jenis_surat"
            value={dataState.id_jenis_surat}
            onChange={e => (handleChange("id_jenis_surat", e))}
          >
            <MenuItem value={1}>Surat Izin Ikut Kegiatan</MenuItem>
            <MenuItem value={2}>Surat Izin Sakit</MenuItem>
            <MenuItem value={3}>Surat Keterangan Lulus</MenuItem>
            <MenuItem value={4}>Surat Rekomendasi Beasiswa</MenuItem>
          </Select>
        </ColumnContainer>
        <ColumnContainer>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            disabled
            labelId="demo-simple-select-label"
            id="status"
            value={dataState.status}
            onChange={e => (handleChange("status", e))}
          >
            {statusConfig.map((data, i) => 
              <MenuItem key={i} value={data.id}>{data.name}</MenuItem>
            )}
          </Select>
        </ColumnContainer>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ColumnContainer>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyy"
                margin="normal"
                id="date-picker-inline"
                label="Tanggal Diajukan"
                value={dataState.tanggal_pengajuan}
                onChange={e => (handleDateChange("tanggal_pengajuan", e))}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </ColumnContainer>
            <ColumnContainer >
            <KeyboardDatePicker
                disabled
                disableToolbar
                variant="inline"
                format="MM/dd/yyy"
                margin="normal"
                id="date-picker-inline"
                label="Tanggal Disetujui"
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
              id="nomor_surat"
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
        <Button 
          disabled={postLoading}
          color="primary" 
          variant="contained"
          style={{width: 100, marginLeft: 20}} 
          onClick={validation}
        >
          {postLoading ? <CircularProgress color="inherit" size={20}/> : 'Save'}
        </Button>
        <Button 
          disabled={postLoading}
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

export default UpsertSurat;
