import { useState,useEffect } from "react"
import {  LogIn, LogOut, UserPlus } from "lucide-react"
import { Home, Search, Grid3X3, ShoppingCart, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Sidebar from "./Sidebar"
import axios from "axios"
import { fetchUser, setToken, setUserDetails } from "../store/user/userSlice"

export default function MobileNavbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalQuantity } = useSelector((state) => state.cart);
    const location=useLocation()
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-[#ebeb56] shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
            
              <Link
                to='/'
                className={`relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname==='/'
                    ? "bg-[#ebeb56] text-[#313131]"
                    : "text-[#535353] hover:text-[#313131] hover:bg-[#f3f39b] hover:bg-opacity-30"
                }`}
              >
                <div className="relative">
                  <Home className={`w-6 h-6 mb-1 ${location.pathname==='/' ? "text-[#313131]" : "text-[#535353]"}`} />
                </div>

                <span
                  className={`text-xs font-medium truncate max-w-full ${
                    location.pathname==='/' ? "text-[#313131]" : "text-[#535353]"
                  }`}
                >
                  Home
                </span>

                {location.pathname==='/' && <div className="absolute -top-1 w-1 h-1 bg-[#313131] rounded-full" />}
              </Link>

              {userDetails && <Link
                to='/profile'
                className={`relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname==='/profile'
                    ? "bg-[#ebeb56] text-[#313131]"
                    : "text-[#535353] hover:text-[#313131] hover:bg-[#f3f39b] hover:bg-opacity-30"
                }`}
              >
                <div className="relative">
                  <User className={`w-6 h-6 mb-1 ${location.pathname==='/profile' ? "text-[#313131]" : "text-[#535353]"}`} />
                </div>

                <span
                  className={`text-xs font-medium truncate max-w-full ${
                    location.pathname==='/profile' ? "text-[#313131]" : "text-[#535353]"
                  }`}
                >
                  Profile
                </span>

                {location.pathname==='/profile' && <div className="absolute -top-1 w-1 h-1 bg-[#313131] rounded-full" />}
              </Link>
}
              <Link
                to='/shop'
                className={`relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname==='/shop'
                    ? "bg-[#ebeb56] text-[#313131]"
                    : "text-[#535353] hover:text-[#313131] hover:bg-[#f3f39b] hover:bg-opacity-30"
                }`}
              >
                <div className="relative">
                  <Grid3X3 className={`w-6 h-6 mb-1 ${location.pathname==='/shop' ? "text-[#313131]" : "text-[#535353]"}`} />
                </div>

                <span
                  className={`text-xs font-medium truncate max-w-full ${
                    location.pathname==='/shop' ? "text-[#313131]" : "text-[#535353]"
                  }`}
                >
                  Shop
                </span>

                {location.pathname==='/shop' && <div className="absolute -top-1 w-1 h-1 bg-[#313131] rounded-full" />}
              </Link>

              <button
              onClick={() => setIsCartOpen(true)}
                className="relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 text-[#535353] hover:text-[#313131] hover:bg-[#f3f39b] hover:bg-opacity-30"
              >
                <div className="relative">
                  <ShoppingCart className={`w-6 h-6 mb-1 ${location.pathname==='/shop' ? "text-[#313131]" : "text-[#535353]"}`} />

                    {totalQuantity >= 0 && (
                <span className="absolute -top-2 -right-2 bg-[#313131] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity > 9 ? "9+" : totalQuantity}
                </span>
              )}
                </div>

                <span
                  className="text-xs font-medium truncate max-w-full text-[#535353]"
                >
                  Cart
                </span>

              </button>

              {userDetails ? (
                <Link
              onClick={async () => {
                                    try {
                                      await axios.post(
                                        "http://localhost:5000/api/auth/logout",
                                        {},
                                        { withCredentials: true }
                                      );
                                      dispatch(setUserDetails(null));
                                      dispatch(setToken(""));
                                    } catch (err) {
                                      console.error("Logout error:", err);
                                    }
                                  }}
                to='/login'
                className="relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 
                     text-[#535353] hover:text-[#313131] hover:bg-[#f3f39b] hover:bg-opacity-30"
                
              >
                <div className="relative">
                  <LogOut className={`w-6 h-6 mb-1 text-[#535353]"}`} />
                </div>

                <span
                  className="text-xs font-medium truncate max-w-full
                    text-[#535353]"
                >
                  Logout
                </span>

              </Link>
              ):location.pathname==="/login" ? <Link
                to='/signup'
                className="relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 text-[#535353] hover:text-[#313131] hover:bg-[#f3f39b] hover:bg-opacity-30"
              >
                <div className="relative">
                  <UserPlus className={`w-6 h-6 mb-1 text-[#535353]"}`} />
                </div>

                <span
                  className="text-xs font-medium truncate max-w-full
                    text-[#535353]"
                >
                  Register
                </span>

              </Link> :
              <Link
                to='/login'
                className="relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 
                     text-[#535353] hover:text-[#313131] hover:bg-[#f3f39b] hover:bg-opacity-30"
                
              >
                <div className="relative">
                  <LogIn className={`w-6 h-6 mb-1 text-[#535353]"}`} />
                </div>

                <span
                  className="text-xs font-medium truncate max-w-full
                    text-[#535353]"
                >
                  Login
                </span>

              </Link>

              }
        </div>

        <div className="h-safe-area-inset-bottom bg-white" />
      </nav>
      <Sidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
