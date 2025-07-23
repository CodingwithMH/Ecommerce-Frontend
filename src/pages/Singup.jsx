import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  Locate,
} from "lucide-react";
import Cart from "../assets/images/cart.svg";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer,Flip } from "react-toastify";
const Signup = () => {
const BASE_URI = process.env.REACT_APP_BACKEND_URI;
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URI}/api/auth/register`, data,
        {
          withCredentials:true
        }
      );
        toast(res.data.message)

      setData({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  })
    } catch (err) {
      const resp=err?.response?.data?.error;
      toast.error(resp);
      console.error("Error:", resp || 'Error Occured');
    }
  };

  return (
    <>
      <ToastContainer
position="top-center"
autoClose={3000}
theme="light"
transition={Flip}
/>
      <div className="min-h-screen max-w-screen mx-auto flex items-center justify-center md:justify-between overflow-hidden py-20 md:pb-0">
        {/* Decorative yellow circles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#e8e810] rounded-full"></div>
        <div className="absolute top-20 right-20 w-14 h-14 bg-[#eaea28] rounded-full"></div>
        <div className="absolute bottom-24 left-32 w-24 h-24 bg-[#f3f39b] rounded-full"></div>
        <div className="absolute bottom-40 right-1/4 w-10 h-10 bg-[#e8e810] rounded-full"></div>
        <div className="absolute top-1/3 right-1/2 w-8 h-8 bg-[#f6f6f6] rotate-45"></div>
        <div className="absolute top-64 left-[40%] w-10 h-10 bg-[#e8e810] rotate-[30deg]"></div>
        <div className="absolute bottom-1/2 -left-28 w-96 h-96 bg-[#f6f6f6] rounded-full"></div>
        {/* Sign Up Form */}
        <div className="bg-white rounded-3xl sm:p-8 shadow-lg border border-gray-200 w-full max-w-md relative z-10 mx-auto md:ml-16 p-5">
          {/* Decorative yellow circle inside form */}
          <div className="absolute top-16 left-8 w-16 h-16 bg-[#eaea28] rounded-full blur-md opacity-60"></div>
          <div className="absolute bottom-16 left-12 w-12 h-12 bg-[#f3f39b] rounded-full blur-md opacity-40"></div>
          <div className="absolute top-1/2 right-8 w-10 h-10 bg-[#e8e810] rounded-full blur-md opacity-50"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-center mb-2 text-[#313131]">
              SIGN UP
              <div className="w-16 h-0.5 bg-[#313131] mx-auto mt-2"></div>
            </h1>

            <p className="text-center text-[#535353] mb-8 font-medium">
              WELCOME BACK!
            </p>

            <form
              className="space-y-2 grid grid-cols-2 my-2 gap-3"
              onSubmit={handleSubmit}
            >
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="name"
                  className="text-[#313131] font-medium mb-2 block"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="phone"
                  className="text-[#313131] font-medium mb-2 block"
                >
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="email"
                  className="text-[#313131] font-medium mb-2 block"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="password"
                  className="text-[#313131] font-medium mb-2 block"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] border-none w-full pl-12 pr-2 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-2">
                <label
                  htmlFor="address"
                  className="text-[#313131] font-medium mb-2 block"
                >
                  Address
                </label>
                <div className="relative">
                  <Locate className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                  <input
                    id="address"
                    type="tel"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                    placeholder="Address"
                  />
                </div>
              </div>

              <button type="submit" className="w-full col-span-2 bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold py-3 rounded-lg text-lg">
                SIGN UP
              </button>
            </form>
            <div className="text-center my-2">
              <Link
                to="/login"
                className="text-[#535353] hover:text-[#313131] underline font-medium"
              >
                Already have an account
              </Link>
            </div>
          </div>
        </div>

        {/* Shopping Cart Illustration */}
        <div className="w-[40%] h-[400px] fixed right-0 md:relative">
          <div className="w-full h-full rounded-l-full bg-[#ebeb56]"></div>
          <img
            src={Cart}
            alt=""
            className="h-[500px] absolute bottom-0 -left-28"
          />
        </div>

        {/* Bottom decorative dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < 5
                    ? "bg-[#e8e810]"
                    : i < 10
                    ? "bg-[#eaea28]"
                    : "bg-[#f3f39b]"
                } opacity-60`}
              ></div>
            ))}
          </div>
        </div>
        {/* Top decorative dots */}
        <div className="absolute top-16 left-3/4 transform -translate-x-1/2">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < 5
                    ? "bg-[#e8e810]"
                    : i < 10
                    ? "bg-[#eaea28]"
                    : "bg-[#f3f39b]"
                } opacity-60`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
