import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
      <footer className="bg-[#313131] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>

            <div className='bg-[#ebeb56] rounded-md'>
              <img src="./logo.svg" alt="" />
            </div>
              <p className="text-gray-400">
                Your trusted online shopping destination for quality products at great prices.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="#" className="hover:text-white">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Men
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Women
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="#" className="hover:text-white">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SHOPICART. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
