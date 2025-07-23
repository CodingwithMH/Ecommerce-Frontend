import React from 'react'
import { Star } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'
import { addProduct } from '../store/cart/cartSlice'

const ProductListItem = ({ product }) => {
  const { loading } = useSelector((state) => state.products)

  return (
    <div className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="relative w-32 h-32 flex-shrink-0">
            {loading ? (
              <Skeleton height={128} width={128} />
            ) : (
              <>
                <img
                  src={product.images || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <span className="text-white text-sm font-bold">Out of Stock</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2">
            {loading ? (
              <>
                <Skeleton height={20} width={`60%`} />
                <Skeleton height={16} width={`40%`} />
                <Skeleton height={16} width={`50%`} />
                <Skeleton height={32} width={`100%`} />
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-[#313131]">{product.name}</h3>
                <p className="text-[#535353]">{product.brand}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-[#e8e810] fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#535353]">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#313131]">
                      Rs. {product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-[#535353] line-through">
                        Rs. {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    className="bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold px-6 py-2 rounded-lg"
                    disabled={product.stock === 0}
                    onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              dispatch(addProduct(product));
              }}
                  >
                    {product.stock !== 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem
