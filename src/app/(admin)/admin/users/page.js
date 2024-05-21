import React from 'react'
import { getAllUsers } from '../../../services/UserService'
import ListUsers from '@/app/components/admin/listUsers'

const fetchedUsers = async() =>{
    const users = await getAllUsers()
   
    return users
}
const page = async() => {


    const users = await fetchedUsers()
    console.log("usres arrrre\n"+users);
  return (
    <div className="p-4 sm:ml-64 mt-14">
    <ListUsers users={users}/>
    </div>
  )
}

export default page
