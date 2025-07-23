import React from 'react'
import { Shield } from 'lucide-react'
import { useSelector } from 'react-redux';
const OrderSummary = () => {

    const {products,totalQuantity,totalPrice,savings,total,shipping}=useSelector((state)=>state.cart)
    return ( <div className="bg-white shadow-lg border border-gray-200 rounded-2xl sticky top-8">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#313131] mb-6">Order Summary</h2>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {products.map((item) => (
            <div key={item._id} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute -top-2 -right-2 bg-[#e8e810] text-[#313131] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#313131] text-sm line-clamp-2">{item.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-[#313131]">Rs. {item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-[#535353] line-through">Rs. {item.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Totals */}
        <div className="space-y-3 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#535353]">Subtotal ({totalQuantity} items)</span>
            <span className="text-[#313131] font-medium">Rs. {totalPrice.toFixed(2)}</span>
          </div>

          {savings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#535353]">Savings</span>
              <span className="text-green-600 font-medium">-Rs. {savings.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-[#535353]">Shipping</span>
            <span className="text-[#313131] font-medium">{shipping === 0 ? "FREE" : `Rs. ${shipping.toFixed(2)}`}</span>
          </div>

          <div className="border-t border-gray-300 pt-3">
            <div className="flex justify-between">
              <span className="font-bold text-[#313131] text-lg">Total</span>
              <span className="font-bold text-[#313131] text-xl">Rs. {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-6 p-3 bg-[#f3f39b] bg-opacity-30 rounded-lg">
          <Shield className="w-4 h-4 text-[#313131]" />
          <span className="text-xs text-[#313131] font-medium">Secure SSL Encrypted Checkout</span>
        </div>
      </div>
    </div>
  )

}
export default OrderSummary
