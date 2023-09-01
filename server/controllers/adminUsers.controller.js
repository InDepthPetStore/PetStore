const db = require("../database-mysql");

//create op
const createAdminUser = (req, res) => {
  const { username, email, password } = req.body;
  const query = `INSERT INTO adminUsers (username, email, password) VALUES (?, ?, ?)`;
  db.query(query, [username, email, password], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).send({ msg: 'Admin user created successfully!' });
  });
};


//get all op
const getAllAdminUsers = (req, res) => {
  const query = "SELECT * FROM adminUsers";
  db.query(query, (err, users) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(users);
  });
};


//read 1 op
const getAdminUserById = (req, res) => {
  const { admin_id } = req.params;
  const query = "SELECT * FROM adminUsers WHERE admin_id = ?";
  db.query(query, [admin_id], (err, user) => {
    if (err) res.status(500).send(err);
    else if (user.length) res.status(200).send(user[0]);
    else res.status(404).send({ msg: 'Admin user not found!' });
  });
};


//update op
const updateAdminUser = (req, res) => {
  const { admin_id } = req.params;
  const { username, email, password } = req.body;
  const query = `UPDATE adminUsers SET username = ?, email = ?, password = ? WHERE admin_id = ?`;
  db.query(query, [username, email, password, admin_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Admin user updated successfully!' });
  });
};


//delete op
const deleteAdminUser = (req, res) => {
  const { admin_id } = req.params;
  const query = `DELETE FROM adminUsers WHERE admin_id = ?`;
  db.query(query, [admin_id], (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({ msg: 'Admin user deleted successfully!' });
  });
};


module.exports = { createAdminUser, getAllAdminUsers, getAdminUserById, updateAdminUser, deleteAdminUser };
