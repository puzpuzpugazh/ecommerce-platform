import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart, 
  Bell, 
  ChevronDown, 
  Package, 
  LogOut 
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-lg border-b border-gray-100' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🛍️</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium text-sm"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium text-sm"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium text-sm"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium text-sm"
            >
              Contact
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium text-sm"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 text-sm"
                />
                                 <button
                   type="submit"
                   className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                 >
                   <Search size={16}  />
                 </button>
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Toggle (Mobile/Tablet) */}
            <button
              onClick={handleSearchToggle}
              className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist (Hidden on small mobile) */}
            <button 
              className="hidden sm:flex p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 relative rounded-lg hover:bg-gray-100"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              <span
                className="absolute -top-1 -right-1 bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium border-2 border-white shadow"
                style={{
                  boxShadow: '0 0 0 2px #fff, 0 2px 8px 0 rgba(236, 72, 153, 0.3)',
                  background: 'linear-gradient(135deg, #ec4899 0%, #a21caf 100%)',
                  color: '#fff',
                  width:'16px',
                  height:'16px'
                }}
              >
                0
              </span>
            </button>

            {/* Notifications (Hidden on small mobile) */}
            <button 
              className="hidden sm:flex p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 relative rounded-lg hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
              style={{
                boxShadow: '0 0 0 2px #fff, 0 2px 8px 0 rgba(236, 72, 153, 0.3)',
                background: 'linear-gradient(135deg, #ec4899 0%, #a21caf 100%)',
                color: '#fff',
                width:'16px',
                height:'16px'
              }}>
                2
              </span>
            </button>

            {/* Cart (Button style for consistency) */}
            <button
              type="button"
              onClick={() => { window.location.href = "/cart"; }}
              className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 rounded-lg hover:bg-gray-100 flex items-center"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                style={{
                  boxShadow: '0 0 0 2px #fff, 0 2px 8px 0 rgba(236, 72, 153, 0.3)',
                  background: 'linear-gradient(135deg, #ec4899 0%, #a21caf 100%)',
                  color: '#fff',
                  width:'16px',
                  height:'16px'
                }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* User Menu */}            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                  aria-label="User menu"
                >
                  {/* User Icon */}
                  <span>
                    {user && user.name ? (
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-bold text-base">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <User size={20} color="#a21caf" />
                    )}
                  </span>
                  {/* User Name */}
                  {/* <span className="hidden md:block font-medium text-sm max-w-24 truncate">{user.name}</span> */}
                  {/* Chevron Icon */}
                  <span className="hidden sm:block">
                    <ChevronDown 
                      size={14} 
                      color="#a21caf"
                      className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                    />
                  </span>
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {/* Profile Icon */}
                        <span>
                          <User size={16} color="#a21caf" />
                        </span>
                        <span className="text-sm">Profile</span>
                      </Link>
                      <Link
                        to="/my-orders"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {/* Orders Icon */}
                        <span>
                          <Package size={16} color="#a21caf" />
                        </span>
                        <span className="text-sm">My Orders</span>
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                        >
                          {/* Logout Icon */}
                          <span>
                            <LogOut size={16} color="#a21caf" />
                          </span>
                          <span className="text-sm">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium text-sm px-2 py-1 rounded-lg hover:bg-gray-100 flex items-center gap-1"
                >
                  {/* Always show User icon for login */}
                  <span>
                    <User size={20} color="#a21caf" />
                  </span>
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl flex items-center gap-1"
                >
                  {/* Register icon for mobile */}
                  <span className="sm:hidden">
                    <User size={20} color="#fff" />
                  </span>
                  <span className="hidden sm:inline">Register</span>
                  <span className="sm:hidden">Join</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-100"
            >
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50"
                  />
                                     <button
                     type="submit"
                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                   >
                     <Search size={18} />
                   </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        {isMobile && (
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="py-6 border-t border-gray-100 bg-white"
              >
              <nav className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                                 )}
               </nav>
             </motion.div>
           )}
         </AnimatePresence>
       )}
      </div>
    </header>
  );
};

export default Header; 