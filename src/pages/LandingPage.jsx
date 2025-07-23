import { Link } from "react-router-dom"
import {Truck, Shield, Headphones, ArrowRight, Mail } from "lucide-react"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import CategoryCard from "../components/CategoryCard"
import Image1 from '../assets/images/electronics.webp'
import Image2 from '../assets/images/furniture.webp'
import Image3 from '../assets/images/kids.webp'
import Image4 from '../assets/images/men.webp'
import Image5 from '../assets/images/women.webp'
import Image6 from '../assets/images/accessories.webp'
import { useEffect, useRef } from "react"
import { fetchProducts } from "../store/Product/productSlice"
import ProductCard from "../components/ProductCard"
import { toast, ToastContainer,Flip } from 'react-toastify';
import emailjs from 'emailjs-com';
export default function LandingPage() {
  const {loading,products,error}=useSelector((state)=>state.products)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])
  const formRef = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_st3bnaw',
        'template_dq6u1h8',
        formRef.current,
        'HrPc9rAeVDvUxiP1y'
      )
      .then(
        (result) => {
          console.log('Email sent:', result.text);
          toast('Message sent successfully!');
                formRef.current.reset();

        },
        (error) => {
          console.log('Error:', error.text);
          toast.error('Something went wrong.');
        }
      );
  };
  return (
    <>
    <ToastContainer
position="top-center"
autoClose={3000}
theme="light"
transition={Flip}
/>
    <div className="min-h-screen bg-[#f6f6f6]">

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        {/* Decorative yellow circles */}
        <div className="absolute top-12 left-8 w-20 h-20 bg-[#e8e810] rounded-full blur-sm opacity-60"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-[#eaea28] rounded-full blur-sm opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#f3f39b] rounded-full blur-sm opacity-50"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-[#313131] mb-6">
            Shop Smart,
            <br />
            <span className="text-[#313131]">Live Better</span>
          </h1>
          <p className="text-xl text-[#535353] mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Your one-stop destination for everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={'/shop'} className="bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold px-8 py-4 rounded-lg text-lg flex items-center gap-2">
              <span>
                Start Shopping
              </span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#313131] text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Electronics", image: Image1, items: "1,200+ items" },
              { name: "Furniture", image: Image2, items: "2,500+ items" },
              { name: "Kids", image: Image3, items: "800+ items" },
              { name: "Men", image: Image4, items: "800+ items" },
              { name: "Women", image: Image5, items: "800+ items" },
              { name: "Accessories", image: Image6, items: "800+ items" },
            ].map((category, index) => (
              <CategoryCard key={index} name={category.name} image={category.image} items={category.items}/>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#313131] text-center mb-12">Trending Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
        ? Array.from({ length: 4 }).map((_, idx) => (
            <ProductCard key={idx} product={{}} />
          ))
        : [...products]
  .sort(() => 0.5 - Math.random()) // Shuffle the array
  .slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 relative">
        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-[#eaea28] rounded-full blur-sm opacity-40"></div>
        <div className="absolute bottom-12 left-12 w-20 h-20 bg-[#f3f39b] rounded-full blur-sm opacity-50"></div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#313131] text-center mb-12">Why Choose SHOPICART?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-12 h-12 text-[#313131]" />,
                title: "Free Shipping",
                description: "Free shipping on orders over Rs. 15000. Fast and reliable delivery to your doorstep.",
              },
              {
                icon: <Shield className="w-12 h-12 text-[#313131]" />,
                title: "Secure Payment",
                description: "Your payment information is protected with bank-level security encryption.",
              },
              {
                icon: <Headphones className="w-12 h-12 text-[#313131]" />,
                title: "24/7 Support",
                description: "Our customer support team is here to help you anytime, anywhere.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#313131] mb-4">{feature.title}</h3>
                <p className="text-[#535353]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 py-16 bg-[#ebeb56]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#313131] mb-4">Stay Updated with Our Latest Deals</h2>
          <p className="text-[#535353] mb-8 text-lg">
            Subscribe to our newsletter and never miss out on exclusive offers and new arrivals.
          </p>
          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#535353]" />
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
                className="bg-white border-none pl-12 py-4 w-full rounded-lg text-[#313131] placeholder:text-[#535353]"
              />
            </div>
            <button className="bg-[#313131] hover:bg-[#2a2c35] text-white font-bold px-8 py-4 rounded-lg">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
    </>
  )
}
