const db = require("../database-mysql");

//create op
const createProduct = (req, res) => {
  const {product_name, description, price, stock_quantity, image_url, category_id, created_at, updated_at} = req.body;

  const query = `INSERT INTO adminProducts (product_name, description, price, stock_quantity, image_url, category_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(query, [product_name, description, price, stock_quantity, image_url, category_id, created_at, updated_at], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).send({ msg: 'Product added successfully!' });
  });
};


//get all products op
const getAllProducts = (req, res) => {
  const query = `SELECT * FROM adminProducts`;

  db.query(query, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).json(results);
  });
};


//get a single product by ID op
const getProductById = (req, res) => {
  const { product_id } = req.params;
  const query = `SELECT * FROM adminProducts WHERE product_id = ?`;

  db.query(query, [product_id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).json(result);
  });
};


//update op
const updateProduct = (req, res) => {
  const { product_id } = req.params;
  const { product_name, description, price, stock_quantity, image_url, category_id, updated_at } = req.body;

  const query = `UPDATE adminProducts SET product_name = ?, description = ?, price = ?, stock_quantity = ?, image_url = ?, category_id = ? WHERE product_id = ?`;

  db.query(query, [product_name, description, price, stock_quantity, image_url, category_id, product_id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Product updated successfully!' });
  });
};


//delete op
const deleteProduct = (req, res) => {
  const { product_id } = req.params;
  const query = `DELETE FROM adminProducts WHERE product_id = ?`;

  db.query(query, [product_id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Product deleted successfully!' });
  });
};


module.exports ={ createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};