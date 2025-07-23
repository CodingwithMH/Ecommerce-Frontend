import React from 'react'
import { Plus,Minus,Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeProduct, updateQuantity } from '../store/Cart/cartSlice'
  const CartItem = ({ item }) => {
    const dispatch=useDispatch()
    return(

        <div className="flex gap-4 p-4 border-b border-gray-100 last:border-b-0">
      <div className="relative w-20 h-20 flex-shrink-0">
        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#313131] text-sm line-clamp-2 mb-1">{item.name}</h3>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-[#313131]">Rs. {item.price}</span>
            {item.originalPrice > item.price && (
              <span className="text-xs text-[#535353] line-through">Rs. {item.originalPrice}</span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#eaea28] rounded-lg">
              <button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(decreaseQuantity({ id: item._id}))}
                className="text-[#313131] hover:bg-[#e8e810] p-1 h-8 w-8"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2 py-1 text-[#313131] font-medium text-sm min-w-[24px] text-center">
                {item.quantity}
              </span>
              <button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(increaseQuantity({ id: item._id}))}
                className="text-[#313131] hover:bg-[#e8e810] p-1 h-8 w-8"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <button
              variant="ghost"
              size="sm"
              onClick={() => {dispatch(removeProduct(item))}}
              className="text-[#535353] hover:text-red-500 hover:bg-red-50 p-1 h-8 w-8"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
  }

export default CartItem
