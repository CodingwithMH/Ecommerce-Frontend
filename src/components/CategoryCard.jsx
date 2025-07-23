import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import FiltersContext from '../Contexts/filtersContext'

const CategoryCard = ({name,image,items}) => {
  const {setSelectedFilters}=useContext(FiltersContext);
  
  return (
    <>
      <Link to={'/shop'}
    onClick={()=>setSelectedFilters({categories:[name]})}  
    className="bg-white hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#ebeb56] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#313131] mb-2">{name}</h3>
                    <p className="text-[#535353]">{items}</p>
                  </div>
                </div>
              </Link>
    </>
  )
}

export default CategoryCard
