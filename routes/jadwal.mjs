import { list, add, update, validationAdd, validationUpdate, validationDelete, destroy } from "../core/jadwal.mjs";
import { setError } from "../utils/validation.mjs";

/**
 * Route Khusus Jadwal
 * Terdiri dari
 */
class Jadwal {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.res.statusCode = 200; // default
  }

  get(id = null) {
    let result = list(id);
    if (!result) result = [];
    this.res.write(JSON.stringify(result));
    this.res.end();
  }

  post(req) {
    // Request masih buffer jadikan string
    req.addListener("data", (data) => {
      const requestJadwal = JSON.parse(data.toString());
      const validated = validationAdd(requestJadwal);

      const isError = setError(this.res, validated);

      // Jika error hentikan alur programnya
      if (isError) return;

      const jadwal = {
        jam: requestJadwal.jam,
        nama_kegiatan: requestJadwal.nama_kegiatan,
        id_orang: requestJadwal.id_orang,
      };

      const result = add(jadwal);
      this.res.write(result);
      this.res.end();
    });
  }

  put(req) {
    // Request masih buffer jadikan string
    req.addListener("data", (data) => {
      const requestJadwal = JSON.parse(data.toString());

      const validated = validationUpdate(requestJadwal);
      const isError = setError(this.res, validated);

      if (isError) {
        return;
      }

      const jadwal = {
        nama_kegiatan: requestJadwal.nama_kegiatan,
        id_orang: requestJadwal.id_orang,
      };

      const result = update(requestJadwal.jam, jadwal);
      this.res.write(result);
      this.res.end();
    });
  }

  delete(req) {
    req.addListener("data", (data) => {
      const requestJadwal = JSON.parse(data.toString());
      const validated = validationDelete(requestJadwal);
      // console.log(validated);
      const isError = setError(this.res, validated);

      if (isError) {
        return;
      }

      // aman object id nya sudah di handle sama validation
      const result = destroy(requestJadwal.jam);

      this.res.write(result);
      this.res.end();
    });
  }
}

export default Jadwal;
