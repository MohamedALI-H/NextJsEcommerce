"use client";
import React, { useEffect, useState, useCallback } from "react";
import { searchUsers } from "../../services/UserService";

const ListUsers = ({ users }) => {
  const [name, setName] = useState("");

  const handleSearch = useCallback(async () => {
    const data = await searchUsers("", "client");
    console.log(data);
    return data;
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <form>
              <input
                type="text"
                id="table-search-users"
                className="block mr-3 pt-1 h-9 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-large"
                placeholder="Search for users"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </form>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Avatar
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="w-4 p-4">
                    {" "}
                    <img
                      className="w-10 rounded-full"
                      src={user.avatar}
                      alt={user.name + " image"}
                    />
                  </td>
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <div className="ps-3">
                      <div className="text-base font-semibold">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex h-7 items-center justify-center ${
                        user.role === "client"
                          ? "text-red-800 bg-pink-500 rounded-full"
                          : "text-black bg-purple-500 rounded-full"
                      }`}
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 space-x-4">
                    <a
                      href={`/admin/users/view/${user._id}`}
                      type="button"
                      data-modal-target="viewUserModal"
                      data-modal-show="viewUserModal"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View user
                    </a>
                   
                    <a
                      href={`/admin/users/edit/${user._id}`}
                      type="button"
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                    >
                      Edit user
                    </a>
                    <a
                      href={`/admin/users/delete/${user._id}`}
                      type="button"
                      data-modal-target="deleteUserModal"
                      data-modal-show="deleteUserModal"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete user
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUsers;
