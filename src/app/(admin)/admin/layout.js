'use client'
import React from 'react';
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import SideBar from '../../components/admin/sideBar';
export default async function Layout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <SideBar> 
      <div className="p-4 sm:ml-64 mt-14"> <section className='py-24'>
<div className='container'>
<h1 className='text-2xl font-bold'>
You are not authorized to view this page
</h1> </div>
</section></div>
     
    </SideBar>
    
)
  return (

    <SideBar> <div>{children}</div></SideBar>
 

);
  if (!session || session && session.user.role !== 'admin') {
   }
  
}
