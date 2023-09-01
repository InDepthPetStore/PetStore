const db = require("../database-mysql");

//create op
const addUser = (req, res) => {
  const { username, email, password, phone_number, address } = req.body;
  const query = `INSERT INTO clientUsers (username, email, password, phone_number, address) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [username, email, password, phone_number, address], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).send({ msg: 'User added successfully!' });
  });
};


//get all op
const getAllUsers = (req, res) => {
  const query = "SELECT * FROM clientUsers";
  db.query(query, (err, users) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(users);
  });
};


//get 1 op
const getUserById = (req, res) => {
  const { client_id } = req.params;
  const query = "SELECT * FROM clientUsers WHERE client_id = ?";
  db.query(query, [client_id], (err, user) => {
    if (err) res.status(500).send(err);
    else if (user.length) res.status(200).send(user[0]);
    else res.status(404).send({ msg: 'User not found!' });
  });
};


//update op
const updateUser = (req, res) => {
  const { client_id } = req.params;
  const { username, email, password, phone_number, address } = req.body;
  const query = `UPDATE clientUsers SET username = ?, email = ?, password = ?, phone_number = ?, address = ? WHERE client_id = ?`;
  db.query(query, [username, email, password, phone_number, address, client_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'User updated successfully!' });
  });
};


//delete op
const deleteUser = (req, res) => {
  const { client_id } = req.params;
  const query = `DELETE FROM clientUsers WHERE client_id = ?`;
  db.query(query, [client_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'User deleted successfully!' });
  });
};


module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser };
