const pool = require("../database-mysql");


const addcartproduct = async(req, res) => {
  const {p_image, p_name, quantity, cost, cart_idcart, cart_clients_idclient,products_idproduct} = req.body;
  const sql = 'INSERT INTO cp ( p_image, p_name, quantity, cost, cart_idcart, cart_clients_idclient, products_idproduct) VALUES (?,  ? , ? , ? , ? , ? , ?)';
  if (!p_image || !p_name || !quantity || !cost || !cart_idcart || !cart_clients_idclient ||!products_idproduct) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  try {
    const [existingProduct] = await pool.query('SELECT * FROM cp WHERE products_idproduct = ? AND cart_clients_idclient = ?', [products_idproduct, cart_clients_idclient]);

    if (existingProduct.length > 0) {
      return res.status(401).json({ message: "Product already exists" });
    }
    const [result] = await pool.query(sql, [p_image, p_name, quantity, cost, cart_idcart, cart_clients_idclient, products_idproduct]) 
    console.log(result)
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
};

const cart = async(req,res) =>{
  const {cart_idcart} = req.params
  try {
    const [elements] = await pool.query('SELECT * FROM cp WHERE cart_idcart = ?', [cart_idcart])
    res.status(200).json(elements)}
    catch (error) {
      console.error('Error fetching', error);
      res.status(500).json({ message: 'Failed to get IDs' });
    }
}

const rememberId = async(req,res) =>{
  const {idclient} = req.params
  try {
    const [ids] = await pool.query('SELECT * FROM cart WHERE clients_idclient = ?', [idclient])
    res.status(200).json(ids)}
    catch (error) {
      console.error('Error fetching', error);
      res.status(500).json({ message: 'Failed to get IDs' });
    }
}

const deleteP = async(req, res) => {

  const { products_idproduct , cart_clients_idclient} = req.params;
  try {const [result] = await pool.query('DELETE FROM cp WHERE products_idproduct = ? AND cart_clients_idclient = ?', [products_idproduct, cart_clients_idclient])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error deleting', error);
      res.status(500).json({ message: 'Failed to delete product' });
    }
}

const updateQ = async(req, res) => {
  const { products_idproduct , cart_clients_idclient} = req.params;
  const {quantity} = req.body;
  const sql = 'UPDATE cp SET quantity = ? WHERE products_idproduct = ? AND cart_clients_idclient = ?';

  try {
    const [existingProduct] = await pool.query('SELECT * FROM products WHERE idproduct = ?', [products_idproduct]);

    if (existingProduct[0].stock < quantity) {
      return res.status(401).json({ message: "quantity is not available" });
    }
    const [result] = await pool.query(sql, [quantity,products_idproduct, cart_clients_idclient]) 
    console.log(result)
    res.status(201).json({ message: 'quantity updated successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to update quantity' });
  }
};

const purchase = async(req, res) => {
  const {clients_idclient} = req.params;
  const { detail, t_cost} = req.body;
  const sql = 'INSERT INTO orders  ( client , idclient, phone , shipping , detail, t_cost, state) VALUES (?,?,  ? , ? , ? , ? , ? )';
  try {
    const [clientD] = await pool.query('SELECT * FROM clients WHERE idclient = ?', [clients_idclient]);
    const [result] = await pool.query(sql, [ clientD[0].fullname, clients_idclient, clientD[0].phone , clientD[0].shipping , detail, t_cost, state="None"]) 
    console.log(result)
    res.status(201).json({ message: 'order added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add order' });
  }
};

const deleteC = async(req, res) => {

  const {cart_clients_idclient} = req.params;
  try {const [result] = await pool.query('DELETE FROM cp WHERE cart_clients_idclient = ?', [cart_clients_idclient])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error deleting', error);
      res.status(500).json({ message: 'Failed to delete cart' });
    }
}
const getAllOrders = async (req, res) => {
  const {idclient} = req.params
  const query = `SELECT * FROM orders WHERE idclient = ?`;
  try {const [result] = await pool.query(query,[idclient])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error fetching', error);
      res.status(500).json({ message: 'Failed to get orders' });
    }
}
const getUser = async (req, res) => {
  const {idclient} = req.params
  const query = `SELECT * FROM clients WHERE idclient = ?`;
  try {const [result] = await pool.query(query,[idclient])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error fetching', error);
      res.status(500).json({ message: 'Failed to get client' });
    }
}

const updateU = async (req, res) => {
  const {idclient} = req.params
  const { phone, shipping}= req.body
  const query = `UPDATE clients Set phone=? , shipping=?  WHERE idclient = ?`;
  try {const [result] = await pool.query(query,[ phone, shipping, idclient])
    res.status(200).json(result)}
    catch (error) {
      console.error('Error updating', error);
      res.status(500).json({ message: 'Failed to update client' });
    }
}
  module.exports = { rememberId, addcartproduct, cart, deleteP, updateQ, purchase, deleteC, getAllOrders, getUser,updateU}