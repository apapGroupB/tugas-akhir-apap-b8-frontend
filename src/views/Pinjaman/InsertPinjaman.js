import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import { Modal, Title, ColumnContainer, ButtonContainer } from './InsertPinjaman.style'
import roles from './roles.json'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const UpsertUser = props => {
  const { toggle } = props;
  const classes = useStyles();
  const [dataState, setDataState] = useState({
    username: "",
    password: "",
    id_role: 0
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
      <Title>{'Tambah User'}</Title>
      <ColumnContainer full>
      <TextField
          // error={errorField.find((dt) => dt === data.id) ? true : false}
          id="username"
          style={{ marginBottom: 15 }}
          label={'Username'}
          value={dataState.username}
          onChange={(event) => handleChange("username", event)}
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
          id="password"
          style={{ marginBottom: 15 }}
          label={'Password'}
          value={dataState.password}
          onChange={(event) => handleChange("password", event)}
          // helperText={
          //   errorField.find((dt) => dt === data.id)
          //     ? "Please Fill This Field"
          //     : ""
          // }
        />
      </ColumnContainer>
      <ColumnContainer>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="id_role"
          value={dataState.id_role}
          onChange={e => (handleChange("id_role", e))}
        >
          {roles.map((data, i) => 
            <MenuItem key={i} value={data.id}>{data.name}</MenuItem>
          )}
        </Select>
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

export default UpsertUser;
