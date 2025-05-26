import { createServer } from "https";
import { parse } from "url";
import { readFileSync } from "fs";
import next from "next";


const port = 3000   //Specify a free port
const ip = "192.0.0.0" //Add your current IP

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync("./ssl/key.pem"),
  cert: readFileSync("./ssl/cert.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, ip, (err) => {  // Change here to listen on all interfaces
    if (err) throw err;
    console.log("> Server running at "+ "https://" + ip + ":" + port);
      });
});
