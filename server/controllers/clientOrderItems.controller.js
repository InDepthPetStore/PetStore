const db = require("../database-mysql");

//create op
const addOrderItem = (req, res) => {
  const { order_id, product_id, quantity, totalCost } = req.body;
  const query = `INSERT INTO clientOrderItem (order_id, product_id, quantity, totalCost) VALUES (?, ?, ?, ?)`;
  db.query(query, [order_id, product_id, quantity, totalCost], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).send({ msg: 'Order item added successfully!' });
  });
};


//get all op
const getAllOrderItems = (req, res) => {
  const query = "SELECT * FROM clientOrderItem";
  db.query(query, (err, orderItems) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(orderItems);
  });
};


//get 1 op
const getOrderItemById = (req, res) => {
  const { order_item_id } = req.params;
  const query = "SELECT * FROM clientOrderItem WHERE order_item_id = ?";
  db.query(query, [order_item_id], (err, orderItem) => {
    if (err) res.status(500).send(err);
    else if (orderItem.length) res.status(200).send(orderItem[0]);
    else res.status(404).send({ msg: 'Order item not found!' });
  });
};


//update op
const updateOrderItem = (req, res) => {
  const { order_item_id } = req.params;
  const { order_id, product_id, quantity, totalCost } = req.body;
  const query = `UPDATE clientOrderItem SET order_id = ?, product_id = ?, quantity = ?, totalCost = ? WHERE order_item_id = ?`;
  db.query(query, [order_id, product_id, quantity, totalCost, order_item_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Order item updated successfully!' });
  });
};


//delete op
const deleteOrderItem = (req, res) => {
  const { order_item_id } = req.params;
  const query = `DELETE FROM clientOrderItem WHERE order_item_id = ?`;
  db.query(query, [order_item_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Order item deleted successfully!' });
  });
};


module.exports = { addOrderItem, getAllOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem };
