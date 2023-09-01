const db = require("../database-mysql");

//create op
const addOrder = (req, res) => {
  const { client_id, total_price, shipping_address, status } = req.body;
  const query = `INSERT INTO clientOrders (client_id, total_price, shipping_address, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
  db.query(query, [client_id, total_price, shipping_address, status], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).send({ msg: 'Order added successfully!' });
  });
};


//get all op
const getAllOrders = (req, res) => {
  const query = "SELECT * FROM clientOrders";
  db.query(query, (err, orders) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(orders);
  });
};


//get 1 op
const getOrderById = (req, res) => {
  const { order_id } = req.params;
  const query = "SELECT * FROM clientOrders WHERE order_id = ?";
  db.query(query, [order_id], (err, order) => {
    if (err) res.status(500).send(err);
    else if (order.length) res.status(200).send(order[0]);
    else res.status(404).send({ msg: 'Order not found!' });
  });
};

//update op
const updateOrder = (req, res) => {
  const { order_id } = req.params;
  const { client_id, total_price, shipping_address, status } = req.body;
  const query = `UPDATE clientOrders SET client_id = ?, total_price = ?, shipping_address = ?, status = ?, updated_at = NOW() WHERE order_id = ?`;
  db.query(query, [client_id, total_price, shipping_address, status, order_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Order updated successfully!' });
  });
};


  //delete op
const deleteOrder = (req, res) => {
  const { order_id } = req.params;
  const query = `DELETE FROM clientOrders WHERE order_id = ?`;
  db.query(query, [order_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Order deleted successfully!' });
  });
};


module.exports = { addOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
