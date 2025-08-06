# 🛍️ E-commerce Platform

A modern, full-stack e-commerce platform built with React, Node.js, and MongoDB. Features a beautiful, responsive UI with complete user authentication, product management, shopping cart, and payment processing capabilities.

## ✨ Features

### 🎨 Frontend
- Modern, responsive design
- Product catalog with advanced filtering
- Shopping cart and checkout system
- User authentication and profile management
- Order tracking and history
- Mobile-first responsive design

### 🔧 Backend
- RESTful API architecture
- JWT authentication and authorization
- Product and order management
- Payment processing integration
- Database integration with MongoDB
- Security middleware and validation

### 🗄️ Database
- MongoDB with Mongoose ODM
- User management and authentication
- Product catalog and inventory
- Order processing and tracking
- Payment transaction history

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ecommerce-platform
   ```

2. **Install dependencies:**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp server/env.example server/.env
   
   # Edit server/.env with your configuration
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
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
npm run seed             # Seed database with sample data

# Installation
npm run install-all      # Install all dependencies
```

## 🛠️ Tech Stack

### Frontend
- React 18
- Redux Toolkit
- React Router
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Development Tools
- ESLint
- Nodemon
- Concurrently

## 🚀 Deployment

### Quick Deployment
1. **Run the deployment script:**
   ```bash
   # Windows
   deploy.bat
   
   # Linux/Mac
   ./deploy.sh
   ```

2. **Choose your deployment platform:**
   - Vercel (Recommended)
   - Heroku
   - DigitalOcean
   - AWS

### Manual Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔧 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Required
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Optional
PORT=5000
```

## 🔒 Security Features

- JWT Authentication
- Password encryption
- Input validation
- Security headers
- CORS protection
- Rate limiting
- Environment variable protection

## 📱 Key Features

### User Features
- User registration and authentication
- Product browsing and search
- Advanced filtering and sorting
- Shopping cart management
- Secure checkout process
- Order history and tracking
- User profile management

### Admin Features
- Product management
- Order management
- User management
- Dashboard analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and troubleshooting:
1. Check the [deployment guide](./DEPLOYMENT_GUIDE.md)
2. Verify your environment variables
3. Test locally first
4. Check the troubleshooting section

---

**Built with ❤️ using modern web technologies** 