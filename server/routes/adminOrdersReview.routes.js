const router = require('express').Router();
const reviewController = require("../controllers/adminOrdersReview.controller");

router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getSingleReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);



module.exports = router;
