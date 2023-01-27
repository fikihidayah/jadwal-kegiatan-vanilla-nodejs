import http from "http";

import orangPath from "./path/orang.mjs";
import jadwalPath from "./path/jadwal.mjs";

const port = 3001;
const baseurl = "http://localhost:" + port;

const server = http.createServer((request, response) => {
  // Menerima json saja
  response.setHeader("Content-Type", "application/json");

  const url = new URL(baseurl + request.url);

  // Panggil semua route
  const pathOrang = orangPath(url, request, response);
  // stop program after response is started
  if (!pathOrang) return;

  const pathJadwal = jadwalPath(url, request, response);
  // stop program after response is started
  if (!pathJadwal) return;

  response.statusCode = 404;
  response.write(
    JSON.stringify({
      status: 404,
      message: "404 Data Not found",
    })
  );
  response.end();
});

server.listen(port, "127.0.0.1", () => console.log(`Server listen at http://localhost:${port}`));
