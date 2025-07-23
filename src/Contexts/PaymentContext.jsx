import { createContext } from "react";
const PaymentContext=createContext({
    billingFullName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
  });
export const PaymentMethodContext=createContext("card");
export const PaymentCardContext=createContext({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  export default PaymentContext;