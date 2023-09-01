//const db = require("../database-mysql");

// UNCOMMENT IF USING MYSQL WITH CALLBACKS
//const selectAll = function (req, res) {
  //db.query("SELECT * FROM items", (err, items, fields) => {
    //if (err) {
      //res.status(500).send(err);
    //} else {
      //res.status(200).send(items);
    //}
  //});
//};

//const insertItem = function (req, res) {
  //const {}= req.body;
  //const queryString = "INSERT INTO items () VALUES (?,?)";

  //db.query(queryString,[], (err, result)=>{
    //if (err) {
      //res.status(500).send(err);
    //} else {
      //res.status(201).send(result);
   // }
 // });
//};

/*const updateItem = function(req, res) {
  const {}= req.body;
  const queryString = "UPDATE items SET WHERE id=?";

  db.query(queryString, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

const deleteItem = function (req, res) {
  const {id} = req.body;
  const queryString = "DELETE FROM items WHERE id = ?";

  db.query(queryString, [id], (err, result) => {
    if (err){
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports = { selectAll, insertItem, updateItem, deleteItem };*/
