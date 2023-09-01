const db = require("../database-mysql");

//create op
const addCartItem = (req, res) => {
  const { cart_id, product_id, quantity, totalCost } = req.body;
  const query = `INSERT INTO clientCartItemRoutes (cart_id, product_id, quantity, totalCost) VALUES (?, ?, ?, ?)`;
  db.query(query, [cart_id, product_id, quantity, totalCost], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).send({ msg: 'Cart item added successfully!' });
  });
};


//read all op
const getAllCartItems = (req, res) => {
  const query = "SELECT * FROM clientCartItemRoutes";
  db.query(query, (err, items) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(items);
  });
};


//get 1 op
const getCartItemById = (req, res) => {
  const { cart_item_id } = req.params;
  const query = "SELECT * FROM clientCartItemRoutes WHERE cart_item_id = ?";
  db.query(query, [cart_item_id], (err, item) => {
    if (err) res.status(500).send(err);
    else if (item.length) res.status(200).send(item[0]);
    else res.status(404).send({ msg: 'Cart item not found!' });
  });
};


//update op
const updateCartItem = (req, res) => {
  const { cart_item_id } = req.params;
  const { cart_id, product_id, quantity, totalCost } = req.body;
  const query = `UPDATE clientCartItemRoutes SET cart_id = ?, product_id = ?, quantity = ?, totalCost = ? WHERE cart_item_id = ?`;
  db.query(query, [cart_id, product_id, quantity, totalCost, cart_item_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Cart item updated successfully!' });
  });
};


//delete op
const deleteCartItem = (req, res) => {
  const { cart_item_id } = req.params;
  const query = `DELETE FROM clientCartItemRoutes WHERE cart_item_id = ?`;
  db.query(query, [cart_item_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Cart item deleted successfully!' });
  });
};


module.exports = { addCartItem, getAllCartItems, getCartItemById, updateCartItem, deleteCartItem };
