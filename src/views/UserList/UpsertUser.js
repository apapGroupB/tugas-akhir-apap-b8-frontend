import moment from 'moment'
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from "@material-ui/core/TextField";
import { Modal, Title, ColumnContainer, ButtonContainer } from './UpsertUser.style'
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

import { BACKEND } from '../../utils'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const requiredField = ['username', 'password', 'nama', 'tempat_lahir', 'telepon']

const UpsertUser = props => {
  const { toggle, refetch, setNotif  } = props;
  const classes = useStyles();
  const [errorField, setErrorField] = useState([])
  const [postLoading, setPostLoading] = useState(false)
  const [dataState, setDataState] = useState({
    username: "",
    id_role: 2,
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: moment(),
    alamat: "",
    telepon: "",
    password: ""
  })

  const handleChange = (id, event) => {
    setDataState({
      ...dataState,
      [id]: event.target.value
    });
  };

  const handleDateChange = (id, date) => {
    setDataState({
      ...dataState,
      [id]: moment(date).format()
    });
  }

  const handleNumberChange = (event) => {
    setDataState({
      ...dataState,
      telepon: event.target.value.replace(/[^0-9]/g, "")
    });
  };

  const validation = () => {
    const validateData = requiredField.filter(
      (data) => dataState[data] === ""
    );
    setErrorField(validateData);
    if (validateData.length === 0) {
      setPostLoading(true)
      axios.post(BACKEND.ADD_USER, dataState).then(res => {
        setNotif(true)
        toggle()
        refetch()
        setPostLoading(false)
      })
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
        <Title>{'Tambah User'}</Title>
        <ColumnContainer full>
          <TextField
            error={errorField.find((dt) => dt === "nama") ? true : false}
            id="nama"
            label={'Nama'}
            value={dataState.nama}
            onChange={(event) => handleChange("nama", event)}
            helperText={
              errorField.find((dt) => dt === "nama")
                ? "Please Fill This Field"
                : ""
            }
          />
        </ColumnContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ColumnContainer>
              <TextField
                error={errorField.find((dt) => dt === "tempat_lahir") ? true : false}
                id="tempat_lahir"
                style={{ marginTop: 16 }}
                label={'Tempat Lahir'}
                value={dataState.tempat_lahir}
                onChange={(event) => handleChange("tempat_lahir", event)}
                helperText={
                  errorField.find((dt) => dt === "tempat_lahir")
                    ? "Please Fill This Field"
                    : ""
                }
              />
            </ColumnContainer>
            <ColumnContainer >
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd-MM-yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Tanggal Lahir"
                value={dataState.tanggal_lahir}
                onChange={e => (handleDateChange("tanggal_lahir", e))}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </ColumnContainer>
          </MuiPickersUtilsProvider>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ColumnContainer>
              <TextField
                  disabled
                  id="role"
                  label={'Role'}
                  value="Admin TU"
                />
            </ColumnContainer>
            <ColumnContainer >
              <TextField
                error={errorField.find((dt) => dt === "telepon") ? true : false}
                id="telepon"
                label={'No Handphone'}
                value={dataState.telepon}
                onChange={handleNumberChange}
                helperText={
                  errorField.find((dt) => dt === "telepon")
                    ? "Please Fill This Field"
                    : ""
                }
              />
            </ColumnContainer>
          </MuiPickersUtilsProvider>
        </div>
        <ColumnContainer full>
          <TextField
            id="alamat"
            label={'Alamat'}
            value={dataState.alamat}
            onChange={(event) => handleChange("alamat", event)}
          />
        </ColumnContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <ColumnContainer>
            <TextField
              error={errorField.find((dt) => dt === "username") ? true : false}
              id="username"
              label={'Username'}
              value={dataState.username}
              onChange={(event) => handleChange("username", event)}
              helperText={
                errorField.find((dt) => dt === "username")
                  ? "Please Fill This Field"
                  : ""
              }
            />
          </ColumnContainer>
          <ColumnContainer >
            <TextField
              type="password"
              error={errorField.find((dt) => dt === "password") ? true : false}
              id="password"
              label={'Password'}
              value={dataState.password}
              onChange={(event) => handleChange("password", event)}
              helperText={
                errorField.find((dt) => dt === "password")
                  ? "Please Fill This Field"
                  : ""
              }
            />
            
          </ColumnContainer>
        </div>
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

export default UpsertUser;
