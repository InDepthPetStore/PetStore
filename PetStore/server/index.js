require("dotenv").config()
const express = require("express");
const path = require('path');
const pool = require('./database-mysql');
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");
const cookieParser = require("cookie-parser");


const app = express();
const PORT = process.env.PORT || 3001

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));


app.use("/auth", require('./routes/authRoutes'));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/client", require("./routes/clientRoutes"));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist', 'index.html'));
});


// pool.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Connected to MySQL!')

//   }
// });
app.listen(PORT, function () {
  console.log("listening on port 3001!");
});