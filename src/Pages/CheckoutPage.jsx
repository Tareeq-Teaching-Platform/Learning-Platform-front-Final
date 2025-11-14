import React, { useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import { useCart } from '../Context/CartContext';
import NotLoggedIn from '../Components/NotLoggedIn';
import { CreditCard, Lock, ShoppingBag, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import axios from 'axios';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('paypal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(!user);

  const tax = getTotalPrice() * 0.16;
  const totalWithoutTax = getTotalPrice() - tax;

  // Show login modal if user is not logged in
  if (!user) {
    return (
      <NotLoggedIn
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          navigate('/');
        }}
        message="You need to login first to checkout!"
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-gradient-to-br from-green-50 to-white p-12 rounded-3xl shadow-xl text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">No items to checkout</h2>
          <p className="text-gray-600 mb-6">Add some courses to your cart first!</p>
          <button
            onClick={() => navigate('/classes')}
            className="inline-block px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-green-400/50 transition-all duration-300 hover:scale-105"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const handlePayPalCheckout = async () => {
    setIsProcessing(true);
    try {
      const courseIds = cartItems.map(course => course.id);
      
      const response = await axios.post(`${API_BASE_URL}/payments/paypal/create-order`, 
         { course_ids: courseIds },
        {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data =  response.data;

      if (data.success) {
        // Redirect to PayPal approval URL
        window.location.href = data.data.approval_url;
      } else {
        alert(data.message || 'Failed to create PayPal order');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('PayPal checkout error:', error);
      alert('An error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Checkout</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-300 rounded-full"></div>
        <p className="text-gray-600 mt-4">Complete your purchase securely</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Information */}
          <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-green-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-green-600" />
              Billing Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-green-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-green-600" />
              Payment Method
            </h2>

            <div className="space-y-4">
              {/* PayPal Option */}
              <label
                className={`relative flex items-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedPayment === 'paypal'
                    ? 'border-green-500 bg-green-50 shadow-lg'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={selectedPayment === 'paypal'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-5 h-5 text-green-600 focus:ring-green-500"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                      alt="PayPal"
                      className="h-8"
                    />
                    <span className="font-bold text-gray-800">PayPal</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Pay securely with PayPal</p>
                </div>
                {selectedPayment === 'paypal' && (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
              </label>

              {/* Credit Card Option (Disabled) */}
              <label className="relative flex items-center p-6 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  disabled
                  className="w-5 h-5 text-gray-400"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                        alt="Visa"
                        className="h-6"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                        alt="Mastercard"
                        className="h-6"
                      />
                    </div>
                    <span className="font-bold text-gray-600">Credit / Debit Card</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                  Soon
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-xl border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

            {/* Course List */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((course) => (
                <div key={course.id} className="flex justify-between items-start text-sm">
                  <span className="text-gray-700 flex-1 pr-2">{course.name}</span>
                  <span className="font-semibold text-green-600">${course.price}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-green-200 my-4"></div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span className="font-semibold">${totalWithoutTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (16%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-green-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">Total:</span>
                <span className="text-3xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePayPalCheckout}
              disabled={isProcessing || selectedPayment !== 'paypal'}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:shadow-green-400/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Complete Payment
                </>
              )}
            </button>

            <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Secure payment processing
            </div>

            <div className="mt-6 pt-6 border-t-2 border-green-200">
              <button
                onClick={() => navigate('/cart')}
                className="text-green-600 hover:text-green-700 font-semibold flex items-center justify-center gap-2 transition-colors w-full p-3 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50"
              >
                <span>← Back to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;