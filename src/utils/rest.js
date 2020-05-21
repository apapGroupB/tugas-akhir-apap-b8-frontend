const SITE_URL = 'https://backend-situ.herokuapp.com'
const SIVITAS_URL = 'http://si-sivitas.herokuapp.com/api'

const BACKEND = {
  ADD_USER: SITE_URL + '/user/add',
  EDIT_USER:  SITE_URL + '/user/update',
  ADD_LOWONGAN: SITE_URL + '/lowongan/add',
  EDIT_LOWONGAN: SITE_URL + '/lowongan/update',
  DELETE_LOWONGAN: SITE_URL + '/lowongan/delete',
  AUTHENTICATE: SITE_URL + '/authenticate',
  GET_ALL_USER: SITE_URL + '/user/viewall',
  GET_ALL_LOWONGAN: SITE_URL + '/lowongan/viewall',
  ADD_PENGAJUAN_SURAT: SITE_URL + '/pengajuan-surat/add',
  EDIT_PENGAJUAN_SURAT: SITE_URL + '/pengajuan-surat/update',
  DELETE_PENGAJUAN_SURAT: SITE_URL + '/pengajuan-surat/delete',
  GET_ALL_PENGAJUAN: SITE_URL + '/pengajuan-surat/viewall',
  GET_JENIS_LOWONGAN: SITE_URL + '/lowongan/jenis/viewall',
  GET_ALL_USER: SITE_URL + '/user/viewall',
  DELETE_USER: SITE_URL + '/user/delete',
}

const WEBSERVICE = {
  GET_PEGAWAI_SIVITAS: SIVITAS_URL + '/employees',
  GET_SISWA_SIVITAS: SIVITAS_URL + '/students',
  GET_GURU_SIVITAS: SIVITAS_URL + '/teachers'
}

export {
  BACKEND,
  SITE_URL,
  WEBSERVICE
}