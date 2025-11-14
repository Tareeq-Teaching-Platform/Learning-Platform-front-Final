import React, { useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();
  const tax = (getTotalPrice()*0.16);
  const totalWithoutTax = getTotalPrice() - tax;
  const navigate = useNavigate()
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-gradient-to-br from-green-50 to-white p-12 rounded-3xl shadow-xl text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some courses to get started on your learning journey!</p>
          <Link 
            to="/classes" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-green-400/50 transition-all duration-300 hover:scale-105"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-300 rounded-full"></div>
        <p className="text-gray-600 mt-4">{getTotalItems()} {getTotalItems() === 1 ? 'course' : 'courses'} in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((course) => (
            <div 
              key={course.id} 
              className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative overflow-hidden rounded-xl w-full sm:w-32 h-32 flex-shrink-0">
                  <img 
                    src={course.icon} 
                    alt={course.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{course.title}</p>
                </div>

                <div className="flex sm:flex-col justify-between sm:justify-start items-end sm:items-end text-right gap-4">
                  <div className="font-bold text-2xl text-green-600">${course.price}</div>
                  <button
                    onClick={() => removeFromCart(course.id)}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-600 rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-xl border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span className="font-semibold">${totalWithoutTax}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-semibold">${tax}</span>
              </div>
              <div className="h-px bg-green-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">Total:</span>
                <span className="text-3xl font-bold text-green-600">${getTotalPrice()}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link to={'/checkout'} className="block text-center w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:shadow-green-400/50 transition-all duration-300 hover:scale-105 active:scale-95">
                Proceed to Checkout
              </Link>
              <button
                onClick={clearCart}
                className="w-full flex items-center justify-center gap-2 bg-white text-red-600 py-3 rounded-xl border-2 border-red-200 hover:bg-red-50 hover:border-red-400 font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5" />
                Clear Cart
              </button>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-green-200">
              <button 
                onClick={()=>navigate(-1)}
                className="text-green-600 hover:text-green-700 font-semibold flex items-center justify-center gap-2 transition-colors hover:cursor-pointer border w-full p-3 rounded-3xl"
              >
                <span>← Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;