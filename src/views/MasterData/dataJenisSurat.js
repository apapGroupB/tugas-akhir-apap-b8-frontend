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
    judul: 'Surat Izin Ikut Kegiatan',
    keterangan: '-',
  },
  {
    id: uuid(),
    judul: 'Surat Izin Sakit',
    keterangan: '-',
  },
  {
    id: uuid(),
    judul: 'Surat Keterangan Lulus',
    keterangan: '-',
  },
  {
    id: uuid(),
    judul: 'Surat Rekomendasi Beasiswa',
    keterangan: '-',
  },
  {
    id: uuid(),
    judul: 'Surat Survey',
    keterangan: '-',
  }
];
