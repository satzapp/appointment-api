const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose   = require('./src/db.config');
const routes = require("./src/route");

// db connection
mongoose.connect();

app = express();
app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
app.use(bodyParser.json({ limit: "500mb" }));

// cors
app.use(cors());


// route declarations
app.use("/api", routes);

const server = app.listen(8081, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});

module.exports = server;
