const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    required: true,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'bank_transfer']
  },
  cardDetails: {
    last4: {
      type: String,
      required: true,
      maxlength: 4
    },
    brand: {
      type: String,
      required: true,
      enum: ['visa', 'mastercard', 'amex', 'discover']
    },
    expiryMonth: {
      type: String,
      required: true,
      maxlength: 2
    },
    expiryYear: {
      type: String,
      required: true,
      maxlength: 4
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    required: false
  },
  failureReason: {
    type: String,
    default: null
  },
  processedAt: {
    type: Date,
    default: null
  },
  refundedAt: {
    type: Date,
    default: null
  },
  refundAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate transaction ID before saving
paymentSchema.pre('save', function(next) {
  if (!this.transactionId || this.transactionId === '') {
    this.transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

// Virtual for payment summary
paymentSchema.virtual('paymentSummary').get(function() {
  return {
    transactionId: this.transactionId,
    amount: this.amount,
    currency: this.currency,
    status: this.status,
    cardInfo: `${this.cardDetails.brand.toUpperCase()} ****${this.cardDetails.last4}`,
    processedAt: this.processedAt
  };
});

// Index for better query performance
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ userId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Payment', paymentSchema); 