import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { orderId, transactionId } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    if (!user || !user.token) {
      navigate('/login');
      return;
    }

    fetchOrderDetails();
  }, [orderId, navigate, user]);

  const fetchOrderDetails = async () => {
    try {
      if (!user || !user.token) {
        console.error('No authentication token available');
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setOrder(data.data);
      } else {
        console.error('Failed to fetch order details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Order not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Order ID:</span> {order._id}</p>
                <p><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </p>
                {transactionId && (
                  <p><span className="font-medium">Transaction ID:</span> {transactionId}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Payment Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Payment Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </p>
                {order.paidAt && (
                  <p><span className="font-medium">Paid Date:</span> {new Date(order.paidAt).toLocaleDateString()}</p>
                )}
                <p><span className="font-medium">Total Amount:</span> ${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Items</h2>
          
          <div className="space-y-4">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-semibold text-gray-900">${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
          
          <div className="text-gray-700">
            <p className="font-medium">{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-blue-50 rounded-lg p-6 mb-8"
        >
          <div className="flex items-start space-x-4">
            <Package className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900 mb-2">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• You'll receive an email confirmation shortly</li>
                <li>• We'll notify you when your order ships</li>
                <li>• Track your order in your account dashboard</li>
                <li>• Estimated delivery: 3-5 business days</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/my-orders')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Package className="w-5 h-5 mr-2" />
            View My Orders
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess; 