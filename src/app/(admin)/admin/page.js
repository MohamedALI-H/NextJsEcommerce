import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Dashboard from '../../components/admin/dashBoard';
import { getAllCategories } from '../../services/CategoryService';
import { getAllProducts } from '../../services/ProdcutService';

const fetchCategories = async()=>{
  const result=await getAllCategories();
  if (result) {
    console.log("ffdggdfsgbsdgd"+result);
    return result;
  }
  return null;
}
  const fetchProducts = async()=>{
    const result=await getAllProducts();
    if (result) {
      return result;  
    }
    return null;
  }

const Page = async() => {
  const categories=await fetchCategories();
  
  const products=await fetchProducts();
  
  return (

      <div className="p-4 sm:ml-64 mt-14">
    <>
        <p>Welcome</p>
          <CssBaseline />
          <Container>
          <Dashboard/>
          </Container>
        </>
      </div>
    
  );
};

export default Page;
