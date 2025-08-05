import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Star, 
  Gift,
  Truck,
  Shield,
  ArrowLeft,
  Tag,
  X,
  Trash2
} from 'lucide-react';
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, totalItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) return;
    dispatch(updateQuantity({ productId: id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    navigate('/shipping');
  };

  const applyCoupon = () => {
    // Mock coupon logic
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 0.1 });
      toast.success('Coupon applied successfully!');
    } else if (couponCode.toLowerCase() === 'welcome20') {
      setAppliedCoupon({ code: 'WELCOME20', discount: 0.2 });
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  const subtotal = totalPrice;
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - discount + shipping) * 0.1;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Shopping</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* <div className="relative">
                  <ShoppingCart className="h-8 w-8 text-pink-600" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </div> */}
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  <ShoppingCart size={'2rem'} className="h-8 w-8 text-pink-600" /> Shopping Cart
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="bg-white rounded-3xl shadow-xl p-16 max-w-md mx-auto py-8">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingCart className="h-16 w-16 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-10 text-lg">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                <ShoppingCart className="h-6 w-6" />
                Start Shopping
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enhanced Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
                    </div>
                    {cartItems.length > 0 && (
                      <button
                        onClick={handleClearCart}
                        className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 font-medium"
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                <div className="divide-y divide-gray-100 py-8">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-8 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="flex gap-6">
                        {/* Enhanced Product Image */}
                        <div className="relative group">
                          <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gray-200 group-hover:border-pink-300 transition-all duration-200">
                            <img
                              src={item.image || item.images?.[0] || '/placeholder.png'}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Enhanced Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <Link 
                              to={`/product/${item._id}`}
                              className="text-xl font-bold text-gray-900 hover:text-pink-600 transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                          </div>
                          
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm font-semibold text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                              {item.category}
                            </span>
                            {item.brand && (
                              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {item.brand}
                              </span>
                            )}
                          </div>

                          {/* Enhanced Rating */}
                          <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-5 w-5 fill-current ${
                                    star <= Math.round(item.averageRating || 0) 
                                      ? 'text-yellow-400' 
                                      : 'text-gray-200'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 font-medium">
                              ({item.numReviews || 0} reviews)
                            </span>
                          </div>

                          {/* Enhanced Price and Quantity */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                                <button
                                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-6 py-3 text-center min-w-[4rem] font-bold text-lg">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                  disabled={item.quantity >= (item.stock || item.countInStock)}
                                  className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  style={{ marginRight: '20px'}}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <span className="text-sm text-gray-500 font-medium">
                                {item.stock || item.countInStock} available
                              </span>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">
                                ${item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl sticky top-8"
              >
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Order Summary</h3>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Enhanced Coupon Code */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Have a coupon code?
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        {/* <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter code"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                        />
                      </div>
                      <button
                        onClick={applyCoupon}
                        disabled={!couponCode.trim()}
                        className="px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedCoupon && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex items-center justify-between bg-green-50 border-2 border-green-200 rounded-2xl p-4"
                      >
                        <span className="text-green-700 font-semibold">
                          {appliedCoupon.code} applied (-{(appliedCoupon.discount * 100)}%)
                        </span>
                    <button
                          onClick={removeCoupon}
                          className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded-full transition-colors"
                    >
                          <X className="h-5 w-5" />
                    </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Enhanced Price Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-700 text-lg">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600 text-lg">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span className="font-semibold">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-gray-700 text-lg">
                      <span>Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-700 text-lg">
                      <span>Tax</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>

                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between text-2xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Benefits */}
                  <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Truck className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">{shipping === 0 ? 'Free shipping applied' : 'Free shipping on orders $50+'}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Secure checkout guaranteed</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Gift className="h-4 w-4 text-purple-600" />
                </div>
                      <span className="font-medium">30-day return policy</span>
                </div>
                </div>

                  {/* Enhanced Checkout Button */}
                <button
                  onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-5 px-6 rounded-2xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-xl"
                >
                  Proceed to Checkout
                </button>

                  {/* Enhanced Continue Shopping */}
                  <Link
                    to="/products"
                    className="block w-full text-center border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 text-lg"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default Cart;