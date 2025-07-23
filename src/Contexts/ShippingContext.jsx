import { createContext } from "react";
const ShippingContext=createContext({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  export default ShippingContext;