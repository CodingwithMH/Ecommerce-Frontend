import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Singup'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductDetailsPage from './pages/ProductDetails'
import CreateProductForm from './pages/CreateProduct'
import Checkout from './pages/Checkout'
import FiltersContext from './Contexts/filtersContext'
import ShippingContext from './Contexts/ShippingContext'
import PaymentContext, { PaymentCardContext, PaymentMethodContext } from './Contexts/PaymentContext'
import Profile from './pages/Profile'
import MobileNavbar from './components/MobileNavbar'
function App() {
  const [paymentInformation, setPaymentInformation] = useState({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    })
    const [paymentMethod, setPaymentMethod] = useState("card")
   const [billingInformation,setBillingInformation]=useState({
      billingFullName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
    })
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: "",
    rating: "",
  })
  const [shippingInformation,setShippingInformation]=useState({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    })
  return (
    <>
    <PaymentContext.Provider value={{billingInformation,setBillingInformation}}>
<PaymentMethodContext.Provider value={{paymentMethod,setPaymentMethod}}>
<PaymentCardContext value={{paymentInformation,setPaymentInformation}}>

    <FiltersContext.Provider value={{selectedFilters,setSelectedFilters}}>
      <ShippingContext.Provider value={{shippingInformation,setShippingInformation}}>
    <BrowserRouter>
    <Navbar/>
    <MobileNavbar/>
    <main className='max-w-screen h-auto md:overflow-hidden'>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='product/:id' element={<ProductDetailsPage/>}/>
        <Route path='createproduct' element={<CreateProductForm/>}/>
      </Routes>
    </main>
    </BrowserRouter>
      </ShippingContext.Provider>
    </FiltersContext.Provider>
</PaymentCardContext>
</PaymentMethodContext.Provider>
    </PaymentContext.Provider>
    </>
  )
}

export default App
