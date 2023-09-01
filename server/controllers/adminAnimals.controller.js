const db = require("../database-mysql");

//create op
const adminAnimals = (req, res) => {
    const {animal_name, description, price, image_url, species} = req.body;
    const query = 'INSERT INTO adminanimals (animal_name, description, price, image_url, species, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
    db.query(query, [animal_name, description, price, image_url, species], (err, results) => {
        if (err) res.status(500).send(err);
        else res.status(201).send({ msg: 'Animal added successfully!'});
    });
};

//get op
const getAdminAnimals =(req, res) => {
    db.query("SELECT * FROM adminanimals", (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    });
};

//update op
const updateAdminAnimal = (req, res) => {
    const { animal_name, description, price, image_url, species } = req.body;
    const animal_id = req.params.animal_id;
    const query = `UPDATE adminanimals SET animal_name=?, description=?, price=?, image_url=?, species=?, updated_at=NOW() WHERE animal_id=?`;
    db.query(query, [animal_name, description, price, image_url, species, animal_id], (err, results) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ msg: 'Animal updated successfully!' });
    });
};

//delete op
const deleteAdminAnimal = (req, res) => {
    const animal_id = req.params.animal_id;
    const query = `DELETE FROM adminanimals WHERE animal_id=?`;
    db.query(query, [animal_id], (err, results) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ msg: 'Animal deleted successfully!' });
    });
  };

  module.exports = { adminAnimals, getAdminAnimals, updateAdminAnimal, deleteAdminAnimal };
