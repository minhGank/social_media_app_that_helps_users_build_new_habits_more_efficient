const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const app = express();
const { readdirSync, read } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// cors will only allow the http request from the ip adrress/server that you allow
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// read the route
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connects successfully"))
  .catch((err) => console.log("error mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is listening");
});
