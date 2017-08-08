"use strict";

const express = require("express");
const path = require("path");

const publicPath = path.join(__dirname, "./../public/");
console.log(publicPath);

const PORT = process.env.PORT || 3000;

let app = express();
app.use(express.static(publicPath));

app.get("/", (req, res, next) => {
  res.sendFile("index.html");
});



app.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}`);
});


