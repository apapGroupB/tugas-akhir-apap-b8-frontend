import React, { useState } from 'react';
import dataJenisSurat from '../../dataJenisSurat';
import JenisLowonganTable from './JenisLowonganTable';
import JenisLowonganToolbar from './JenisLowonganToolbar'
import InsertJenisLowongan from './InsertJenisLowongan';


const JenisLowongan = () => {
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
      {showSuratModal && <InsertJenisLowongan 
        toggle={suratToggle} />
      }
      <JenisLowonganToolbar 
        toggle={suratToggle}
        deleteToggle={deleteToggle} />
      <JenisLowonganTable users={users} />
    </div>
  );
};

export default JenisLowongan;
