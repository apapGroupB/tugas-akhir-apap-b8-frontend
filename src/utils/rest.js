const SITE_URL = 'https://backend-situ.herokuapp.com'
const SIVITAS_URL = 'http://si-sivitas.herokuapp.com/api'

const BACKEND = {
  GET_ALL_LOWONGAN: SITE_URL + '/lowongan/viewall',
  GET_ALL_PENGAJUAN: SITE_URL + '/pengajuan-surat/viewall',
  GET_JENIS_LOWONGAN: SITE_URL + '/lowongan/jenis/viewall',
  ADD_PENGAJUAN_SURAT: SITE_URL + '/pengajuan-surat/add'
}

const WEBSERVICE = {
  GET_ALL_PEGAWAI: SIVITAS_URL + '/employees'
}

export {
  BACKEND,
  WEBSERVICE
}