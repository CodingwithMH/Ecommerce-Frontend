import { useContext } from 'react';
import { useSelector } from 'react-redux';
import ShippingContext from '../Contexts/ShippingContext';
import { PaymentCardContext, PaymentMethodContext } from '../Contexts/PaymentContext';
import { Link } from 'react-router-dom';
  const ReviewOrder = () => {
  const {products,totalQuantity,totalPrice,shipping,total}=useSelector((state)=>state.cart);
  const {shippingInformation,setShippingInformation}=useContext(ShippingContext);
    const {paymentMethod, setPaymentMethod} = useContext(PaymentMethodContext)
    const {paymentInformation, setPaymentInformation} = useContext(PaymentCardContext)
    return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#313131] mb-6">Review Your Order</h2>

      {/* Order Items */}
      <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#313131] mb-4">Order Items</h3>
          <div className="space-y-4">
            {products.map((item) => (
              <div key={item._id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-[#313131]">{item.name}</h4>
                  <div className="flex gap-3 text-sm text-[#535353] mt-1">
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#313131]">Rs.{(item.price * item.quantity).toFixed(2)}</p>
                  {item.originalPrice > item.price && (
                    <p className="text-sm text-[#535353] line-through">
                      Rs. {(item.originalPrice * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipping & Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
          <div className="p-6">
            <h3 className="text-lg font-bold text-[#313131] mb-4">Shipping Address</h3>
            <div className="text-[#535353] space-y-1">
              <p>
                {shippingInformation.firstName}
              </p>
              <p>{shippingInformation.address}</p>
              {shippingInformation.apartment && <p>{shippingInformation.apartment}</p>}
              <p>
                {shippingInformation.city}, {shippingInformation.state} {shippingInformation.zipCode}
              </p>
              <p>{shippingInformation.phone}</p>
              <p>{shippingInformation.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
          <div className="p-6">
            <h3 className="text-lg font-bold text-[#313131] mb-4">Payment Method</h3>
            <div className="text-[#535353] space-y-1">
              {paymentMethod === "card" ? (
                <>
                  <p>Credit/Debit div</p>
                  <p>**** **** **** {paymentInformation.cardNumber.slice(-4)}</p>
                  <p>{paymentInformation.cardName}</p>
                </>
              ) : (
                <p>PayPal</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start gap-3 p-4 bg-[#f3f39b] bg-opacity-30 rounded-lg">
        <input
          type="checkbox"
          id="terms"
          className="w-5 h-5 text-[#e8e810] bg-[#eaea28] border-none rounded focus:ring-[#e8e810] focus:ring-2 mt-0.5"
          required
        />
        <label htmlFor="terms" className="text-[#535353] text-sm leading-relaxed">
          I agree to the{" "}
          <Link href="#" className="text-[#313131] underline hover:opacity-80">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-[#313131] underline hover:opacity-80">
            Privacy Policy
          </Link>
          . I understand that my order will be processed and shipped according to the selected shipping method.
        </label>
      </div>
    </div>
  )}


export default ReviewOrder
