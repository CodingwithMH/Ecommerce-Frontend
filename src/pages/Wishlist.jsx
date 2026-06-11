import { Link } from 'react-router-dom'
import { Search, ShoppingCart, Diamond, Star, Heart, Trash2, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlist } from '../store/wishlist/wishlistSlice';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const {wishlisted_products}=useSelector((state)=>state.wishlist);
  const {products}=useSelector((state)=>state.products);
  const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchWishlist());
  },[dispatch]);
  useEffect(() => {
  if (wishlisted_products) {
    setWishlistItems(wishlisted_products);
  }
}, [wishlisted_products]);
  const removeFromWishlist = (id) => {
  setWishlistItems(prev => prev.filter((item) => item._id !== id));
}

  // const calculateDiscount = (original, current) => {
  //   const originalPrice = parseFloat(original.replace("$", ""))
  //   const currentPrice = parseFloat(current.replace("$", ""))
  //   return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  // }

  return (
    <div className="min-h-screen bg-[#f6f6f6]">

      {/* Breadcrumb */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-[#535353] hover:text-[#313131]">
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span className="text-[#535353]">/</span>
          <span className="text-[#313131] font-semibold">My Wishlist</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#313131] mb-2 flex items-center gap-3">
              <Heart className="w-10 h-10 fill-[#e8e810] text-[#e8e810]" />
              My Wishlist
            </h1>
            <p className="text-[#535353] text-lg">
              You have <span className="font-bold text-[#313131]">{wishlistItems.length}</span> items in your wishlist
            </p>
          </div>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((product) => (
                <ProductCard key={product._id} product={product}/>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#313131] mb-2">Your Wishlist is Empty</h2>
              <p className="text-[#535353] mb-6">Start adding items to your wishlist!</p>
              <Link to="/shop">
                <button className="bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold px-8 py-4 rounded-lg">
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>

    </div>
  )
}
