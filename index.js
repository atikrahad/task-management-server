const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  console.log(res.send("hellow"));
});

app.listen(port, () => {
  console.log("running with 5000");
});
