const db = require("../database-mysql");

//creat op
const createCategory = (req, res) => {
    const { category_name, description } = req.body; 
    const query = `INSERT INTO admincategories (category_name, description) VALUES (?, ?)`;
    db.query(query, [category_name, description], (err, results) => {
      if (err) res.status(500).send(err);
      else res.status(201).send({ msg: 'Category added successfully!' });
    });
  };


//get everything op

  const getAllCategories = (req, res) => {
    db.query("SELECT * FROM admincategories", (err, categories) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(categories);
    });
  };


// get by id only op
  const getCategoryById = (req, res) => {
    const categoryId = req.params.id;
    db.query("SELECT * FROM admincategories WHERE category_id = ?", [categoryId], (err, category) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(category);
    });
  };


//update op
  const updateCategory = (req, res) => {
    const { category_name, description } = req.body;
    const categoryId = req.params.id;
    const query = "UPDATE admincategories SET category_name = ?, description = ? WHERE category_id = ?";
    db.query(query, [category_name, description, categoryId], (err, results) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ msg: 'Category updated successfully!' });
    });
  };


//delete op
  const deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    db.query("DELETE FROM admincategories WHERE category_id = ?", [categoryId], (err, results) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ msg: 'Category deleted successfully!' });
    });
  };

  
  module.exports = {createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory};
