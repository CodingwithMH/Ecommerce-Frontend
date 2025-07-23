import { useEffect, useState } from "react";
import {
  User,
  Package,
  Settings,
} from "lucide-react";
import ProfileSection from "../components/ProfileSection";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import SettingsSection from "../components/SettingsSection";

export default function Profile() {
const BASE_URI = import.meta.env.VITE_BACKEND_URI;
  const [activeTab, setActiveTab] = useState("profile");
  const { userDetails } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const fetchOrders=async()=>{
    try {
          const res = await axios.get(`${BASE_URI}/order/my`,
            {
              withCredentials:true
            }
          );
            setOrders(res.data)
        } catch (err) {
          const resp=err?.response?.data?.error;
          toast.error(resp);
          console.error("Error:", resp || 'Error Occured');
        }
  }
  useEffect(()=>{
    fetchOrders();
  },[])

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "processing":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const OrdersSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#313131]">Order History</h2>
        <div className="flex gap-2">
          <select className="bg-[#eaea28] border-none py-2 px-4 rounded-lg text-[#313131] appearance-none">
            <option value="all">All Orders</option>
            <option value="delivered">Delivered</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg border border-gray-200 rounded-2xl"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-[#313131] mb-1">
                    Order #{order._id}
                  </h3>
                  {/* <p className="text-sm text-[#535353]">
                    Placed on {order.date}
                  </p> */}
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <p className="text-lg font-bold text-[#313131] mt-2">
                    ${order.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.products.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-[#313131]">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-[#535353]">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-bold text-[#313131]">
                          ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-sm text-[#535353] mb-1">Shipping Address:</p>
                <p className="text-sm text-[#313131]">
                  {order.address}
                </p>
              </div>

              {/* Order Actions */}
              {/* <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  size="sm"
                  variant="outline"
                  className="border-[#313131] flex pr-2 p-2 items-center rounded-lg text-[#313131] hover:bg-[#313131] hover:text-white bg-transparent"
                >
                  <Eye className="w-4 h-4 mx-2" />
                  View Details
                </button>
                {order.status === "Delivered" && (
                  <>
                    <button
                      size="sm"
                      variant="outline"
                      className="border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white bg-transparent"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Write Review
                    </button>
                    <button
                      size="sm"
                      variant="outline"
                      className="border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Invoice
                    </button>
                  </>
                )}
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-[#535353] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#313131] mb-2">
              No orders yet
            </h3>
            <p className="text-[#535353] mb-6">
              Start shopping to see your orders here!
            </p>
            <button className="bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold px-8 py-3 rounded-lg">
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );



  return (
      <>
  <ToastContainer
position="top-center"
autoClose={3000}
theme="light"
transition={Flip}
/>
{userDetails &&
    <div className="min-h-screen bg-[#f6f6f6] py-5 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white shadow-lg border border-gray-200 rounded-2xl sticky top-8">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="font-bold text-[#313131]">
                      {userDetails?.name || ""}
                    </h3>
                    <p className="text-sm text-[#535353]">
                      {userDetails?.email || ""}
                    </p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-[#ebeb56] text-[#313131] font-medium"
                            : "text-[#535353] hover:bg-[#f3f39b] hover:bg-opacity-30 hover:text-[#313131]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "orders" && <OrdersSection />}
            {activeTab === "settings" && <SettingsSection />}
          </div>
        </div>
      </div>
    </div>
  }
  </>
  );
}
