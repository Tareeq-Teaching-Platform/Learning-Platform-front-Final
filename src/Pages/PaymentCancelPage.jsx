import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { XCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    const updateOrderStatus = async () => {
      const orderId = searchParams.get('order_id');

      if (orderId) {
        try {
          await axios.post(
            `${API_BASE_URL}/payments/paypal/cancel`,
            { order_id: orderId },
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
        } catch (error) {
          console.error('Error updating order status:', error);
        }
      }
      
      setIsUpdating(false);
    };

    updateOrderStatus();
  }, [searchParams]);

  if (isUpdating) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="bg-gradient-to-br from-red-50 to-white p-12 rounded-3xl shadow-xl text-center max-w-md">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader className="w-12 h-12 text-red-600 animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Processing...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="bg-gradient-to-br from-red-50 to-white p-12 rounded-3xl shadow-xl text-center max-w-md">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Cancelled</h2>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. Don't worry, no charges were made to your account.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Your cart items are still saved if you'd like to try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/cart')}
            className="w-full px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-green-400/50 transition-all duration-300 hover:scale-105"
          >
            Return to Cart
          </button>
          <button
            onClick={() => navigate('/classes')}
            className="w-full px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;