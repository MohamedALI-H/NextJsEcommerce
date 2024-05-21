'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import Products from '../../components/admin/listProducts';


const Page = () => {
  const router = useRouter();

  // Use default value for pathname if router is not initialized yet
  const pathname = router?.pathname ?? '';

  return (
  
      <div className="p-4 sm:ml-64 mt-14">
       
        {pathname.includes('products') ? <Products /> : <p>Welcome</p>}
      </div>
    
  );
};

export default Page;
