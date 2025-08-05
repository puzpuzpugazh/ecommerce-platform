const express = require('express');
const router = express.Router();

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  moveToCart
} = require('../controllers/wishlistController');

const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.delete('/', clearWishlist);
router.post('/:productId/move-to-cart', moveToCart);

module.exports = router; 