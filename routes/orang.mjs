import { list, add, update, validationAdd, validationUpdate, validationDelete, destroy } from "../core/orang.mjs";
import { setError } from "../utils/validation.mjs";

/**
 * Route Khusus Orang
 * Terdiri dari
 */
class Orang {
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
    // this.res.destroy();
  }

  post(req) {
    // Request masih buffer jadikan string
    req.addListener("data", (data) => {
      const requestOrang = JSON.parse(data.toString());
      const validated = validationAdd(requestOrang);

      const isError = setError(this.res, validated);

      // Jika error hentikan alur programnya
      if (isError) return;

      const orang = {
        id: requestOrang.id,
        nama: requestOrang.nama,
      };

      const result = add(orang);
      this.res.write(result);
      this.res.end();
      // this.res.destroy();
    });
  }

  put(req) {
    // Request masih buffer jadikan string
    req.addListener("data", (data) => {
      const requestOrang = JSON.parse(data.toString());

      const validated = validationUpdate(requestOrang);
      const isError = setError(this.res, validated);

      if (isError) {
        return;
      }

      const orang = {
        nama: requestOrang.nama,
      };

      const result = update(requestOrang.id, orang);
      this.res.write(result);
      this.res.end();
      // this.res.destroy();
    });
  }

  delete(req) {
    req.addListener("data", (data) => {
      const requestOrang = JSON.parse(data.toString());
      const validated = validationDelete(requestOrang);
      // console.log(validated);
      const isError = setError(this.res, validated);

      if (isError) {
        return;
      }

      // aman object id nya sudah di handle sama validation
      const result = destroy(requestOrang.id);

      this.res.write(result);
      this.res.end();
      // this.res.destroy();
    });
  }
}

export default Orang;
