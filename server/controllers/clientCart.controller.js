const db = require("../database-mysql");

//create op
const addCart = (req, res) => {
  const { client_id } = req.body;
  const query = `INSERT INTO clientcart (client_id, created_at, updated_at) VALUES (?, NOW(), NOW())`;
  db.query(query, [client_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).send({ msg: 'Cart added successfully!' });
  });
};


//read all op
const getAllCarts = (req, res) => {
  const query = "SELECT * FROM clientcart";
  db.query(query, (err, carts) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(carts);
  });
};


//read 1 op
const getCartById = (req, res) => {
  const { cart_id } = req.params;
  const query = "SELECT * FROM clientcart WHERE cart_id = ?";
  db.query(query, [cart_id], (err, cart) => {
    if (err) res.status(500).send(err);
    else if (cart.length) res.status(200).send(cart[0]);
    else res.status(404).send({ msg: 'Cart not found!' });
  });
};


//update op
const updateCart = (req, res) => {
  const { cart_id } = req.params;
  const { client_id } = req.body;
  const query = `UPDATE clientcart SET client_id = ?, updated_at = NOW() WHERE cart_id = ?`;
  db.query(query, [client_id, cart_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Cart updated successfully!' });
  });
};


//delete op
const deleteCart = (req, res) => {
  const { cart_id } = req.params;
  const query = `DELETE FROM clientcart WHERE cart_id = ?`;
  db.query(query, [cart_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Cart deleted successfully!' });
  });
};


module.exports = { addCart, getAllCarts, getCartById, updateCart, deleteCart };
