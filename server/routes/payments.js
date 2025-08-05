const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, admin } = require('../middleware/auth');
const {
  validatePayment,
  processPayment,
  getPaymentStatus,
  processRefund,
  getAllPayments
} = require('../controllers/paymentController');

const router = express.Router();

// @desc    Validate payment details
// @route   POST /api/payments/validate
// @access  Private
router.post('/validate', protect, [
  body('cardNumber').notEmpty().withMessage('Card number is required'),
  body('expiryMonth').notEmpty().withMessage('Expiry month is required'),
  body('expiryYear').notEmpty().withMessage('Expiry year is required'),
  body('cvv').notEmpty().withMessage('CVV is required')
], validatePayment);

// @desc    Process dummy payment
// @route   POST /api/payments/process
// @access  Private
router.post('/process', protect, [
  body('orderId').isMongoId().withMessage('Valid order ID is required'),
  body('cardNumber').notEmpty().withMessage('Card number is required'),
  body('expiryMonth').notEmpty().withMessage('Expiry month is required'),
  body('expiryYear').notEmpty().withMessage('Expiry year is required'),
  body('cvv').notEmpty().withMessage('CVV is required'),
  body('cardholderName').notEmpty().withMessage('Cardholder name is required')
], processPayment);

// @desc    Get payment status
// @route   GET /api/payments/status/:orderId
// @access  Private
router.get('/status/:orderId', protect, getPaymentStatus);

// @desc    Process refund (dummy)
// @route   POST /api/payments/refund
// @access  Private
router.post('/refund', protect, [
  body('paymentId').isMongoId().withMessage('Valid payment ID is required'),
  body('refundAmount').isFloat({ min: 0 }).withMessage('Valid refund amount is required'),
  body('reason').optional().isString().withMessage('Reason must be a string')
], processRefund);

// @desc    Get all payments (admin)
// @route   GET /api/payments
// @access  Private/Admin
router.get('/', protect, admin, getAllPayments);

module.exports = router; 