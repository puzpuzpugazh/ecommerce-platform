import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

const DummyPaymentForm = ({ order, onPaymentSuccess, onPaymentError, isLoading, setIsLoading }) => {
  const { user } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });

  const [errors, setErrors] = useState({});
  const [validationStatus, setValidationStatus] = useState({});

  // Card number formatting
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Get card brand
  const getCardBrand = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    if (/^4/.test(cleanNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if ((/^6(?:011|5)/).test(cleanNumber)) return 'discover';
    return 'unknown';
  };

  // Validate card number (Luhn algorithm)
  const validateCardNumber = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  // Validate expiry date
  const validateExpiryDate = (month, year) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expMonth < 1 || expMonth > 12) return false;
    
    return true;
  };

  // Validate CVV
  const validateCVV = (cvv, cardBrand) => {
    const cvvLength = cvv.length;
    if (cardBrand === 'amex') {
      return cvvLength === 4;
    } else {
      return cvvLength === 3;
    }
  };

  // Real-time validation
  const validateField = (name, value) => {
    const cardBrand = getCardBrand(formData.cardNumber);
    
    switch (name) {
      case 'cardNumber':
        if (!value) return 'Card number is required';
        if (!validateCardNumber(value)) return 'Invalid card number';
        return null;
        
      case 'expiryMonth':
        if (!value) return 'Expiry month is required';
        if (!validateExpiryDate(value, formData.expiryYear)) return 'Invalid expiry date';
        return null;
        
      case 'expiryYear':
        if (!value) return 'Expiry year is required';
        if (!validateExpiryDate(formData.expiryMonth, value)) return 'Invalid expiry date';
        return null;
        
      case 'cvv':
        if (!value) return 'CVV is required';
        if (!validateCVV(value, cardBrand)) return 'Invalid CVV';
        return null;
        
      case 'cardholderName':
        if (!value) return 'Cardholder name is required';
        if (value.length < 2) return 'Cardholder name is too short';
        return null;
        
      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }

    // Format expiry month/year
    if (name === 'expiryMonth' || name === 'expiryYear') {
      formattedValue = value.replace(/\D/g, '');
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    // Update validation status
    const error = validateField(name, formattedValue);
    setValidationStatus(prev => ({
      ...prev,
      [name]: error ? 'error' : 'valid'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      if (!user || !user.token) {
        onPaymentError('Authentication required. Please log in again.');
        return;
      }

      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          orderId: order._id,
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        onPaymentSuccess(data);
      } else {
        onPaymentError(data.message);
      }
    } catch (error) {
      onPaymentError('Payment processing failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const cardBrand = getCardBrand(formData.cardNumber);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center mb-6">
        <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Payment Information</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cardNumber ? 'border-red-500' : 
                validationStatus.cardNumber === 'valid' ? 'border-green-500' : 'border-gray-300'
              }`}
            />
            {validationStatus.cardNumber === 'valid' && (
              <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
            )}
            {errors.cardNumber && (
              <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
          )}
          {cardBrand !== 'unknown' && (
            <p className="mt-1 text-sm text-gray-500 capitalize">{cardBrand}</p>
          )}
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cardholderName ? 'border-red-500' : 
              validationStatus.cardholderName === 'valid' ? 'border-green-500' : 'border-gray-300'
            }`}
          />
          {errors.cardholderName && (
            <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
          )}
        </div>

        {/* Expiry Date and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleInputChange}
                placeholder="MM"
                maxLength="2"
                className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.expiryMonth ? 'border-red-500' : 
                  validationStatus.expiryMonth === 'valid' ? 'border-green-500' : 'border-gray-300'
                }`}
              />
              <input
                type="text"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleInputChange}
                placeholder="YYYY"
                maxLength="4"
                className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.expiryYear ? 'border-red-500' : 
                  validationStatus.expiryYear === 'valid' ? 'border-green-500' : 'border-gray-300'
                }`}
              />
            </div>
            {(errors.expiryMonth || errors.expiryYear) && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryMonth || errors.expiryYear}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder={cardBrand === 'amex' ? '1234' : '123'}
              maxLength={cardBrand === 'amex' ? 4 : 3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cvv ? 'border-red-500' : 
                validationStatus.cvv === 'valid' ? 'border-green-500' : 'border-gray-300'
              }`}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Payment Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Lock className="w-4 h-4 mr-2" />
              Pay ${order.totalPrice}
            </div>
          )}
        </button>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500">
          <Lock className="w-4 h-4 inline mr-1" />
          Your payment information is secure and encrypted
        </div>
      </form>
    </motion.div>
  );
};

export default DummyPaymentForm; 