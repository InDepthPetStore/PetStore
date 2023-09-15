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

  module.exports = { rememberId, addcartproduct, cart, deleteP}
