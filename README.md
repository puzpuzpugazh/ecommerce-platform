# 🛍️ E-commerce Platform

A modern, full-stack e-commerce platform built with React, Node.js, and MongoDB. Features a beautiful UI inspired by Nykaa, complete with user authentication, product management, shopping cart, and dummy payment processing.

## ✨ Features

### 🎨 Frontend (React)
- **Modern UI/UX**: Beautiful, responsive design inspired by Nykaa
- **Product Catalog**: Browse 47+ products across 7 categories
- **Advanced Filtering**: Search, category, price, and brand filters
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Login, register, and profile management
- **Order Management**: View order history and track orders
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🔧 Backend (Node.js/Express)
- **RESTful API**: Complete API for all e-commerce operations
- **JWT Authentication**: Secure user authentication and authorization
- **Product Management**: CRUD operations for products
- **Order Processing**: Complete order lifecycle management
- **Dummy Payment System**: Simulated payment processing
- **Database Integration**: MongoDB with Mongoose ODM

### 🗄️ Database (MongoDB)
- **47+ Sample Products**: Diverse product catalog across categories
- **User Management**: Secure user data storage
- **Order Tracking**: Complete order and payment history
- **Product Categories**: Electronics, Clothing, Home & Garden, Beauty, Sports, Books, Toys

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ecommerce-platform.git
   cd ecommerce-platform
   ```

2. **Install dependencies:**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp server/.env.example server/.env
   
   # Edit server/.env with your MongoDB URI and JWT secret
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   npm run seed-checkout
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run server           # Start backend only
npm run client           # Start frontend only

# Production
npm run build            # Build frontend for production
npm start                # Start production server

# Database
npm run seed             # Seed products database
npm run seed-checkout    # Seed checkout data

# Installation
npm run install-all      # Install all dependencies
npm run install-client   # Install frontend dependencies
npm run install-server   # Install backend dependencies
```

## 🗄️ Database Schema

### Products
- Name, description, price, compare price
- Images, category, brand, SKU
- Stock, weight, dimensions
- Tags, active status, featured status

### Users
- Name, email, password (hashed)
- Address, phone, role
- Created date, profile data

### Orders
- User reference, order items
- Shipping address, payment method
- Order status, total amount
- Created date, payment details

### Payments
- Order reference, transaction ID
- Payment method, amount
- Status, card details (encrypted)
- Created date

## 🎯 Sample Data

The platform comes with 47+ sample products across 7 categories:

### Electronics (11 products)
- iPhone 15 Pro, MacBook Air M2, Sony WH-1000XM5
- iPad Air, PlayStation 5, DJI Mini 3 Pro Drone
- GoPro Hero 11, Bose QuietComfort 45, Samsung QLED TV

### Clothing (7 products)
- Nike Air Max 270, Levi's 501 Jeans, Adidas Ultraboost
- Uniqlo Jacket, H&M T-Shirt, Zara Blazer, Converse Chuck Taylor

### Home & Garden (6 products)
- Instant Pot, IKEA Bed Frame, Philips Hue Smart Bulbs
- KitchenAid Mixer, Dyson Vacuum, Cuisinart Coffee Maker

### Beauty (6 products)
- L'Oreal Skincare Set, Dyson Airwrap, La Mer Cream
- Oral-B Toothbrush, MAC Lipstick, Foreo Luna

### Sports (6 products)
- Yoga Mat, Peloton Bike+, Fitbit Versa 4
- Bowflex Dumbbells, Wilson Tennis Racket, Nike Shorts

### Books (6 products)
- The Great Gatsby, Atomic Habits, The Alchemist
- Kindle Paperwhite, Harry Potter Collection, Subtle Art

### Toys (5 products)
- LEGO Millennium Falcon, Nintendo Switch OLED
- Monopoly, Hot Wheels Garage, Barbie Dreamhouse

## 🚀 Deployment

### Quick Deployment (Recommended)

1. **Run the deployment script:**
   ```bash
   # Windows
   deploy.bat
   
   # Linux/Mac
   ./deploy.sh
   ```

2. **Choose your deployment platform:**
   - **Vercel** (Recommended - Easiest)
   - Heroku
   - DigitalOcean App Platform
   - AWS Elastic Beanstalk

### Manual Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔧 Environment Variables

```env
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production

# Optional
PORT=5000
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin requests

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands

## 📱 Features Overview

### User Features
- ✅ User registration and login
- ✅ Product browsing and search
- ✅ Advanced filtering and sorting
- ✅ Shopping cart management
- ✅ Secure checkout process
- ✅ Order history and tracking
- ✅ User profile management
- ✅ Responsive mobile design

### Admin Features
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ User management
- ✅ Dashboard analytics

### Technical Features
- ✅ JWT authentication
- ✅ Password encryption
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting
- ✅ Security headers
- ✅ CORS configuration
- ✅ Database indexing

## 🎨 Design Features

- **Modern UI**: Clean, professional design
- **Responsive**: Works on all devices
- **Accessible**: WCAG compliant
- **Fast Loading**: Optimized performance
- **Smooth Animations**: Framer Motion
- **Consistent Styling**: Tailwind CSS
- **Professional Icons**: Lucide React

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs encryption
- **Input Validation**: Express Validator
- **Security Headers**: Helmet middleware
- **CORS Protection**: Cross-origin security
- **Rate Limiting**: API abuse prevention
- **Environment Variables**: Secure configuration

## 📊 Performance Features

- **Database Indexing**: Fast queries
- **Image Optimization**: Responsive images
- **Code Splitting**: Lazy loading
- **Caching**: Static asset caching
- **Compression**: Gzip compression
- **CDN Ready**: Static asset delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting section](./DEPLOYMENT_GUIDE.md#troubleshooting)
2. Review the [deployment guide](./DEPLOYMENT_GUIDE.md)
3. Check your environment variables
4. Verify database connection
5. Test locally first

## 🎉 Demo Credentials

### Sample User Account
- **Email**: john.doe@example.com
- **Password**: password123

### Sample Checkout Data
See [SAMPLE_CHECKOUT_DATA.md](./SAMPLE_CHECKOUT_DATA.md) for test payment details.

---

## 🚀 Ready to Deploy?

Your e-commerce platform is ready for production! Follow the deployment guide to get your store online.

**Happy selling! 🛍️** 