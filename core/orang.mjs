import { datas, result } from "../data/orang.mjs";
datas.push({
  id: "mantap",
  nama: "Syafiki Hidayah",
});

// List data orang jika ada kembalikan datanya kalau tidak maka return false
const list = (id) => {
  let result = datas;

  // Jika diisi idnya atau mencari 1 data
  if (result.length > 0 && id) {
    result = datas.find((data) => data.id === id); // kalau gk ketemu return undefined
  }

  return result;
};

// check data ada atau tidak
const found = (id) => {
  const result = datas.find((orang) => orang.id === id);
  return result;
};

// Tambah data
const add = (data) => {
  datas.push(data);

  return JSON.stringify({
    status: 200,
    added: data,
    data: datas,
  });
};

// Validasi saat tambah data
const validationAdd = (data) => {
  if (!data.id) {
    result.message.id = "Id belum diisi";
  }

  if (!data.nama) {
    result.message.nama = "Nama belum diisi";
  }

  const duplikat = found(data.id);

  // Jika tidak duplikat dan message nya kosong
  if (!duplikat && !Object.keys(result.message).length) {
    result.status = true;
  } else if (duplikat) {
    // jika duplikat
    result.message.id = "Id sudah ada silahkan masukkan id yang lain";
  }

  // Kirim hasil validasi
  return result;
};

// Ubah data
const update = (id, data) => {
  datas.forEach((value) => {
    if (value.id == id) {
      value.nama = data.nama; // timpa isi namanya berdasarkan id
    }
  });

  return JSON.stringify({
    status: 200,
    updated: { id },
    data: datas,
  });
};

// Validasi saat ubah data
const validationUpdate = (data) => {
  if (!data.id) {
    result.message.id = "Id belum diisi";
  }

  if (!data.nama) {
    result.message.nama = "Nama belum diisi";
  }

  const alredy = found(data.id);

  // Jika datanya ada dan tidak ada pesan error
  if (alredy && !Object.keys(result.message).length) {
    result.status = true;
  } else if (!alredy && data.id) {
    result.message.id = "Id tidak ditemukan";
  }

  // Kirim hasil validasi
  return result;
};

// variabel delete tidak bisa karena sudah dipakai untuk delete array
const destroy = (id) => {
  datas.forEach((value, index) => {
    if (value.id == id) {
      // mengapus data berdasarkan index jika ketemu idnya
      datas.splice(index, 1);
    }
  });
  // Kirim pesan aja lah
  return JSON.stringify({
    status: 200,
    message: `Data orang dengan id ${id} berhasil dihapus`,
  });
};

const validationDelete = (data) => {
  if (!data.id) {
    result.message.id = "Id belum diisi";
    return result;
  }

  // Mencari data yang ada, utk dihapus
  const found = list(data.id);

  if (found) {
    result.status = true;
  } else {
    result.message = "Tidak ada yang dihapus, Id tidak ditemukan";
  }
  return result;
};

export { list, add, validationAdd, validationUpdate, update, destroy, validationDelete };
