import { createContext } from "react";
const FiltersContext=createContext({
    categories: [],
    priceRange: "",
    rating: "",
  });
  export default FiltersContext;