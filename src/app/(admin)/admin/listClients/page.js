import React from 'react'
import {searchUsers} from '../../../services/UserService'
import ListClients from '../../../components/admin/listClients'
const fetchClients=async()=>{
  
    const fetchedUsers=await searchUsers("","client");
    console.log('eeeeeeeeeeee\n'+fetchedUsers);
    return fetchedUsers;
 
  }
   

const Page = async () => {
  const fetchedClients=await fetchClients();
  return (
    <div className="p-4 sm:ml-64 mt-14">
    <ListClients users={fetchedClients}/>
    </div>
  )
}

export default Page