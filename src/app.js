const express = require("express");
const db = require("mongoose");
// const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();

const userRoutes = require("./routes/user");
const passwordRoutes = require("./routes/password");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRoutes); //->Authantication Routes
app.use("/api/password", passwordRoutes); //->Authantication Routes

let dbUrl = "";
db.connect(process.env.DB_URL)
  .then(() => {
    console.log("[Mongoose] Connected to DataBase");
  })
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () =>
  console.log(`[app][Express]: Server Started at port [${process.env.PORT}]`)
);
