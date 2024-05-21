import React from 'react'
import Categories from '@/app/components/admin/Categories'

import { getAllCategories } from '../../../services/CategoryService'
const fetchedCategories = async()=>{
const result=await getAllCategories();

if (result) {

  return result;
  
}}
const categories = async () => {
  const categories = await fetchedCategories()

  return (
    
   <div className="p-4 sm:ml-64 mt-14">
       
        <Categories categories={categories} /> 
     </div>
      

  )
}

export default categories