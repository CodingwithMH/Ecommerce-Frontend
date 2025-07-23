import React, { useState } from 'react'
import { Star, ShoppingCart } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../store/cart/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch=useDispatch();
  const { loading } = useSelector((state) => state.products)
  const [showText,setShowText]=useState(false);
  return (
    <Link to={`${product._id ?('/product/'+product._id):'#'}`} className="bg-white hover:shadow-lg transition-shadow cursor-pointer group rounded-md overflow-hidden">
      <div className="p-4">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          {loading ? (
            <Skeleton height={192} />
          ) : (
            <img
              src={product.images || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}

          {/* Out of Stock Badge */}
          {!loading && product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}

          {/* Cart Button */}
          {!loading && <div className="absolute top-2 right-2">
            <button
            onMouseEnter={()=>setShowText(true)}
            onMouseLeave={()=>setShowText(false)}
            onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              dispatch(addProduct(product));
              }} className="bg-white transition-all hover:flex hover:items-center hover:bg-[#ebeb56] text-[#313131] p-2 rounded-full shadow-md">
              {showText && <span className='font-semibold'>Add to Cart</span>}
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>}
        </div>

        {/* Text Info */}
        <div className="space-y-2">
          {/* Name */}
          {loading ? (
            <Skeleton height={20} width={`80%`} />
          ) : (
            <h3 className="font-semibold text-[#313131] line-clamp-2">{product.name}</h3>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    !loading && i < Math.floor(product.rating)
                      ? "text-[#e8e810] fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            {loading ? (
              <Skeleton height={16} width={30} />
            ) : (
              <span className="text-sm text-[#535353]">({product.ratings.length})</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {loading ? (
              <Skeleton height={24} width={60} />
            ) : (
              <span className="text-xl font-bold text-[#313131]">Rs. {product.price}</span>
            )}
            {!loading && product.originalPrice > product.price && (
              <span className="text-sm text-[#535353] line-through">Rs. {product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
