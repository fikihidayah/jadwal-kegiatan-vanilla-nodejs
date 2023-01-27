import Jadwal from "../routes/jadwal.mjs";
import { result } from "../data/jadwal.mjs";

const jadwal = (url, request, response) => {
  request.on("close", () => {
    // Reset message validation error setelah connection ditutup
    result.status = false;
    result.message = {};
  });

  const params = url.searchParams;
  if (url.pathname == "/jadwal") {
    const route = new Jadwal(request, response);

    if (request.method == "GET" && params.get("jam")) {
      return route.get(params.get("jam"));
    }

    switch (request.method) {
      case "GET":
        return route.get();
      case "POST":
        return route.post(request);
      case "PUT":
        return route.put(request);
      case "DELETE":
        return route.delete(request);
    }

    // undefined is founded
  }

  return true; // pass
};

export default jadwal;
