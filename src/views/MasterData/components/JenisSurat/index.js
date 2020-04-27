import React, { useState } from 'react';
import dataJenisSurat from '../../dataJenisSurat';
import JenisSuratTable from './JenisSuratTable';
import JenisSuratToolbar from './JenisSuratToolbar'
import InsertJenisSurat from './InsertJenisSurat';


const JenisSurat = () => {
  const [users] = useState(dataJenisSurat);
  const [deleteAct, setDeleteAct] = useState(false)
  const [showSuratModal, setSuratModal] = useState(false)

  const suratToggle = () => {
    setSuratModal(!showSuratModal)
  }

  const deleteToggle = () => {
    setDeleteAct(!deleteAct)
  }

  return (
    <div>
      {showSuratModal && <InsertJenisSurat 
        toggle={suratToggle} />
      }
      <JenisSuratToolbar 
        toggle={suratToggle}
        deleteToggle={deleteToggle} />
      <JenisSuratTable users={users} />
    </div>
  );
};

export default JenisSurat;
