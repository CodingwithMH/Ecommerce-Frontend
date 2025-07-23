import { Link } from "react-router-dom";
import { use, useContext, useState } from "react";
import { ChevronLeft, CheckCircle } from "lucide-react";
import OrderSummary from "../components/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import ReviewOrder from "../components/ReviewOrder";
import ShippingContext from "../Contexts/ShippingContext";
import PaymentContext, {
  PaymentCardContext,
  PaymentMethodContext,
} from "../Contexts/PaymentContext";
import axios from "axios";
import { Flip, toast, ToastContainer } from "react-toastify";
import { clearCart } from "../store/cart/cartSlice";

export default function Checkout() {
const BASE_URI = import.meta.env.VITE_BACKEND_URI;
  const dispatch = useDispatch();
  const { products, totalQuantity, totalPrice, shipping, total } = useSelector(
    (state) => state.cart
  );
  const [currentStep, setCurrentStep] = useState(1);
  const { shippingInformation, setShippingInformation } =
    useContext(ShippingContext);
  const { paymentMethod, setPaymentMethod } = useContext(PaymentMethodContext);
  const handleSubmit = async () => {
    const order = {
      products: products,
      amount: total,
      address: shippingInformation.address,
      paymentMethod: paymentMethod,
    };
    try {
      const res = await axios.post(
        `${BASE_URI}/order/create`,
        order,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data?.message || "Order Placed Successully!");
      dispatch(clearCart());
    } catch (err) {
      const resp = err?.response?.data?.error;
      toast.error(resp);
      console.error("Error:", resp || "Error Occured");
    }
  };
  const steps = [
    { number: 1, title: "Shipping", description: "Delivery information" },
    { number: 2, title: "Payment", description: "Payment details" },
    { number: 3, title: "Review", description: "Order confirmation" },
  ];

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                currentStep >= step.number
                  ? "bg-[#e8e810] text-[#313131]"
                  : "bg-gray-200 text-[#535353]"
              }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <div className="text-center mt-2">
              <p
                className={`text-sm font-medium ${
                  currentStep >= step.number
                    ? "text-[#313131]"
                    : "text-[#535353]"
                }`}
              >
                {step.title}
              </p>
              <p className="text-xs text-[#535353]">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-4 ${
                currentStep > step.number ? "bg-[#e8e810]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
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
      <div className="min-h-screen bg-[#f6f6f6] py-5 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Step Indicator */}
          <StepIndicator />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
                <div className="p-8">
                  {currentStep === 1 && <ShippingForm />}
                  {currentStep === 2 && <PaymentForm />}
                  {currentStep === 3 && <ReviewOrder />}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    {currentStep > 1 ? (
                      <button
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white bg-transparent px-6 py-3"
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 3 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold px-8 py-3 rounded-lg"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold px-8 py-3 rounded-lg"
                      >
                        Place Order - Rs. {total.toFixed(2)}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
