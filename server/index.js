const express = require("express");
const itemRoutes = require('./routes/item.routes')
const path = require('path');


const db = require('./database-mysql');

const app = express();
const PORT = process.env.PORT || 3001


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));


// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.use("/", itemRoutes);

app.listen(PORT, function () {
  console.log("listening on port 3001!");
});
