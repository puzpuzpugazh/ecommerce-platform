import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Loader,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Eye,
  Package,
  Clock,
  CheckCircle,
  Star as StarIcon
} from 'lucide-react';
import { getProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, isError, message } = useSelector((state) => state.product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(0);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 1) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 1) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Free Shipping',
      description: 'On orders above $50'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: <RotateCcw className="h-6 w-6" />,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: 'Fast Delivery',
      description: '2-3 business days'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-pink-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
            <p className="text-red-600 text-lg">{message || 'Product not found.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-pink-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-pink-600 transition-colors">Products</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-gray-50 to-gray-100">
                {product.images && product.images[selectedImage] ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-gray-400 text-lg">No Image Available</span>
                  </div>
                )}
                
                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={`relative h-24 bg-white rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-pink-500 shadow-lg'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Product Header */}
            <div>
              {/* Category & Brand */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="text-sm text-gray-500">• {product.brand}</span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 fill-current ${
                          star <= Math.round(product.averageRating || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>
                <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                  Write a review
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price ? product.price.toFixed(2) : '0.00'}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full font-medium">
                      {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-medium">In Stock</span>
                    <span className="text-gray-500">({product.stock} available)</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-5 w-5 text-red-500" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= (product.stock || 1)}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock === 0}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5" />
                {!product.stock || product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              
              <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="text-pink-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'specifications', label: 'Specifications' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'shipping', label: 'Shipping & Returns' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-pink-500 text-pink-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || 'No description available for this product.'}
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Product Details</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Category</dt>
                        <dd className="font-medium">{product.category}</dd>
                      </div>
                      {product.brand && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Brand</dt>
                          <dd className="font-medium">{product.brand}</dd>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Stock</dt>
                        <dd className="font-medium">{product.stock} units</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">SKU</dt>
                        <dd className="font-medium">{product._id}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Customer Reviews</h4>
                      <p className="text-gray-600">Based on {product.numReviews || 0} reviews</p>
                    </div>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                      Write a Review
                    </button>
                  </div>
                  
                  <div className="text-center py-12">
                    <StarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Shipping Information</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Free shipping on orders above $50</li>
                      <li>• Standard delivery: 2-3 business days</li>
                      <li>• Express delivery: 1-2 business days (additional fee)</li>
                      <li>• International shipping available</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Return Policy</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 30-day return policy</li>
                      <li>• Free returns for defective items</li>
                      <li>• Return shipping label provided</li>
                      <li>• Full refund or exchange available</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;