import React from 'react'
import {searchUsers} from '../../../services/UserService'
import ListAdmins from '../../../components/admin/listAdmins'
const fetchAdmins=async()=>{
  
    const fetchedAdmins=await searchUsers("","admin");
    console.log('eeeeeeeeeeee\n'+fetchedAdmins);
    return fetchedAdmins;
 
   
}
const Page = async () => {
  const fetchedAdmins=await fetchAdmins();
  return (
    <div className="p-4 sm:ml-64 mt-14">
    <ListAdmins users={fetchedAdmins}/>
    </div>
  )
}

export default Page