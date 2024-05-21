import React from 'react'
import Products from '@/app/components/admin/listProducts'

import { getAllProducts } from '../../../services/ProdcutService'
const fetchedProducts = async()=>{
const result=await getAllProducts();

if (result) {

  return result;
  
}}
const product = async () => {
  const products = await fetchedProducts()

  return (
    
   <div className="p-4 sm:ml-64 mt-14">
       
        <Products products={products} /> 
     </div>
      

  )
}

export default product