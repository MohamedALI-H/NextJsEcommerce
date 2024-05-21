'use client'
import React, { useState } from 'react';

import { SessionProvider,useSession, signIn, signOut } from "next-auth/react"
const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!session){
return(
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
         <button onClick={() => signIn()} className="bg-white p-2 px-4 rounded-lg h-10">sign in </button>
        </div>
)
  }
  
  return(
  
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <button
    type="button"
    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    id="user-menu-button"
    aria-expanded={isMenuOpen}
    onClick={toggleMenu}
  >
    <span className="sr-only">Open user menu</span>
    <img className="w-8 h-8 rounded-full" src="https://picsum.photos/200/300" alt="user photo" />
  </button>

  {isMenuOpen && (
    <div
    className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-20 right-2"



      id="user-dropdown"
    >
      {session ? (
        <>
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">{session.name}</span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{session.email}</span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            {items.map((item, index) => (
              <li key={index}>
                <a href={item.link} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  {item.text}
                </a>
              </li>
            ))}
            <li>
              <button onClick={signOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Sign Out
              </button>
            </li>
          </ul>
        </>
      ) : null}
    </div>
  )}
</div>
)
};

export default UserMenu;
