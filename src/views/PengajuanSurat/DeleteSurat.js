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
import { withCookies } from 'react-cookie';


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
    tanggal_disetujui: null,
    keterangan: "",
    uuid_user: ""
      })

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
        <Title>{'Hapus Pengajuan Surat'}</Title>
        <ColumnContainer full>
        Apakah anda ingin menghapus pengajuan surat ini?
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
          {postLoading ? <CircularProgress color="inherit" size={20}/> : 'Ya'}
        </Button>
        <Button 
          disabled={postLoading}
          color="primary" 
          style={{width: 100}} 
          onClick={toggle}
        >Tidak</Button>
      </ButtonContainer>
        
      </Modal>
      </Dialog>
    </Backdrop>
  );
};

export default withCookies(UpsertSurat);
