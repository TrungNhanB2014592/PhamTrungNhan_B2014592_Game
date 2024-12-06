const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST a new review
router.post('/reviews', async (req, res) => {
  const { productId, rating, comment } = req.body;

  // Validate rating
  if (rating < 1 || rating > 5) {
    return res.status(400).send({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const review = new Review({
      productId,
      rating,
      comment
    });

    await review.save();
    res.status(201).send({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(500).send({ message: 'Error submitting review', error });
  }
});

// GET all reviews for a specific product
router.get('/reviews/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching reviews', error });
  }
});

module.exports = router;
