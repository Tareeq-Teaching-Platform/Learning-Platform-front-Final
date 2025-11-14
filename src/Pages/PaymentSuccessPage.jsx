import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader, XCircle } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import { API_BASE_URL } from '../config/api';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [message, setMessage] = useState('Processing your payment...');

  useEffect(() => {
    const capturePayment = async () => {
      const orderId = searchParams.get('order_id');
      const paypalOrderId = searchParams.get('token'); // PayPal adds this

      if (!orderId || !paypalOrderId) {
        setStatus('error');
        setMessage('Invalid payment information');
        return;
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}/payments/paypal/capture`,
          {
            order_id: orderId,
            paypal_order_id: paypalOrderId
          },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (response.data.success) {
          setStatus('success');
          setMessage('Payment completed successfully!');
          clearCart(); // Clear the cart after successful payment
          
          // Redirect to courses after 3 seconds
          setTimeout(() => {
            navigate('/profile');
          }, 8000);
        } else {
          setStatus('error');
          setMessage(response.data.message || 'Payment failed');
        }
      } catch (error) {
        console.error('Capture payment error:', error);
        const errorMessage = error.response?.data?.message;
        
        // If already completed, treat as success
        if (errorMessage === 'Order already completed') {
            setStatus('success');
            setMessage('Payment already processed!');
            setTimeout(() => navigate('/profile'), 5000);
        } else {
            setStatus('error');
            setMessage(errorMessage || 'Failed to process payment');
        }
        }
    };

    capturePayment();
  }, [searchParams, navigate, clearCart]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="bg-gradient-to-br from-green-50 to-white p-12 rounded-3xl shadow-xl text-center max-w-md">
        {status === 'processing' && (
          <>
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader className="w-12 h-12 text-green-600 animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Processing Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to your courses...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate('/cart')}
              className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-green-400/50 transition-all duration-300 hover:scale-105"
            >
              Back to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;