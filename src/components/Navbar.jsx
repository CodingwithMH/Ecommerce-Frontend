import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, ChevronDown, LogOut, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import FiltersContext from "../Contexts/filtersContext";
import { fetchProductsByFilters } from "../store/Product/productSlice";
import { fetchUser, setToken, setUserDetails } from "../store/User/userSlice";
import axios from "axios";
const Navbar = () => {
const BASE_URI = process.env.BACKEND_URI;
  const location = useLocation();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { selectedFilters, setSelectedFilters } = useContext(FiltersContext);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchProductsByFilters({ filters: selectedFilters }));
  }, [selectedFilters]);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <>
      <header className="bg-[#ebeb56] px-6 py-2 sticky max-w-screen z-20 top-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="./logo.svg" alt="" className="[@media(max-width:460px)]:w-[120px] w-[150px]" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-black font-medium hover:opacity-80">
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setSelectedFilters({ categories: [""] })}
              className="text-black font-medium hover:opacity-80"
            >
              Shop
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer text-black font-medium hover:opacity-80">
                Categories <ChevronDown size={16} />
              </div>

              <div
                className={`absolute top-[100%] overflow-hidden left-0 transition-all bg-white text-black rounded-lg shadow-md z-20 w-40 ${
                  showDropdown ? "py-2" : "h-0"
                }`}
              >
                {["Electronics", "Men", "Women", "Kids", "Accessories"].map(
                  (item, ind) => {
                    return (
                      <Link
                        key={ind}
                        to="/shop"
                        onClick={() => {
                          setSelectedFilters({ categories: [item] });
                        }}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {item}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </nav>

            <div className="relative md:hi">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#535353]" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white border-none pl-12 pr-4 py-2 rounded-lg text-[#313131] placeholder:text-[#535353] [@media(max-width:460px)]:w-36 [@media(max-width:460px)]:text-sm w-64"
              />
            </div>
          {/* Right side icons and register */}
          <div className="md:flex items-center gap-4 hidden ">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#535353]" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white border-none pl-12 pr-4 py-2 rounded-lg text-[#313131] placeholder:text-[#535353] w-64"
              />
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-black hover:opacity-80 transition-opacity"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalQuantity >= 0 && (
                <span className="absolute -top-2 -right-2 bg-[#313131] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity > 9 ? "9+" : totalQuantity}
                </span>
              )}
            </button>
            {userDetails ? (
              <div
                className="relative"
                onClick={() => setShowDropdown1((prev) => !prev)}
              >
                <div className="flex items-center gap-1 cursor-pointer text-black font-medium hover:opacity-80">
                  <User className="w-6 h-6 text-black cursor-pointer hover:opacity-80" />
                </div>

                <div
                  className={`absolute top-[100%] overflow-hidden right-0 transition-all bg-white text-black rounded-lg shadow-md z-20 w-40 ${
                    showDropdown1 ? "py-2" : "h-0"
                  }`}
                >
                  <Link
                    to="/profile"
                    className="flex px-4 py-2 hover:bg-gray-100"
                  >
                    <User />
                    Profile
                  </Link>
                  <Link
                    onClick={async () => {
                      try {
                        await axios.post(
                          `${BASE_URI}/api/auth/logout`,
                          {},
                          { withCredentials: true }
                        );
                        dispatch(setUserDetails(null));
                        dispatch(setToken(""));
                      } catch (err) {
                        console.error("Logout error:", err);
                      }
                    }}
                    to="/login"
                    className="flex px-4 py-2 hover:bg-gray-100"
                  >
                    <LogOut />
                    Logout
                  </Link>
                </div>
              </div>
            ) : location.pathname === "/login" ? (
              <Link
                to="/signup"
                className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-lg font-medium"
              >
                Register
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-lg font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
      <Sidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
