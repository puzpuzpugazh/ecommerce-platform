@echo off
echo 🚀 Starting E-commerce Platform Deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [SUCCESS] Node.js is installed: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [SUCCESS] npm is installed: 
npm --version

REM Install dependencies
echo [INFO] Installing dependencies...
call npm run install-all
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

REM Build the application
echo [INFO] Building the application...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build application
    pause
    exit /b 1
)
echo [SUCCESS] Application built successfully

REM Check if .env file exists
if not exist "server\.env" (
    echo [WARNING] .env file not found in server directory
    echo [INFO] Creating .env.example...
    (
        echo # Database Configuration
        echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true^&w=majority
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=your_super_secret_jwt_key_here
        echo.
        echo # Environment
        echo NODE_ENV=production
        echo.
        echo # Port ^(optional^)
        echo PORT=5000
        echo.
        echo # CORS Origin ^(for production^)
        echo CORS_ORIGIN=https://yourdomain.com
        echo.
        echo # Rate Limiting ^(optional^)
        echo RATE_LIMIT_WINDOW_MS=900000
        echo RATE_LIMIT_MAX_REQUESTS=100
    ) > server\.env.example
    echo [SUCCESS] Created .env.example file
    echo [WARNING] Please create a .env file with your actual values before deploying
)

REM Check if git is initialized
if not exist ".git" (
    echo [INFO] Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo [SUCCESS] Git repository initialized
    echo [WARNING] Please add a remote origin: git remote add origin ^<your-repo-url^>
) else (
    echo [SUCCESS] Git repository already exists
)

echo.
echo [INFO] Deployment Options:
echo 1. Vercel ^(Recommended - Easiest^)
echo 2. Heroku
echo 3. DigitalOcean App Platform
echo 4. AWS Elastic Beanstalk
echo 5. Manual deployment instructions

set /p choice="Choose your deployment option (1-5): "

if "%choice%"=="1" (
    echo [INFO] Deploying to Vercel...
    echo [INFO] Please follow these steps:
    echo 1. Go to https://vercel.com
    echo 2. Sign up with your GitHub account
    echo 3. Click 'New Project'
    echo 4. Import your repository
    echo 5. Add environment variables:
    echo    - MONGODB_URI
    echo    - JWT_SECRET
    echo    - NODE_ENV=production
    echo 6. Click 'Deploy'
) else if "%choice%"=="2" (
    echo [INFO] Deploying to Heroku...
    echo [INFO] Please run these commands:
    echo heroku create your-app-name
    echo heroku addons:create mongolab:sandbox
    echo heroku config:set NODE_ENV=production
    echo heroku config:set JWT_SECRET=your_jwt_secret_key
    echo git push heroku main
) else if "%choice%"=="3" (
    echo [INFO] Deploying to DigitalOcean App Platform...
    echo [INFO] Please follow these steps:
    echo 1. Go to https://cloud.digitalocean.com/apps
    echo 2. Create a new app
    echo 3. Connect your GitHub repository
    echo 4. Configure build settings:
    echo    - Build Command: npm run build
    echo    - Run Command: npm start
    echo 5. Add environment variables
    echo 6. Deploy
) else if "%choice%"=="4" (
    echo [INFO] Deploying to AWS Elastic Beanstalk...
    echo [INFO] Please follow these steps:
    echo 1. Install AWS CLI and EB CLI
    echo 2. Run: eb init
    echo 3. Run: eb create production
    echo 4. Configure environment variables
    echo 5. Run: eb deploy
) else if "%choice%"=="5" (
    echo [INFO] Manual deployment instructions:
    echo 1. Set up your hosting platform
    echo 2. Configure environment variables
    echo 3. Set up MongoDB Atlas database
    echo 4. Deploy your code
    echo 5. Run database seeders
    echo 6. Test your application
) else (
    echo [ERROR] Invalid option
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Deployment script completed!
echo [INFO] Next steps:
echo 1. Set up your MongoDB Atlas database
echo 2. Configure environment variables
echo 3. Deploy your application
echo 4. Seed your database with sample data
echo 5. Test all features

echo [INFO] For detailed instructions, see DEPLOYMENT_GUIDE.md

echo.
echo [SUCCESS] 🎉 Your e-commerce platform is ready for deployment!
pause 