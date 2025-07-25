import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Star,
  Share2,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByCategory, fetchProductByID } from "../store/Product/productSlice";
import Skeleton from "react-loading-skeleton";
import { addProductByQuantity } from "../store/cart/cartSlice";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import axios from "axios";
import { Flip, toast, ToastContainer } from "react-toastify";
const BASE_URI = import.meta.env.VITE_BACKEND_URI;
const Rating = ({
  showModal,
  setShowModal,
  rating,
  setRating,
  comment,
  setComment,
  handleSubmit
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Rate Your Experience</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-center space-x-2 text-2xl mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your comment here..."
          className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        ></textarea>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await handleSubmit();
              setShowModal(false);
            }}
            className="px-4 py-2 rounded bg-[#e8e810] hover:bg-[#e8e810b7]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { loading, productById,relatedProducts, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductByID({ id }));
  }, [dispatch,id]);
  useEffect(()=>{
    if (productById?.category) {
    dispatch(fetchProductByCategory({category: productById.category}));
  }
  },[productById?.category,dispatch])
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= productById.stock) {
      setQuantity(newQuantity);
    }
  };

    const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
const [comment, setComment] = useState('');
 const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating.');
      return;}
    try {
      const res = await axios.post(`${BASE_URI}/product/rate/${id}`, {star:rating,comment:comment},
        {
          withCredentials: true,
        }
      );
      toast.success(res.data);
      setComment('');
      setRating(0);

    } catch (err) {
      console.error("Error:", err || "Something went wrong");
    }
    }

  return (
    <>
<Rating
  showModal={showModal}
  setShowModal={setShowModal}
  rating={rating}
  setRating={setRating}
  comment={comment}
  setComment={setComment}
  handleSubmit={handleSubmit}
/>
<ToastContainer
position="top-center"
autoClose={3000}
theme="light"
transition={Flip}
/>
    <div className="min-h-screen bg-[#f6f6f6] py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden">
                <div className="p-4">
                  <div className="relative aspect-square mb-4">
                      {loading || !productById || !productById.images  ? <Skeleton className="h-full w-full"/>:<img
                        src={productById.images[0]}
                        alt={productById.name}
                        className="w-full h-full object-cover rounded-lg"
                      />}
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {loading || !productById || !productById.images  ? [...Array(4)].map((_,ind)=>{
                      return <Skeleton key={ind} width={80} height={80} className="rounded-lg flex-shrink-0"/>
                    }) 
                     : productById.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index
                            ? "border-[#e8e810]"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {/* <p className="text-[#535353] mb-2">{product.brand}</p> */}
                {loading || !productById || !productById.name ? <Skeleton width={300} height={32}/>:
                <h1 className="text-3xl font-bold text-[#313131] mb-4">
                  {productById.name}
                </h1>}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {loading || !productById || !productById.ratings  ? 
                      (
  <>
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} circle height={20} width={20} />
    ))}
    <Skeleton width={60} height={20} />
  </>
):
                      [...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(productById.ratings.reduce((acc,rt)=>acc+rt.star,0)/productById.ratings.length)
                              ? "text-[#e8e810] fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))
                      }
                    </div>
                    {loading || !productById || !productById.ratings ? <Skeleton/>:<span className="text-[#535353]">
                      ({productById.ratings.length} reviews)
                    </span>}
                  </div>
                  {
loading || !productById ? <Skeleton width={20} height={20}/>:
                    <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-[#535353] hover:text-[#313131] p-0"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </button>
                    }
                </div>
                {loading || !productById || !productById.price ? <Skeleton width={250} height={32}/> : <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-[#313131]">
                    Rs. {productById.price}
                  </span>
                  {productById.originalPrice > productById.price && (
                    <span className="text-xl text-[#535353] line-through">
                      Rs. {productById.originalPrice}
                    </span>
                  )}
                  <span className="bg-[#e8e810] text-[#313131] px-3 py-1 rounded-full text-sm font-bold">
                    Save Rs.{" "}
                    {(productById.originalPrice - productById.price).toFixed(2)}
                  </span>
                </div>}
              </div>

              {/* Product Options */}
              <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
                <div className="p-6">
                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="text-[#313131] font-medium mb-3 block">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      {loading || !productById || !productById.stock ? <Skeleton height={60}/>:<div className="flex items-center bg-[#eaea28] rounded-lg">
                        <button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(-1)}
                          className="text-[#313131] hover:bg-[#e8e810] p-2"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-[#313131] font-medium">
                          {quantity}
                        </span>
                        <button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(1)}
                          className="text-[#313131] hover:bg-[#e8e810] p-2"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>}
                      {loading || !productById || !productById.stock ? <Skeleton width={100} height={20}/> : 
                      <span className="text-[#535353] text-sm">
                        {productById.stock} items available
                      </span>}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  {loading || !productById ? (<>
                  <Skeleton height={50}/> <Skeleton height={50}/> 
                  </>):
                  <div className="space-y-3">
                    <button
                      onClick={() =>{
                        dispatch(
                          addProductByQuantity({
                            product: productById,
                            quantity: quantity,
                          })
                        )
                        setShowModal(true);
                      }
                    }
                      className="w-full flex justify-center items-center gap-5 bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold py-4 rounded-lg text-lg"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart - Rs.{" "}
                      {(productById.price * quantity).toFixed(2)}
                    </button>
                    <button
                      variant="outline"
                      className="w-full border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white py-4 rounded-lg text-lg bg-transparent"
                    >
                      Buy Now
                    </button>
                  </div>}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#ebeb56] rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-[#313131]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#313131]">
                          Free Shipping
                        </p>
                        <p className="text-sm text-[#535353]">
                          On orders over Rs. 15000
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#ebeb56] rounded-full flex items-center justify-center">
                        <RotateCcw className="w-5 h-5 text-[#313131]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#313131]">
                          30-Day Returns
                        </p>
                        <p className="text-sm text-[#535353]">
                          Easy returns & exchanges
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#ebeb56] rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#313131]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#313131]">
                          2-Year Warranty
                        </p>
                        <p className="text-sm text-[#535353]">
                          Manufacturer warranty included
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold text-[#313131] mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0,4).map((relatedProduct,ind) => (
                <ProductCard key={ind} product={relatedProduct}/>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
