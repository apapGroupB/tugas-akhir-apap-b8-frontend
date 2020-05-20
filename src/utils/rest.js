const SITE_URL = 'https://backend-situ.herokuapp.com'
const SIVITAS_URL = 'http://si-sivitas.herokuapp.com/api'

const BACKEND = {
  ADD_USER: SITE_URL + '/user/add',
  AUTHENTICATE: SITE_URL + '/authenticate',
  GET_ALL_USER: SITE_URL + '/user/viewall',
  GET_ALL_LOWONGAN: SITE_URL + '/lowongan/viewall',
  ADD_PENGAJUAN_SURAT: SITE_URL + '/pengajuan-surat/add',
  GET_ALL_PENGAJUAN: SITE_URL + '/pengajuan-surat/viewall',
  GET_JENIS_LOWONGAN: SITE_URL + '/lowongan/jenis/viewall',

}

const WEBSERVICE = {
  GET_ALL_USER: SIVITAS_URL + '/employees'
}

export {
  BACKEND,
  SITE_URL,
  WEBSERVICE
}