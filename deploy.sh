#!/bin/bash

# 🚀 E-commerce Platform Deployment Script
# This script helps you deploy your e-commerce platform

echo "🚀 Starting E-commerce Platform Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version check passed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm is installed: $(npm -v)"

# Install dependencies
print_status "Installing dependencies..."
npm run install-all

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Build the application
print_status "Building the application..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Application built successfully"
else
    print_error "Failed to build application"
    exit 1
fi

# Check if .env file exists
if [ ! -f "server/.env" ]; then
    print_warning ".env file not found in server directory"
    print_status "Creating .env.example..."
    cat > server/.env.example << EOF
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Environment
NODE_ENV=production

# Port (optional)
PORT=5000

# CORS Origin (for production)
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting (optional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF
    print_success "Created .env.example file"
    print_warning "Please create a .env file with your actual values before deploying"
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_status "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    print_success "Git repository initialized"
    print_warning "Please add a remote origin: git remote add origin <your-repo-url>"
else
    print_success "Git repository already exists"
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes"
    read -p "Do you want to commit them? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Update before deployment"
        print_success "Changes committed"
    fi
fi

# Display deployment options
echo
print_status "Deployment Options:"
echo "1. Vercel (Recommended - Easiest)"
echo "2. Heroku"
echo "3. DigitalOcean App Platform"
echo "4. AWS Elastic Beanstalk"
echo "5. Manual deployment instructions"

read -p "Choose your deployment option (1-5): " -n 1 -r
echo

case $REPLY in
    1)
        print_status "Deploying to Vercel..."
        print_status "Please follow these steps:"
        echo "1. Go to https://vercel.com"
        echo "2. Sign up with your GitHub account"
        echo "3. Click 'New Project'"
        echo "4. Import your repository"
        echo "5. Add environment variables:"
        echo "   - MONGODB_URI"
        echo "   - JWT_SECRET"
        echo "   - NODE_ENV=production"
        echo "6. Click 'Deploy'"
        ;;
    2)
        print_status "Deploying to Heroku..."
        if ! command -v heroku &> /dev/null; then
            print_status "Installing Heroku CLI..."
            npm install -g heroku
        fi
        print_status "Please run these commands:"
        echo "heroku create your-app-name"
        echo "heroku addons:create mongolab:sandbox"
        echo "heroku config:set NODE_ENV=production"
        echo "heroku config:set JWT_SECRET=your_jwt_secret_key"
        echo "git push heroku main"
        ;;
    3)
        print_status "Deploying to DigitalOcean App Platform..."
        print_status "Please follow these steps:"
        echo "1. Go to https://cloud.digitalocean.com/apps"
        echo "2. Create a new app"
        echo "3. Connect your GitHub repository"
        echo "4. Configure build settings:"
        echo "   - Build Command: npm run build"
        echo "   - Run Command: npm start"
        echo "5. Add environment variables"
        echo "6. Deploy"
        ;;
    4)
        print_status "Deploying to AWS Elastic Beanstalk..."
        print_status "Please follow these steps:"
        echo "1. Install AWS CLI and EB CLI"
        echo "2. Run: eb init"
        echo "3. Run: eb create production"
        echo "4. Configure environment variables"
        echo "5. Run: eb deploy"
        ;;
    5)
        print_status "Manual deployment instructions:"
        echo "1. Set up your hosting platform"
        echo "2. Configure environment variables"
        echo "3. Set up MongoDB Atlas database"
        echo "4. Deploy your code"
        echo "5. Run database seeders"
        echo "6. Test your application"
        ;;
    *)
        print_error "Invalid option"
        exit 1
        ;;
esac

echo
print_success "Deployment script completed!"
print_status "Next steps:"
echo "1. Set up your MongoDB Atlas database"
echo "2. Configure environment variables"
echo "3. Deploy your application"
echo "4. Seed your database with sample data"
echo "5. Test all features"

print_status "For detailed instructions, see DEPLOYMENT_GUIDE.md"

echo
print_success "🎉 Your e-commerce platform is ready for deployment!" 