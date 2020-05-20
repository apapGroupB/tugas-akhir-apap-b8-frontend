const getRole = (id_role) => {
  switch(id_role) {
  case 1:
    return {
      id: 1,
      name: "Kepala Sekolah"
    }
  case 2:
    return {
      id: 2,
      name: "Admin TU"
    }
  case 3:
    return {
      id: 3,
      name: "Guru"
    }
  case 4:
    return {
      id: 4,
      name: "Siswa"
    }
  case 5:
    return {
      id: 5,
      name: "Pustakawan"
    }
  case 6:
    return {
      id: 6,
      name: "Pengurus Koperasi"
    }
  case 7:
    return {
      id: 7,
      name: "Anggota Koperasi"
    }
  default:
    return {
      id: 0,
      name: "Guest"
    }
  }
}

export default getRole