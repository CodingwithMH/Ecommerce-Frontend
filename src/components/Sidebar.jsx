import { useState } from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const { products, totalQuantity, totalPrice, shipping, total } = useSelector(
    (state) => state.cart
  );

  // const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0)
  //   const originalTotal = products.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  //   const savings = originalTotal - subtotal
  // const shipping = totalPrice >= 15000 ? 0 : 1000
  // const total = totalPrice + shipping

  const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-20 h-20 bg-[#f3f39b] bg-opacity-50 rounded-full flex items-center justify-center mb-4">
        <ShoppingBag className="w-10 h-10 text-[#535353]" />
      </div>
      <h3 className="text-lg font-semibold text-[#313131] mb-2">
        Your cart is empty
      </h3>
      <p className="text-[#535353] text-sm mb-6">
        Add some products to get started!
      </p>
      <button
        onClick={onClose}
        className="bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold px-6 py-2 rounded-lg"
      >
        Continue Shopping
      </button>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed overflow-auto top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#ebeb56]">
          <h2 className="text-xl font-bold text-[#313131]">Shopping Cart</h2>
          <button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[#313131] hover:bg-[#eaea28] p-2 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {products.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                  {products.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="border-t border-gray-200 p-6 bg-[#f6f6f6]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#535353]">
                      Subtotal ({totalQuantity} items)
                    </span>
                    <span className="text-[#313131] font-medium">
                      Rs. {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#535353]">Savings</span>
                      <span className="text-green-600 font-medium">-${savings.toFixed(2)}</span>
                    </div>
                  )} */}

                  <div className="flex justify-between text-sm">
                    <span className="text-[#535353]">Shipping</span>
                    <span className="text-[#313131] font-medium">
                      {shipping === 0 ? "FREE" : `Rs. ${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-[#313131]">Total</span>
                      <span className="font-bold text-[#313131] text-lg">
                        Rs. {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-[#535353] mb-2">
                      <span>
                        Add Rs. {(15000 - totalPrice).toFixed(2)} more for free
                        shipping
                      </span>
                      <span>Rs. {totalPrice.toFixed(2)} / Rs. 15000.00</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#e8e810] h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((totalPrice / 50) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    to={"/checkout"}
                    onClick={onClose}
                    className="block w-full bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold py-3 rounded-lg text-lg text-center"
                  >
                    Checkout - Rs. {total.toFixed(2)}
                  </Link>
                  <button
                    variant="outline"
                    onClick={onClose}
                    className="w-full border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white py-3 rounded-lg bg-transparent"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#535353]">
                  <div className="w-4 h-4 bg-[#e8e810] rounded-full flex items-center justify-center">
                    <span className="text-[#313131] font-bold text-xs">✓</span>
                  </div>
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
