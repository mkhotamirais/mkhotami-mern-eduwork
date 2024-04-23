const express = require("express");
const { port, rootPath } = require("./config/constants");
const app = express();
const { log } = require("console");
const db = require("./config");
const { join } = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { corsOptions, credentials } = require("./config/cred");

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(rootPath, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("halo");
});

app.use("/api/mkhotami-eduwork/auth", require("./routes/authRoute"));
app.use("/api/mkhotami-eduwork/user", require("./routes/userRoute"));
app.use("/api/mkhotami-eduwork/category", require("./routes/categoryRoute"));
app.use("/api/mkhotami-eduwork/tag", require("./routes/tagRoute"));
app.use("/api/mkhotami-eduwork/product", require("./routes/productRoute"));
app.use("/api/mkhotami-eduwork/cart", require("./routes/cartRoute"));
app.use("/api/mkhotami-eduwork/address", require("./routes/addressRoute"));

db.then(() => {
  log(`connect to mongodb`);
  app.listen(port, () => log(`app is listening on port ${port}`));
}).catch((err) => log(err.message));
