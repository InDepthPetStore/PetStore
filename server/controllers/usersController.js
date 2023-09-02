const pool = require("../database-mysql");

const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT fullname, email, phone, shipping FROM clients');
    
    if (!users.length) {
      return res.status(400).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
};