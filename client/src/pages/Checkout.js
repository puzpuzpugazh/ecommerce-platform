import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Lock,
  Truck,
  Shield,
  ArrowLeft,
  Edit,
  Package,
  Clock
} from 'lucide-react';
import DummyPaymentForm from '../components/payment/DummyPaymentForm';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { cartItems, shippingAddress } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    if (!cartItems || cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    
    if (!shippingAddress) {
      navigate('/shipping');
      return;
    }
  }, [user, cartItems, shippingAddress, navigate]);

  // Create order when component mounts
  useEffect(() => {
    if (user && cartItems && cartItems.length > 0 && shippingAddress) {
      createOrder();
    }
  }, [user, cartItems, shippingAddress]);

  const createOrder = async () => {
    try {
      setIsLoading(true);
      
      // Check if user has a token
      if (!user || !user.token) {
        toast.error('Authentication required. Please log in again.');
        navigate('/login', { state: { from: '/checkout' } });
        return;
      }

      // Check if shipping address has all required fields
      const requiredFields = ['street', 'city', 'state', 'zipCode', 'country'];
      const missingFields = requiredFields.filter(field => !shippingAddress[field]);
      
      if (missingFields.length > 0) {
        toast.error(`Missing shipping information: ${missingFields.join(', ')}`);
        navigate('/shipping');
        return;
      }

      // Debug: Log cart items structure
      console.log('Cart items structure:', cartItems);
      console.log('Cart items with _id:', cartItems.map(item => ({ _id: item._id, quantity: item.quantity })));
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          orderItems: cartItems.map(item => ({
            product: item._id,
            quantity: item.quantity
          })),
          shippingAddress,
          paymentMethod: 'credit_card'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOrder(data.data);
      } else {
        const errorMessage = data.message || data.errors?.[0]?.msg || 'Failed to create order';
        toast.error(errorMessage);
        console.error('Order creation failed:', data);
        console.error('Validation errors:', data.errors);
        console.error('Request data sent:', {
          orderItems: cartItems.map(item => ({
            product: item._id,
            quantity: item.quantity
          })),
          shippingAddress,
          paymentMethod: 'credit_card'
        });
        navigate('/cart');
      }
    } catch (error) {
      console.error('Create order error:', error);
      toast.error('Failed to create order');
      navigate('/cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentStatus('success');
    toast.success('Payment successful! Your order has been placed.');
    
    // Clear cart
    dispatch({ type: 'cart/clearCart' });
    
    // Redirect to order success page
    setTimeout(() => {
      navigate('/order-success', { 
        state: { 
          orderId: order._id,
          transactionId: paymentData.transactionId 
        } 
      });
    }, 2000);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus('error');
    toast.error(error || 'Payment failed. Please try again.');
  };

  if (!user || !cartItems || cartItems.length === 0 || !shippingAddress) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Creating your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/cart')}
                className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Cart</span>
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">SSL Encrypted</span>
              </div>
            </div>
            <div className="w-32"> {/* Spacer */}</div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center text-green-600">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium">Cart</span>
            </div>
            <div className="flex-1 h-0.5 bg-green-600"></div>
            <div className="flex items-center text-green-600">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>
            <div className="flex-1 h-0.5 bg-green-600"></div>
            <div className="flex items-center text-pink-600">
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Order Summary - Left Side */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Order Items */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-6 h-6 text-pink-600" />
                      <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                    </div>
                    <span className="text-sm text-gray-500">
                      {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {order.orderItems.map((item, index) => (
        <motion.div
                      key={index} 
                      initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 flex items-center gap-4"
                    >
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                        />
                        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-pink-600" />
                    <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                  </div>
                  <button 
                    onClick={() => navigate('/shipping')}
                    className="flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-gray-700 space-y-1">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p>{shippingAddress.street}</p>
                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                    <p>{shippingAddress.country}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span>Estimated delivery: 2-3 business days</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Order is Protected</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                      <p className="text-xs text-gray-500">SSL Encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Protected Delivery</p>
                      <p className="text-xs text-gray-500">Damage covered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Satisfaction Guaranteed</p>
                      <p className="text-xs text-gray-500">30-day returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Payment Section - Right Side */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-8 space-y-6"
            >
              {/* Order Totals */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({order.orderItems.length} items)</span>
                    <span>${order.itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>${order.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              {paymentStatus === 'success' ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
                  <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="animate-pulse flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Redirecting to order confirmation...</p>
                  </div>
                </div>
              ) : paymentStatus === 'error' ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Payment Failed</h2>
                  <p className="text-gray-600 mb-6">Please try again with different payment details.</p>
                  <button
                    onClick={() => setPaymentStatus(null)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-pink-600" />
                      <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">All transactions are secure and encrypted</p>
                  </div>
                  <div className="p-6">
                    <DummyPaymentForm
                      order={order}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  </div>
                </div>
              )}
        </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 