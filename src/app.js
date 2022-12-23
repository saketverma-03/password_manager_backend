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

app.use("/api", userRoutes); //->Authantication Routes
app.use("/api", passwordRoutes); //->Authantication Routes

let dbUrl = "mongodb://mongo:6xSoqVg3nYQrYsdfI9zb@containers-us-west-189.railway.app:7489"
db.connect(process.env.DB_URL || dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true
}).then(() => {
  console.log("[Mongoose] Connected to DataBase");
}).catch(error => console.log(error));

app.
listen(process.env.PORT || 8080,() => console.log("[app][Express] Server Started"));