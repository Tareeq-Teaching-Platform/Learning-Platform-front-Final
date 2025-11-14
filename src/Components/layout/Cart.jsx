import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { useCart } from '../../Context/CartContext';

const Cart = () => {
  const { cartItems, getTotalItems, getTotalPrice, removeFromCart, clearCart } = useCart();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-green-50 hover:bg-green-200  transition-all duration-200 relative group">
        <div className="indicator">
          <ShoppingCart className="h-6 w-6 text-green-800" />
          {getTotalItems() > 0 && (
            <span className="badge badge-sm bg-gradient-to-r from-green-500 to-green-600 text-white border-none indicator-item ">
              {getTotalItems()}
            </span>
          )}
        </div>
      </div>

      <div tabIndex={0} className="mt-3 z-[1] dropdown-content w-96 bg-white shadow-2xl border-2 border-green-100 rounded-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-white p-4 border-b-2 border-green-100 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">Shopping Cart</h3>
            <span className="text-sm text-green-600 font-semibold">
              {getTotalItems()} {getTotalItems() === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link 
              to="/classes" 
              className="text-green-600 hover:text-green-700 font-semibold text-sm"
            >
              Browse Courses →
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="max-h-80 overflow-y-auto p-4 space-y-3">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex gap-3 p-3 rounded-lg hover:bg-green-50 transition-all duration-200 border border-green-100"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    {item.icon || item.image ? (
                      <img 
                        src={item.icon || item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-100">
                        <ShoppingCart className="w-6 h-6 text-green-600" />
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-800 truncate">
                      {item.title}
                    </h4>
                    <p className="text-green-600 font-bold text-sm mt-1">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-red-100 rounded-lg"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t-2 border-green-100 bg-gradient-to-r from-green-50 to-white rounded-b-xl space-y-3">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-400 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
                <Link 
                  to="/cart" 
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg text-center transition-all duration-300 hover:scale-105"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;