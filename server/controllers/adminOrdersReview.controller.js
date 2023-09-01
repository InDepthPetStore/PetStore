const db = require("../database-mysql");

//create op
const createReview = (req, res) => {
  const {order_id, status, notes } = req.body;
  const query = `INSERT INTO adminordersreview (order_id, status, notes) VALUES (?, ?, ?)`;
  db.query(query, [order_id, status, notes], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ msg: 'Review added successfully!' });
  });
};


//get All reviews op
const getAllReviews = (req, res) => {
  const query = "SELECT * FROM adminordersreview";
  db.query(query, (err, reviews) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(reviews);
  });
};


//get 1 review op
const getSingleReview = (req, res) => {
    const review_id = req.params.id;
    const query = "SELECT * FROM adminordersreview WHERE review_id = ?";
    db.query(query, [review_id], (err, review) => {
      if (err) return res.status(500).send(err);
      if (review.length === 0) return res.status(404).send({ msg: 'Review not found!' });
      res.status(200).send(review[0]);
    });
  };
 
  
//update op
const updateReview = (req, res) => {
    const review_id = req.params.id;
    const { order_id, status, notes } = req.body;
    const query = "UPDATE adminordersreview SET order_id = ?, status = ?, notes = ? WHERE review_id = ?";
    db.query(query, [order_id, status, notes, review_id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ msg: 'Review updated successfully!' });
    });
  };
 
  
//delete op
const deleteReview = (req, res) => {
    const review_id = req.params.id;
    const query = "DELETE FROM adminordersreview WHERE review_id = ?";
    db.query(query, [review_id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ msg: 'Review deleted successfully!' });
    });
  };


  module.exports = {createReview, getAllReviews,getSingleReview, updateReview, deleteReview };
  