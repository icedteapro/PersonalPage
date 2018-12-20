const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const emailRoutes = require("./routes/sendEmail");
const registerRoutes = require("./routes/registerAccount");
var cors = require('cors');
const app = express();

 mongoose.connect("mongodb+srv://namht:11052194@icedteaproject-ljqty.gcp.mongodb.net/personalpage",{ useNewUrlParser: true }).then(() =>{
   console.log('Connected to database');
 }).catch(() => {
   console.log('Connect to database Failed. Please check Whitelist in MongoDB');
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let corsOptions = {
  origin: 'http://localhost:4200',
  exposedHeaders: ['Access-Control-Allow-Headers', 'Origin', 'X-Requested-With','Content-Type','Accept','Authorization'],
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

// app.use((res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use("/api/sendEmail/", emailRoutes);
app.use("/api/user/", registerRoutes);

module.exports = app;
