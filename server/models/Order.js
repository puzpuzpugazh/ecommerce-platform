const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  image: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'cash_on_delivery']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: Date,
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  trackingNumber: String,
  notes: String
}, {
  timestamps: true
});

// Calculate totals before saving
orderSchema.pre('save', function(next) {
  // Calculate items price
  this.itemsPrice = this.orderItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Calculate tax (assuming 10% tax rate)
  this.taxPrice = this.itemsPrice * 0.1;

  // Calculate shipping (free shipping for orders over $50, otherwise $10)
  this.shippingPrice = this.itemsPrice > 50 ? 0 : 10;

  // Calculate total
  this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice;

  next();
});

// Virtual for order summary
orderSchema.virtual('orderSummary').get(function() {
  return {
    totalItems: this.orderItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: this.itemsPrice,
    tax: this.taxPrice,
    shipping: this.shippingPrice,
    total: this.totalPrice
  };
});

module.exports = mongoose.model('Order', orderSchema); 