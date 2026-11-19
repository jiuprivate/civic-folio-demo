import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../index.html", import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  const pathname = request.url?.split("?")[0];
  if (!["/", "/index.html", "/Civic-Folio.html"].includes(pathname)) {
    response
      .writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
      .end("Page not found.");
    return;
  }
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  response.end(request.method === "HEAD" ? undefined : page);
}).listen(port, host, () => console.log("Open http://" + host + ":" + port));
