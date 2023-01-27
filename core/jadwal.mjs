import { datas, result } from "../data/jadwal.mjs";
import { datas as orangs } from "../data/orang.mjs";

// mau data apa yang ditampilkan dlu
datas.push({
  jam: "12:00-13:00",
  nama_kegiatan: "Solat dan Makan",
  orang: {},
});

// List data orang jika ada kembalikan datanya kalau tidak maka return false
const list = (jam) => {
  let result = datas;

  // Jika diisi idnya atau mencari 1 data
  if (result.length > 0 && jam) {
    result = datas.find((data) => data.jam === jam); // kalau gk ketemu return undefined
  }

  return result;
};

// check data ada atau tidak
const found = (jam) => {
  const result = datas.find((jadwal) => jadwal.jam === jam);
  return result;
};

const findOrang = (id) => {
  const result = orangs.find((orang) => orang.id === id); // return undefined jika tidak ada
  return result;
};

// Tambah data
const add = (data) => {
  data.orang = findOrang(data.id_orang); // tambahkan data orang

  // hapus id_orang, untuk insert data ke memory
  delete data.id_orang;

  datas.push(data);

  return JSON.stringify({
    status: 200,
    added: data,
    data: datas,
  });
};

// Validasi saat tambah data
const validationAdd = (data) => {
  if (!data.jam) {
    result.message.jam = "Jam belum diisi";
  }

  if (!data.nama_kegiatan) {
    result.message.nama_kegiatan = "Nama Kegiatan belum diisi";
  }

  if (!data.id_orang) {
    result.message.id_orang = "id_orang belum diisi";
  }

  const adaOrang = findOrang(data.id_orang);
  if (!adaOrang && data.id_orang) {
    result.message.id_orang = "Orang tidak ditemukan, silahkan masukan dengan id orang yang sudah ada!";
  }

  const duplikat = found(data.jam);

  // Jika tidak duplikat dan message nya kosong dan orang wajib ada
  if (!duplikat && !Object.keys(result.message).length && adaOrang) {
    result.status = true;
  } else if (duplikat) {
    // jika duplikat
    result.message.jam = "Jam tersebut sudah ada jadwalnya silahkan masukkan jam yang lain";
  }

  // Kirim hasil validasi
  return result;
};

// Ubah data
const update = (jam, data) => {
  datas.forEach((value) => {
    if (value.jam == jam) {
      value.nama_kegiatan = data.nama_kegiatan; // timpa isi namanya berdasarkan id
      if (data.id_orang) {
        // console.log(value);
        // console.log(findOrang(data.id_orang));
        value.orang = findOrang(data.id_orang); // timpa isi orangnya
      }
    }
  });

  return JSON.stringify({
    status: 200,
    updated: { jam },
    data: datas,
  });
};

// Validasi saat ubah data
const validationUpdate = (data) => {
  if (!data.jam) {
    result.message.jam = "Jam belum diisi";
  }

  if (!data.nama_kegiatan) {
    result.message.nama_kegiatan = "Nama Kegiatan belum diisi";
  }

  // Id orang tidak apa tidak diisi kalau mau ubah ya baru diisi

  const adaOrang = findOrang(data.id_orang);
  if (!adaOrang && data.id_orang) {
    result.message.id_orang = "Orang tidak ditemukan, silahkan masukan dengan id orang yang sudah ada!";
  }

  const alredy = found(data.jam);

  // Jika datanya ada dan tidak ada pesan error atau orang nya ada
  if (alredy && !Object.keys(result.message).length) {
    result.status = true;
  } else if (!alredy && data.id) {
    result.message.id = "Id tidak ditemukan";
  }

  // Kirim hasil validasi
  return result;
};

// variabel delete tidak bisa karena sudah dipakai untuk delete array
const destroy = (jam) => {
  datas.forEach((value, index) => {
    if (value.jam == jam) {
      // mengapus data berdasarkan index jika ketemu idnya
      datas.splice(index, 1);
    }
  });
  // Kirim pesan aja lah
  return JSON.stringify({
    status: 200,
    message: `Data jadwal dengan jam ${jam} berhasil dihapus`,
  });
};

const validationDelete = (data) => {
  if (!data.jam) {
    result.message.jam = "Jam belum diisi";
    return result;
  }

  // Mencari data yang ada, utk dihapus
  const found = list(data.jam);

  if (found) {
    result.status = true;
  } else {
    result.message = "Tidak ada yang dihapus, Jam jadwal tidak ditemukan";
  }
  return result;
};

export { list, add, validationAdd, validationUpdate, update, destroy, validationDelete };
