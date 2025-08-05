import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ShoppingBag,
  Heart,
  Send,
  Gift,
  Shield,
  Truck,
  CreditCard,
  Star,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>
      
      <div className="relative z-10 py-8">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Gift className="h-8 w-8 text-white mr-3" />
                <h3 className="text-2xl lg:text-3xl font-bold text-white">Stay In The Loop</h3>
              </div>
              <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and special offers!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1 relative">
                  {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/20 backdrop-blur-sm text-white placeholder-pink-200"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold gradient-text">ShopHub</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Your premier destination for quality products and exceptional shopping experiences. We're committed to bringing you the latest trends with unbeatable prices and customer service.
                </p>
                
                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="text-sm">Secure Shopping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Truck className="h-5 w-5 text-blue-400" />
                    <span className="text-sm">Fast Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Heart className="h-5 w-5 text-red-400" />
                    <span className="text-sm">Customer Love</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                    { icon: Twitter, color: 'hover:bg-blue-400', label: 'Twitter' },
                    { icon: Instagram, color: 'hover:bg-pink-600', label: 'Instagram' },
                    { icon: Linkedin, color: 'hover:bg-blue-700', label: 'LinkedIn' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-200 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/products", label: "All Products" },
                  { to: "/products?category=electronics", label: "Electronics" },
                  { to: "/products?category=fashion", label: "Fashion" },
                  { to: "/products?category=beauty", label: "Beauty" },
                  { to: "/products?sortBy=popular", label: "Best Sellers" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3 list-none p-0 m-0">
                {[
                  { to: "/help", label: "Help Center" },
                  { to: "/my-orders", label: "Track Your Order" },
                  { to: "/contact", label: "Contact Support" },
                  { to: "/faq", label: "FAQ" },
                  { to: "/returns", label: "Returns & Refunds" },
                  { to: "/size-guide", label: "Size Guide" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-pink-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      123 Commerce Avenue<br />
                      Shopping District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-pink-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">+1 (555) 123-SHOP</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-pink-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">hello@shophub.com</span>
                </div>
                
                {/* Customer Rating */}
                <div className="bg-gray-800 rounded-xl p-4 mt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-white text-sm font-semibold">4.9/5</span>
                  </div>
                  <p className="text-gray-300 text-xs">Rated by 50,000+ customers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0"
            >
              <div className="text-center lg:text-left">
                <h4 className="text-white font-semibold mb-2">We Accept</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300 text-sm">All Major Cards</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300 text-sm">SSL Secured</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="flex flex-wrap justify-center lg:justify-end gap-2 text-gray-400 text-sm">
                  💳 Visa • MasterCard • PayPal • Apple Pay • Google Pay
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 bg-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-gray-400 text-sm text-center lg:text-left">
                © {currentYear} ShopHub. All rights reserved. Made with <Heart className="h-4 w-4 text-red-400 inline mx-1" /> for shoppers.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
                <Link
                  to="/accessibility"
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                >
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 