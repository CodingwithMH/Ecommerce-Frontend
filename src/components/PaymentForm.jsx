import React, { useContext, useState } from 'react'
import {
  User,
  CreditCard,
  Calendar,
  Lock,
} from "lucide-react"
import PaymentContext, { PaymentCardContext, PaymentMethodContext } from '../Contexts/PaymentContext'
  const PaymentForm = () => {
  const {paymentMethod, setPaymentMethod} = useContext(PaymentMethodContext)
  const [sameAsShipping, setSameAsShipping] = useState(true)
    const {billingInformation,setBillingInformation}=useContext(PaymentContext)
  const {paymentInformation, setPaymentInformation} = useContext(PaymentCardContext)
      const handleInputChange = (field, value) => {
    setPaymentInformation((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
      const handleInputChange1 = (field, value) => {
    setBillingInformation((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
    return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#313131] mb-6">Payment Information</h2>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#313131] mb-4">Payment Method</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border-2 border-[#e8e810] bg-[#f3f39b] bg-opacity-20 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  id="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="w-4 h-4 text-[#e8e810] bg-[#eaea28] border-none focus:ring-[#e8e810] focus:ring-2"
                />
                <label htmlFor="card" className="font-medium text-[#313131] cursor-pointer">
                  Credit/Debit Card
                </label>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  id="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="w-4 h-4 text-[#e8e810] bg-[#eaea28] border-none focus:ring-[#e8e810] focus:ring-2"
                />
                <label htmlFor="paypal" className="font-medium text-[#313131] cursor-pointer">
                  PayPal
                </label>
              </div>
              <div className="w-16 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                PayPal
              </div>
            </div>
          </div>
        </div>

        {/* Card Details */}
        {paymentMethod === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cardNumber" className="text-[#313131] font-medium mb-2 block">
                Card Number *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                <input
                  id="cardNumber"
                  type="text"
                  value={paymentInformation.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="cardName" className="text-[#313131] font-medium mb-2 block">
                Name on Card *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                <input
                  id="cardName"
                  type="text"
                  value={paymentInformation.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                  className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

              <div>
                <label htmlFor="expiryDate" className="text-[#313131] font-medium mb-2 block">
                  Expiry Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                  <input
                    id="expiryDate"
                    type="text"
                    value={paymentInformation.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                    placeholder="MM/YY"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="cvv" className="text-[#313131] font-medium mb-2 block">
                  CVV *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                  <input
                    id="cvv"
                    type="text"
                    value={paymentInformation.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
        )}
      </div>

      {/* Billing Address */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#313131]">Billing Address</h3>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sameAsShipping"
              checked={sameAsShipping}
              onChange={(e) => setSameAsShipping(e.target.checked)}
              className="w-4 h-4 text-[#e8e810] bg-[#eaea28] border-none rounded focus:ring-[#e8e810] focus:ring-2"
            />
            <label htmlFor="sameAsShipping" className="text-[#535353] text-sm cursor-pointer">
              Same as shipping address
            </label>
          </div>
        </div>

        {!sameAsShipping && (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="billingFullName" className="text-[#313131] font-medium mb-2 block">
          Full Name *
        </label>
        <input
          id="billingFullName"
          type="text"
          value={billingInformation.billingFullName}
          onChange={(e) => handleInputChange1("billingFullName", e.target.value)}
          className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
          placeholder="Your Name"
          required
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="billingAddress" className="text-[#313131] font-medium mb-2 block">
          Street Address *
        </label>
        <input
          id="billingAddress"
          type="text"
          value={billingInformation.billingAddress}
          onChange={(e) => handleInputChange1("billingAddress", e.target.value)}
          className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
          placeholder="123 Main Street"
          required
        />
      </div>
      <div>
        <label htmlFor="billingState" className="text-[#313131] font-medium mb-2 block">
          State *
        </label>
        <input
          id="billingState"
          type="text"
          value={billingInformation.billingState}
          onChange={(e) => handleInputChange1("billingState", e.target.value)}
          className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
          placeholder="State"
          required
        />
      </div>
      <div>
        <label htmlFor="billingCity" className="text-[#313131] font-medium mb-2 block">
          City *
        </label>
        <input
          id="billingCity"
          type="text"
          value={billingInformation.billingCity}
          onChange={(e) => handleInputChange1("billingCity", e.target.value)}
          className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
          placeholder="City"
          required
        />
      </div>
      <div>
        <label htmlFor="billingZipCode" className="text-[#313131] font-medium mb-2 block">
          ZIP Code *
        </label>
        <input
          id="billingZipCode"
          type="text"
          value={billingInformation.billingZipCode}
          onChange={(e) => handleInputChange1("billingZipCode", e.target.value)}
          className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
          placeholder="10001"
          required
        />
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  )}
export default PaymentForm
