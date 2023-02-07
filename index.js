const express = require("express");
const request = require("request");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/vercel", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/video", (req, res) => {
  request
    .get({
      url: "http://tiki-camera-ip.kbvision.tv:3333/cgi-bin/mjpg/video.cgi?subtype=1",
      timeout: 100000000,
      auth: {
        user: "admin",
        pass: "P@ssword321",
        sendImmediately: false,
        auth: {
          qop: "auth",
          algorithm: "md5",
          realm: "video stream server",
          nonce: "unique-nonce-value",
        },
      },
    })
    .on("response", function (response) {
      res.set(
        "Content-Type",
        "multipart/x-mixed-replace; boundary=--myboundary"
      );
      response.pipe(res);
    });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
});

module.exports = app;
