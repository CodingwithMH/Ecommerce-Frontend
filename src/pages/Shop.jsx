import { Link, useSearchParams,useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import {
  Search,
  Star,
  Grid3X3,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
} from "lucide-react"
import ProductCard from "../components/ProductCard"
import ProductListItem from "../components/ProductListItem"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, fetchProductsByFilters } from "../store/Product/productSlice"
import FiltersContext from "../Contexts/FiltersContext"

const Shop=()=> {
  
  const {loading,filteredProducts,error}=useSelector((state)=>state.products)
  const dispatch=useDispatch()
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(true)
  const {selectedFilters, setSelectedFilters} = useContext(FiltersContext)
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setSelectedFilters((prev) => {
    if (type === "checkbox") {
      const currentValues = prev[name] || [];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter((v) => v !== value) };
      }
    }

    if (type === "radio") {
      return { ...prev, [name]: value };
    }

    return prev;
  });
};


  const [searchParams, setSearchParams] = useSearchParams();
const currentPage = parseInt(searchParams.get("page")) || 1;
const itemsPerPage = 6;

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentProducts = filteredProducts.slice(startIndex, endIndex);

const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  
  useEffect(()=>{
    dispatch(fetchProductsByFilters({filters:selectedFilters}))
  },[])
  const categories=['Kids','Electronics','Furniture','Men','Women','Accessories' ]

  return (
  <>
    <div className="min-h-screen bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto py-5">
          {/* Search Header */}
          <div className="mb-8 mx-4">
            <h1 className="text-2xl font-bold text-[#313131] mb-2">Search Results</h1>
            <p className="text-[#535353]">Showing {startIndex}-{endIndex} of {filteredProducts.length} results</p>
          </div>

          <div className="flex gap-8 flex-wrap justify-center">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-80 flex-shrink-0">
                <div className="bg-white shadow-lg border border-gray-200 rounded-2xl sticky top-8">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-[#313131]">Filters</h2>
                      <button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilters(false)}
                        className="text-[#535353] hover:text-[#313131]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Categories Filter */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#313131] mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="categories"
                              value={category}
                              id={category}
                              checked={selectedFilters.categories.includes(category)}

                              onChange={handleChange}
                              className="w-4 h-4 text-[#e8e810] bg-[#eaea28] border-none rounded focus:ring-[#e8e810] focus:ring-2"
                            />
                            <label htmlFor={category} className="text-[#535353] text-sm cursor-pointer">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#313131] mb-3">Price Range</h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          {["Under Rs. 500", "Under Rs. 1000", "Under Rs. 2000", "Under Rs. 5000", "Above Rs. 5000"].map((range) => (
                            <div key={range} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="priceRange"
                                id={range}
                                onChange={handleChange}
                                value={range.replaceAll(' ','_')}
                                className="w-4 h-4 text-[#e8e810] bg-[#eaea28] border-none focus:ring-[#e8e810] focus:ring-2"
                              />
                              <label htmlFor={range} className="text-[#535353] text-sm cursor-pointer">
                                {range}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#313131] mb-3">Customer Rating</h3>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="rating"
                              value={String(rating)}
                              id={`rating-${rating}`}
                              onChange={handleChange}
                              className="w-4 h-4 text-[#e8e810] bg-[#eaea28] border-none rounded focus:ring-[#e8e810] focus:ring-2"
                            />
                            <label htmlFor={`rating-${rating}`} className="flex items-center gap-1 cursor-pointer">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rating ? "text-[#e8e810] fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-[#535353] text-sm">& Up</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* <button onClick={applyFilters} className="w-full bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold py-3 rounded-lg">
                      Apply Filters
                    </button> */}
                  </div>
                </div>
              </div>
            )}

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {!showFilters && (
                    <button
                      variant="outline"
                      onClick={() => setShowFilters(true)}
                      className="border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white bg-transparent"
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </button>
                  )}
                  <span className="text-[#535353]">{filteredProducts.length} products found</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                    <button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-[#ebeb56] text-[#313131]" : "text-[#535353]"}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-[#ebeb56] text-[#313131]" : "text-[#535353]"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {viewMode === "grid" ? 
                (loading ?
                  (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[...Array(6)].map((_,index) => (
                    <ProductCard key={index} product={{}} />
                  ))}
                  </div>):
                  (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                  </div>)
                )
               : 
                (loading ? 
                  (<div className="space-y-4 mb-8">
                  {[...Array(6)].map((_,index) => (
                    <ProductListItem key={index} product={{}} />
                  ))}
                </div>):
                  (<div className="space-y-4 mb-8">
                  {currentProducts.map((product) => (
                    <ProductListItem key={product._id} product={product} />
                  ))}
                </div>))
              }

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchParams({ page: Math.max(currentPage - 1, 1) })}
                  disabled={currentPage==1}
                  className="border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(totalPages)].map((_,index) => (
                  <button
                    key={index}
                    onClick={()=>{setSearchParams({ page: index + 1 })}}
                    variant={index+1 === 1 ? "default" : "outline"}
                    size="sm"
                    className={
                      index+1 === currentPage
                        ? "bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] px-1"
                        : "border-[#313131] text-[#313131] px-1 hover:bg-[#313131] hover:text-white bg-transparent"
                    }
                  >
                    {index+1}
                  </button>
                ))}
                <button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchParams({ page: Math.max(currentPage + 1, totalPages) })}
                  disabled={currentPage === totalPages}
                  className="border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
        <Footer/>
  </>
  )
}
export default Shop;