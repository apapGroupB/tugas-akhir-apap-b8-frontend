import uuid from 'uuid/v1';

// judul: varchar (200)
// tanggal_dibuka: date
// tanggal_ditutup: date
// keterangan: varchar (200)
// jumlah: int
// id_jenis_lowongan: int
// uuid_user: varchar (200)

export default [
  {
    id: uuid(),
    judul: 'Full Time',
    keterangan: '-',
  },
  {
    id: uuid(),
    judul: 'Part Time',
    keterangan: '-',
  },
  {
    id: uuid(),
    judul: 'Magang',
    keterangan: '-',
  },
  {
    id: uuid(),
    judul: 'Permanen',
    keterangan: '-',
  },
  {
    id: uuid(),
    judul: 'Kontrak',
    keterangan: '-',
  },
];
