const express = require('express');
const router = express.Router();

const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  markHelpful,
  getAllReviews,
  updateReviewStatus
} = require('../controllers/reviewController');

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/product/:productId', getProductReviews);

// Protected routes
router.use(protect);

router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.post('/:id/helpful', markHelpful);

// Admin routes
router.get('/', authorize('admin'), getAllReviews);
router.put('/:id/status', authorize('admin'), updateReviewStatus);

module.exports = router; 