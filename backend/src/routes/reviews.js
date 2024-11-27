const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// Tạo đánh giá mới
router.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lấy tất cả đánh giá của sản phẩm
router.get('/reviews/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
