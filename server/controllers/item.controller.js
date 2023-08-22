const db = require("../database-mysql");

// UNCOMMENT IF USING MYSQL WITH CALLBACKS
const selectAll = function (req, res) {
  db.query("SELECT * FROM items", (err, items, fields) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(items);
    }
  });
};

module.exports = { selectAll };
