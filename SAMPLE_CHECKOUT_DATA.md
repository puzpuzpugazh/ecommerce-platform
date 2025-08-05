# Sample Checkout Data Documentation

## Overview
This document contains all the sample checkout data that has been added to the database for testing the e-commerce platform.

## 📊 Database Summary
- **User**: 1 (John Doe)
- **Products**: 3 (Electronics & Clothing)
- **Orders**: 2 (Processing & Delivered)
- **Payments**: 2 (Completed transactions)

---

## 👤 Sample User
```
Name: John Doe
Email: john.doe@example.com
Password: password (hashed)
Address: 123 Main Street, New York, NY 10001, USA
```

---

## 🛍️ Sample Products

### 1. Wireless Bluetooth Headphones
- **Price**: $129.99
- **Stock**: 50
- **Category**: Electronics
- **Brand**: AudioTech
- **Description**: High-quality wireless headphones with noise cancellation
- **Image**: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500

### 2. Smart Fitness Watch
- **Price**: $199.99
- **Stock**: 30
- **Category**: Electronics
- **Brand**: FitTech
- **Description**: Advanced fitness tracking with heart rate monitor
- **Image**: https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500

### 3. Organic Cotton T-Shirt
- **Price**: $29.99
- **Stock**: 100
- **Category**: Clothing
- **Brand**: EcoWear
- **Description**: Comfortable organic cotton t-shirt in various colors
- **Image**: https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500

---

## 📦 Sample Orders

### Order #1 (Processing)
- **Order ID**: `6892030320e6a003ff81195e`
- **Items**:
  - Wireless Bluetooth Headphones x1 ($129.99)
  - Smart Fitness Watch x1 ($199.99)
- **Subtotal**: $329.98
- **Tax**: $26.40
- **Shipping**: $9.99
- **Total**: $366.37
- **Payment Method**: Credit Card
- **Status**: Processing
- **Shipping Address**: 456 Oak Avenue, Los Angeles, CA 90210, USA
- **Payment Status**: Paid
- **Delivery Status**: Not Delivered

### Order #2 (Delivered)
- **Order ID**: `6892030320e6a003ff811962`
- **Items**:
  - Organic Cotton T-Shirt x3 ($89.97)
- **Subtotal**: $89.97
- **Tax**: $7.20
- **Shipping**: $5.99
- **Total**: $103.16
- **Payment Method**: Debit Card
- **Status**: Delivered
- **Shipping Address**: 789 Pine Street, Chicago, IL 60601, USA
- **Payment Status**: Paid
- **Delivery Status**: Delivered

---

## 💳 Sample Payments

### Payment #1 (Order #1)
- **Transaction ID**: `TXN_1754399491686_69KD2VP99`
- **Amount**: $366.37
- **Currency**: USD
- **Payment Method**: Credit Card
- **Card Details**:
  - Brand: Visa
  - Last 4 digits: 4242
  - Expiry: 12/2025
- **Status**: Completed
- **Processed At**: Current timestamp

### Payment #2 (Order #2)
- **Transaction ID**: `TXN_1754399491778_66GV3D34Q`
- **Amount**: $103.16
- **Currency**: USD
- **Payment Method**: Debit Card
- **Card Details**:
  - Brand: Mastercard
  - Last 4 digits: 5555
  - Expiry: 08/2026
- **Status**: Completed
- **Processed At**: 1 day ago

---

## 🧪 Test Payment Cards

### For Testing Checkout Process
Use these test card numbers in the payment form:

1. **Visa**
   - Number: 4242 4242 4242 4242
   - Expiry: 12/25
   - CVV: 123
   - Expected Result: Payment Success

2. **Mastercard**
   - Number: 5555 5555 5555 4444
   - Expiry: 08/26
   - CVV: 123
   - Expected Result: Payment Success

3. **American Express**
   - Number: 3782 822463 10005
   - Expiry: 12/25
   - CVV: 1234
   - Expected Result: Payment Success

4. **Declined Card** (for testing failure scenarios)
   - Number: 4000 0000 0000 0002
   - Expiry: 12/25
   - CVV: 123
   - Expected Result: Payment Failed

---

## 🏠 Test Shipping Addresses

### Address #1
```
Street: 456 Oak Avenue
City: Los Angeles
State: CA
Zip Code: 90210
Country: USA
```

### Address #2
```
Street: 789 Pine Street
City: Chicago
State: IL
Zip Code: 60601
Country: USA
```

---

## 🔧 How to Use This Data

### 1. Login with Sample User
```
Email: john.doe@example.com
Password: password
```

### 2. View Existing Orders
- Navigate to "My Orders" page
- You'll see 2 orders with different statuses

### 3. Test Checkout Process
1. Add products to cart
2. Go to shipping page
3. Use one of the test addresses
4. Use one of the test payment cards
5. Complete the checkout

### 4. Test Payment Scenarios
- **Success**: Use Visa, Mastercard, or Amex test cards
- **Failure**: Use the declined card number
- **Validation**: Try invalid card numbers, expired dates, or wrong CVV

---

## 📱 API Endpoints for Testing

### Get User Orders
```
GET /api/orders/myorders
Authorization: Bearer <user_token>
```

### Get Order Details
```
GET /api/orders/:orderId
Authorization: Bearer <user_token>
```

### Create New Order
```
POST /api/orders
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "product_id",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "456 Oak Avenue",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90210",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

### Process Payment
```
POST /api/payments/process
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "orderId": "order_id",
  "paymentMethod": "credit_card",
  "cardDetails": {
    "number": "4242424242424242",
    "expiryMonth": "12",
    "expiryYear": "2025",
    "cvv": "123"
  }
}
```

---

## 🎯 Testing Scenarios

### 1. Complete Checkout Flow
- Add items to cart
- Fill shipping address
- Complete payment
- Verify order creation
- Check order status

### 2. Payment Testing
- Test successful payments
- Test failed payments
- Test card validation
- Test different card types

### 3. Order Management
- View order history
- Check order details
- Track order status
- View payment information

### 4. Error Handling
- Invalid payment details
- Insufficient stock
- Network errors
- Validation errors

---

## 📝 Notes

- All sample data is created with realistic values
- Payment cards are test numbers and won't charge real money
- Orders have different statuses to test various scenarios
- User credentials are safe for testing
- Data can be reset by running the seeder script again

---

## 🔄 Resetting Sample Data

To reset or recreate the sample data, run:
```bash
cd server
node seeders/checkoutSeeder.js
```

This will clear existing data and create fresh sample records. 