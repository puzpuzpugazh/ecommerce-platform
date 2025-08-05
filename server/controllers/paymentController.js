const Payment = require('../models/Payment');
const Order = require('../models/Order');
const User = require('../models/User');

// Luhn algorithm for credit card validation
const luhnCheck = (cardNumber) => {
  let sum = 0;
  let isEven = false;
  
  // Remove spaces and dashes
  cardNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  // Loop through values starting from the rightmost side
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Validate credit card brand
const getCardBrand = (cardNumber) => {
  cardNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  if (/^4/.test(cardNumber)) return 'visa';
  if (/^5[1-5]/.test(cardNumber)) return 'mastercard';
  if (/^3[47]/.test(cardNumber)) return 'amex';
  if (/^6(?:011|5)/.test(cardNumber)) return 'discover';
  
  return 'unknown';
};

// Validate expiry date
const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  const expMonth = parseInt(month);
  const expYear = parseInt(year);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  if (expMonth < 1 || expMonth > 12) return false;
  
  return true;
};

// Validate CVV
const validateCVV = (cvv, cardBrand) => {
  const cvvLength = cvv.length;
  
  if (cardBrand === 'amex') {
    return cvvLength === 4;
  } else {
    return cvvLength === 3;
  }
};

// Simulate payment processing
const simulatePaymentProcessing = (cardNumber, amount) => {
  // Simulate network delay
  const delay = Math.random() * 2000 + 1000; // 1-3 seconds
  
  // Determine success/failure based on card number
  const lastDigit = parseInt(cardNumber.slice(-1));
  
  // Cards ending with 0-7 succeed, 8-9 fail
  const willSucceed = lastDigit <= 7;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (willSucceed) {
        resolve({
          success: true,
          message: 'Payment processed successfully',
          processingTime: delay
        });
      } else {
        resolve({
          success: false,
          message: 'Payment failed - insufficient funds',
          processingTime: delay
        });
      }
    }, delay);
  });
};

// @desc    Validate payment details
// @route   POST /api/payments/validate
// @access  Private
const validatePayment = async (req, res) => {
  try {
    const { cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    // Basic validation
    if (!cardNumber || !expiryMonth || !expiryYear || !cvv) {
      return res.status(400).json({
        success: false,
        message: 'All payment fields are required'
      });
    }

    // Validate card number format
    if (!/^\d{13,19}$/.test(cardNumber.replace(/\s+/g, '').replace(/-/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card number format'
      });
    }

    // Luhn algorithm validation
    if (!luhnCheck(cardNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card number'
      });
    }

    // Get card brand
    const cardBrand = getCardBrand(cardNumber);
    if (cardBrand === 'unknown') {
      return res.status(400).json({
        success: false,
        message: 'Unsupported card type'
      });
    }

    // Validate expiry date
    if (!validateExpiryDate(expiryMonth, expiryYear)) {
      return res.status(400).json({
        success: false,
        message: 'Card has expired or invalid expiry date'
      });
    }

    // Validate CVV
    if (!validateCVV(cvv, cardBrand)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid CVV'
      });
    }

    res.json({
      success: true,
      message: 'Payment details are valid',
      cardBrand: cardBrand,
      last4: cardNumber.slice(-4)
    });

  } catch (error) {
    console.error('Payment validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during payment validation'
    });
  }
};

// @desc    Process dummy payment
// @route   POST /api/payments/process
// @access  Private
const processPayment = async (req, res) => {
  try {
    const { orderId, cardNumber, expiryMonth, expiryYear, cvv, cardholderName } = req.body;

    // Validate required fields
    if (!orderId || !cardNumber || !expiryMonth || !expiryYear || !cvv || !cardholderName) {
      return res.status(400).json({
        success: false,
        message: 'All payment fields are required'
      });
    }

    // Find the order
    const order = await Order.findById(orderId).populate('user', 'email name');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    // Check if order is already paid
    if (order.isPaid) {
      return res.status(400).json({
        success: false,
        message: 'Order is already paid'
      });
    }

    // Validate payment details
    if (!luhnCheck(cardNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card number'
      });
    }

    const cardBrand = getCardBrand(cardNumber);
    if (cardBrand === 'unknown') {
      return res.status(400).json({
        success: false,
        message: 'Unsupported card type'
      });
    }

    if (!validateExpiryDate(expiryMonth, expiryYear)) {
      return res.status(400).json({
        success: false,
        message: 'Card has expired'
      });
    }

    if (!validateCVV(cvv, cardBrand)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid CVV'
      });
    }

    // Create payment record
    const payment = new Payment({
      orderId: order._id,
      userId: req.user.id,
      amount: order.totalPrice,
      currency: 'USD',
      paymentMethod: 'credit_card',
      cardDetails: {
        last4: cardNumber.slice(-4),
        brand: cardBrand,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear
      },
      status: 'processing'
    });

    await payment.save();

    // Simulate payment processing
    const paymentResult = await simulatePaymentProcessing(cardNumber, order.totalPrice);

    // Update payment status
    if (paymentResult.success) {
      payment.status = 'completed';
      payment.processedAt = new Date();
      
      // Update order
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: payment.transactionId,
        status: 'completed',
        update_time: new Date().toISOString(),
        email_address: order.user.email
      };
      order.status = 'processing';
    } else {
      payment.status = 'failed';
      payment.failureReason = paymentResult.message;
      payment.processedAt = new Date();
    }

    await payment.save();
    await order.save();

    res.json({
      success: paymentResult.success,
      message: paymentResult.message,
      transactionId: payment.transactionId,
      paymentId: payment._id,
      processingTime: paymentResult.processingTime,
      order: order
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during payment processing'
    });
  }
};

// @desc    Get payment status
// @route   GET /api/payments/status/:orderId
// @access  Private
const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const payment = await Payment.findOne({ orderId }).populate('orderId');
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check if user owns the payment
    if (payment.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this payment'
      });
    }

    res.json({
      success: true,
      data: payment.paymentSummary
    });

  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Process refund (dummy)
// @route   POST /api/payments/refund
// @access  Private
const processRefund = async (req, res) => {
  try {
    const { paymentId, refundAmount, reason } = req.body;

    const payment = await Payment.findById(paymentId).populate('orderId');
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check if user owns the payment or is admin
    if (payment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this payment'
      });
    }

    // Check if payment is completed
    if (payment.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment must be completed to process refund'
      });
    }

    // Validate refund amount
    if (refundAmount > payment.amount) {
      return res.status(400).json({
        success: false,
        message: 'Refund amount cannot exceed payment amount'
      });
    }

    // Simulate refund processing
    const refundResult = await simulatePaymentProcessing('1234567890123456', refundAmount);

    if (refundResult.success) {
      payment.status = 'refunded';
      payment.refundAmount = refundAmount;
      payment.refundedAt = new Date();
      payment.failureReason = reason || 'Customer request';

      await payment.save();

      res.json({
        success: true,
        message: 'Refund processed successfully',
        refundAmount: refundAmount,
        transactionId: payment.transactionId
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Refund processing failed'
      });
    }

  } catch (error) {
    console.error('Refund processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during refund processing'
    });
  }
};

// @desc    Get all payments (admin)
// @route   GET /api/payments
// @access  Private/Admin
const getAllPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const payments = await Payment.find(query)
      .populate('orderId', 'orderItems totalPrice')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Payment.countDocuments(query);

    res.json({
      success: true,
      data: payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get all payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  validatePayment,
  processPayment,
  getPaymentStatus,
  processRefund,
  getAllPayments
}; 