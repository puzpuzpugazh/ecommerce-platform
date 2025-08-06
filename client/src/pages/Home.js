import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield, 
  Loader, 
  ShoppingCart, 
  ArrowRight,
  Sparkles,
  Zap,
  Heart,
  Eye,
  Clock,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { getFeaturedProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    
    // Test API connection
    const testAPI = async () => {
      try {
        const response = await fetch('https://ecommerce-backend-j0xx.onrender.com/api/test');
        const data = await response.json();
        console.log('API Test Result:', data);
      } catch (error) {
        console.error('API Test Error:', error);
      }
    };
    testAPI();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const categories = [
    { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-cyan-500', count: '150+' },
    { name: 'Fashion', icon: '👗', color: 'from-pink-500 to-rose-500', count: '200+' },
    { name: 'Home & Living', icon: '🏠', color: 'from-green-500 to-emerald-500', count: '100+' },
    { name: 'Beauty', icon: '💄', color: 'from-purple-500 to-violet-500', count: '80+' },
    { name: 'Sports', icon: '⚽', color: 'from-orange-500 to-red-500', count: '120+' },
    { name: 'Books', icon: '📚', color: 'from-indigo-500 to-blue-500', count: '90+' }
  ];

  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Fast Delivery',
      description: 'Free shipping on orders above $50 with 2-3 day delivery'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Payments',
      description: '100% secure payment processing with buyer protection'
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Quality Guarantee',
      description: '30-day return policy with quality assurance'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-6">
                <Sparkles className="h-4 w-4 text-pink-500" />
                <span>New Collection Available</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Amazing
                <span className="block gradient-text">Products</span>
                <span className="text-2xl lg:text-3xl font-normal text-gray-600">at Unbeatable Prices</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Shop the latest trends with confidence. Quality products, fast delivery, and exceptional customer service.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Shop Now
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-pink-500 hover:text-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Learn More
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
            
            {/* 
              Purpose: 
              This section provides a quick visual glimpse of featured or trending products on the homepage, 
              enticing users to explore popular items right away. 
              Instead of placeholders, we show actual featured products.
            */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {featuredProducts && featuredProducts.length > 0 ? (
                      featuredProducts.slice(0, 4).map((product) => (
                        <div
                          key={product._id}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 text-center group hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                            {product.images && product.images[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-8 w-8 object-cover rounded"
                              />
                            ) : (
                              <ShoppingBag className="h-6 w-6 text-white" />
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                          <p className="text-sm text-pink-600 font-bold">
                            ${product.price?.toFixed(2)}
                          </p>
                          <Link
                            to={`/product/${product._id}`}
                            className="inline-block mt-2 text-xs text-purple-600 font-medium hover:underline"
                          >
                            View Details
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center text-gray-400 py-8">
                        No featured products available.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose ShopHub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best shopping experience with quality products and excellent service
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-pink-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of products across different categories
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Link to={`/products?category=${category.name.toLowerCase()}`}>
                  <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} Products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out our most popular and trending items
            </p>
          </motion.div>

          {/* Loading/Error States */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin h-12 w-12 text-pink-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading featured products...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                <p className="text-red-600 text-lg">{message || 'Failed to load featured products.'}</p>
              </div>
            </div>
          ) : (!featuredProducts || featuredProducts.length === 0) ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
                <p className="text-gray-600 text-lg">No featured products found.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(featuredProducts || []).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <Link to={`/product/${product._id}`} className="block h-full">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </Link>
                    
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="mb-3">
                      <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Name */}
                    <Link to={`/product/${product._id}`} className="block">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-pink-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 fill-current ${
                              star <= Math.round(product.averageRating || 0) 
                                ? 'text-yellow-400' 
                                : 'text-gray-200'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.numReviews || 0})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.stock || product.stock === 0}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {!product.stock || product.stock === 0 ? (
                        <span>Out of Stock</span>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* View All Products Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" style={{ paddingTop: '0.8rem' }} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mt-4 mb-4">Special Offer</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Get up to 50% off on selected items. Limited time offer!
              </p>
              <Link
                to="/products"
                className="bg-white text-pink-600 px-4 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <Zap className="h-5 w-5" style={{ paddingTop: '0.8rem' }} />
                Shop Sale
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 