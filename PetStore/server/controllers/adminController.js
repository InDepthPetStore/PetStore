const pool = require("../database-mysql");

  const createProduct = async(req, res) => {
  const { image, name, category, price, stock } = req.body;
  const sql = 'INSERT INTO products (image, name, category, price, stock) VALUES (?, ?, ?, ?, ?)';
  if (!image || !name || !category || !price || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const [existingUser] = await pool.query('SELECT * FROM products WHERE name = ?', [name]);

    if (existingUser.length > 0) {
      return res.status(401).json({ message: "Product already exists" });
    }

    const [result] = await pool.query(sql, [image, name, category, price, stock]) 
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ message: 'Failed to insert product' });
  }
};
  
const getAllProducts = async(req, res) => {
  const query = `SELECT * FROM products`
  try {const [result] = await pool.query(query)
    res.status(200).json(result)}
    catch (error) {
      console.error('Error fetching', error);
      res.status(500).json({ message: 'Failed to get products' });
    }
}

const getCategory = async (req, res) => {
  const {category} = req.params
  const query = `SELECT * FROM products WHERE category = ?`;
  try {const [result] = await pool.query(query,[category])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error fetching', error);
      res.status(500).json({ message: 'Failed to get products' });
    }
}


const updateProduct = async(req, res) => {
  const { idproduct } = req.params;
  const { image, name, category, price, stock} = req.body;
  const query = `UPDATE products SET image = ?, name = ?, category = ?, price = ?, stock = ? WHERE idproduct = ?`;
  try {const [result] = await pool.query(query, [image, name, category, price, stock, idproduct])
    res.status(200).json({ message: 'Product updated successfully' });
  } 
    catch (error) {
      console.error('Error updating', error);
      res.status(500).json({ message: 'Failed to update product' });
    }
}
 

const deleteProduct = async(req, res) => {
  const { idproduct } = req.params;
  const query = `DELETE FROM products WHERE idproduct = ?`;
  try {const [result] = await pool.query(query,[idproduct])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error deleting', error);
      res.status(500).json({ message: 'Failed to delete product' });
    }
}

const getAllOrders = async(req, res) => {
  const query = `SELECT * FROM orders`
  try {const [result] = await pool.query(query)
    res.status(200).json(result)}
    catch (error) {
      console.error('Error fetching', error);
      res.status(500).json({ message: 'Failed to get orders' });
    }
}

const getState = async (req, res) => {
  const {state} = req.params
  const query = `SELECT * FROM orders WHERE state = ?`;
  try {const [result] = await pool.query(query,[state])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error fetching', error);
      res.status(500).json({ message: 'Failed to get orders' });
    }
}

const updateS = async (req, res) => {
  const {idorder,state} = req.params
  const query = 'UPDATE orders SET state= ? WHERE idorder=?';
  try {const [result] = await pool.query(query,[idorder,state])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error updating', error);
      res.status(500).json({ message: 'Failed to update state' });
    }
}

module.exports = { createProduct, updateProduct, deleteProduct ,getAllProducts,getCategory,getAllOrders, getState, updateS}

