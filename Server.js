const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
let session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const { PORT, userJwtSecret } = require("./src/api/services/constant");
const { mongooseConnection } = require("./src/config/connection");
const constant = require("./src/api/services/constant");
const { innitizianingPassport } = require("./src/config/passport");

require('dotenv').config()

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb',extended: true}));

app.use(
  session({
    secret: constant.userJwtSecret,
    resave: true,
    saveUninitialized: false,
    cookie: { expires: 30000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
innitizianingPassport(passport);
app.use(cors());

app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

mongooseConnection();
require("./router")(app);

app.listen(PORT, () => {
  console.log("We are live on " + PORT);
});
