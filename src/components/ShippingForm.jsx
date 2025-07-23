import React, { useContext, useState } from 'react'
import { User,Phone,MapPin,Mail } from 'lucide-react'
import { useSelector } from 'react-redux';
import ShippingContext from '../Contexts/ShippingContext';
  const ShippingForm = () => {
    const {shippingInformation,setShippingInformation}=useContext(ShippingContext)
    const stateCityData = {
  'Sindh': [
    'Karachi',
    'Hyderabad',
    'Sukkur',
    'Larkana',
    'Nawabshah',
  ],
  'Punjab': [
    'Lahore',
    'Faisalabad',
    'Rawalpindi',
    'Multan',
    'Gujranwala',
    'Sialkot',
    'Bahawalpur',
    'Sargodha',
    'Rahim Yar Khan',
  ],
  'Capital Territory': [
    'Islamabad',
  ],
  'Khyber Pakhtunkhwa': [
    'Peshawar',
    'Mardan',
    'Abbottabad',
    'Swat',
    'Kohat',
    'Bannu',
  ],
  'Balochistan': [
    'Quetta',
    'Gwadar',
    'Turbat',
    'Sibi',
    'Zhob',
  ],
  'Gilgit-Baltistan': [
    'Gilgit',
    'Skardu',
  ],
  'Azad Jammu and Kashmir': [
    'Muzaffarabad',
    'Mirpur',
  ],
};

  const handleInputChange = (field, value) => {
    setShippingInformation((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
    return(
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#313131] mb-6">Shipping Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="fullName" className="text-[#313131] font-medium mb-2 block">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
              <input
                id="fullName"
                type="text"
                value={shippingInformation.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                placeholder="Your Name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-[#313131] font-medium mb-2 block">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
              <input
                id="email"
                type="email"
                value={shippingInformation.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                placeholder="youremail@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="text-[#313131] font-medium mb-2 block">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
              <input
                id="phone"
                type="tel"
                value={shippingInformation.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                placeholder="+923 (11) 1234-567"
                required
              />
            </div>
          </div>

            <div>
              <label htmlFor="state" className="text-[#313131] font-medium mb-2 block">
                State *
              </label>
              <select
                id="state"
                value={shippingInformation.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353] appearance-none"
                required
              >
                <option value="">Select State</option>
                {Object.keys(stateCityData).map((state) => (
  <option key={state} value={state}>
    {state}
  </option>
))}
              </select>
            </div>
            <div>
              <label htmlFor="city" className="text-[#313131] font-medium mb-2 block">
                City *
              </label>
              <select
                id="city"
                type="text"
                value={shippingInformation.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                placeholder="Faisalabad"
                required
                >
                  <option value="">Select State</option>
                {shippingInformation.state &&
  stateCityData[shippingInformation.state]?.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}

                </select>
            </div>
            <div>
              <label htmlFor="zipCode" className="text-[#313131] font-medium mb-2 block">
                ZIP Code *
              </label>
              <input
                id="zipCode"
                type="text"
                value={shippingInformation.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                placeholder="10001"
                required
                />
            </div>
                <div>
            <label htmlFor="address" className="text-[#313131] font-medium mb-2 block">
              Street Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
              <input
                id="address"
                type="text"
                value={shippingInformation.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] w-full border-none pl-12 py-3 rounded-lg text-[#313131] placeholder:text-[#535353]"
                placeholder="123 Main Street"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

export default ShippingForm
