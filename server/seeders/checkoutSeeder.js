const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://puzpuzpugazh:Z08klSRZHzmOFnsU@ecommercecluster.ze8cjup.mongodb.net/?retryWrites=true&w=majority&appName=eCommerceCluster';

const sampleCheckoutData = {
  // Sample User
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },

  // Sample Products (if they don't exist)
  products: [
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 129.99,
      stock: 50,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
      category: 'Electronics',
      brand: 'AudioTech'
    },
    {
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitor',
      price: 199.99,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
      category: 'Electronics',
      brand: 'FitTech'
    },
    {
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable organic cotton t-shirt in various colors',
      price: 29.99,
      stock: 100,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
      category: 'Clothing',
      brand: 'EcoWear'
    }
  ],

  // Sample Orders
  orders: [
    {
      orderItems: [
        {
          name: 'Wireless Bluetooth Headphones',
          price: 129.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
        },
        {
          name: 'Smart Fitness Watch',
          price: 199.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
        }
      ],
      shippingAddress: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      paymentMethod: 'credit_card',
      itemsPrice: 329.98,
      taxPrice: 26.40,
      shippingPrice: 9.99,
      totalPrice: 366.37,
      isPaid: true,
      paidAt: new Date(),
      isDelivered: false,
      status: 'processing'
    },
    {
      orderItems: [
        {
          name: 'Organic Cotton T-Shirt',
          price: 29.99,
          quantity: 3,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
        }
      ],
      shippingAddress: {
        street: '789 Pine Street',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      paymentMethod: 'debit_card',
      itemsPrice: 89.97,
      taxPrice: 7.20,
      shippingPrice: 5.99,
      totalPrice: 103.16,
      isPaid: true,
      paidAt: new Date(Date.now() - 86400000), // 1 day ago
      isDelivered: true,
      deliveredAt: new Date(),
      status: 'delivered'
    }
  ],

  // Sample Payments
  payments: [
    {
      amount: 366.37,
      currency: 'USD',
      paymentMethod: 'credit_card',
      cardDetails: {
        last4: '4242',
        brand: 'visa',
        expiryMonth: '12',
        expiryYear: '2025'
      },
      status: 'completed',
      processedAt: new Date()
    },
    {
      amount: 103.16,
      currency: 'USD',
      paymentMethod: 'debit_card',
      cardDetails: {
        last4: '5555',
        brand: 'mastercard',
        expiryMonth: '08',
        expiryYear: '2026'
      },
      status: 'completed',
      processedAt: new Date(Date.now() - 86400000) // 1 day ago
    }
  ]
};

async function seedCheckoutData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({ email: sampleCheckoutData.user.email });
    await Order.deleteMany({});
    await Payment.deleteMany({});
    console.log('Cleared existing data');

    // Create or find user
    let user = await User.findOne({ email: sampleCheckoutData.user.email });
    if (!user) {
      user = await User.create(sampleCheckoutData.user);
      console.log('Created user:', user.email);
    }

    // Create products if they don't exist
    const products = [];
    for (const productData of sampleCheckoutData.products) {
      let product = await Product.findOne({ name: productData.name });
      if (!product) {
        product = await Product.create(productData);
        console.log('Created product:', product.name);
      }
      products.push(product);
    }

    // Create orders
    const orders = [];
    for (const orderData of sampleCheckoutData.orders) {
      // Link products to order items
      const orderItemsWithProducts = orderData.orderItems.map((item, index) => ({
        ...item,
        product: products[index] ? products[index]._id : products[0]._id
      }));

      const order = await Order.create({
        ...orderData,
        user: user._id,
        orderItems: orderItemsWithProducts
      });
      orders.push(order);
      console.log('Created order:', order._id);
    }

    // Create payments
    for (let i = 0; i < sampleCheckoutData.payments.length; i++) {
      const paymentData = sampleCheckoutData.payments[i];
      const order = orders[i];
      
      const payment = await Payment.create({
        ...paymentData,
        orderId: order._id,
        userId: user._id,
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      });
      console.log('Created payment:', payment.transactionId);
    }

    console.log('\n✅ Sample checkout data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`- User: ${user.name} (${user.email})`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Orders: ${orders.length}`);
    console.log(`- Payments: ${sampleCheckoutData.payments.length}`);

    console.log('\n🔍 Sample Data Details:');
    console.log('\n1. Order #1 (Processing):');
    console.log(`   - Items: ${sampleCheckoutData.orders[0].orderItems.map(item => `${item.name} x${item.quantity}`).join(', ')}`);
    console.log(`   - Total: $${sampleCheckoutData.orders[0].totalPrice}`);
    console.log(`   - Payment: ${sampleCheckoutData.payments[0].cardDetails.brand.toUpperCase()} ****${sampleCheckoutData.payments[0].cardDetails.last4}`);
    console.log(`   - Status: ${sampleCheckoutData.orders[0].status}`);

    console.log('\n2. Order #2 (Delivered):');
    console.log(`   - Items: ${sampleCheckoutData.orders[1].orderItems.map(item => `${item.name} x${item.quantity}`).join(', ')}`);
    console.log(`   - Total: $${sampleCheckoutData.orders[1].totalPrice}`);
    console.log(`   - Payment: ${sampleCheckoutData.payments[1].cardDetails.brand.toUpperCase()} ****${sampleCheckoutData.payments[1].cardDetails.last4}`);
    console.log(`   - Status: ${sampleCheckoutData.orders[1].status}`);

    console.log('\n💳 Test Payment Cards:');
    console.log('1. Visa: 4242 4242 4242 4242 (Exp: 12/25, CVV: 123)');
    console.log('2. Mastercard: 5555 5555 5555 4444 (Exp: 08/26, CVV: 123)');
    console.log('3. Amex: 3782 822463 10005 (Exp: 12/25, CVV: 1234)');

    console.log('\n🏠 Test Shipping Addresses:');
    console.log('1. 456 Oak Avenue, Los Angeles, CA 90210, USA');
    console.log('2. 789 Pine Street, Chicago, IL 60601, USA');

  } catch (error) {
    console.error('Error seeding checkout data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeder
seedCheckoutData(); 