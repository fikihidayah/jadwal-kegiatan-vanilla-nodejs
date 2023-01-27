import Orang from "../routes/orang.mjs";
import { result } from "../data/orang.mjs";

const orang = (url, request, response) => {
  request.on("close", () => {
    // Reset message validation error setelah connection ditutup
    result.status = false;
    result.message = {};
  });

  const params = url.searchParams;
  if (url.pathname == "/orang") {
    const route = new Orang(request, response);
    if (request.method == "GET" && params.get("id")) {
      return route.get(params.get("id"));
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

export default orang;
