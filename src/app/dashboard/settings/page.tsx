"use client"
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { increment, decrement } from "@/redux/features/counterSlice";
import { useGetUserQuery, useGetUsersQuery } from "@/redux/services/userApi";

type User = {
  id: number,
  name: string,
  email: string,
  username: string
}

function SettingsPage() {
  const count = useAppSelector(state => state.counterReducer.counter)
  const dispatch = useAppDispatch()
  const [fetchUsers, setFetchUsers] = useState(false);

  // Llama a la API solo cuando fetchUsers es true
  const { data, error, isLoading, isFetching, refetch } = useGetUsersQuery(null, {
    skip: !fetchUsers, // No realizar la llamada inicialmente
  });

  const handleGetUsers = () => {
    setFetchUsers(true); // Activar la bandera para realizar la llamada a la API
    if(data){
      refetch(); // Llamar a refetch para realizar la llamada a la API cuando sea necesario
    }
  };


  return (
    <>
      <h1 className='text-center text-2xl py-2'>Total: {count}</h1>
      <div className="flex justify-center gap-x-2 bg-red-100 py-2">
        <button className='bg-blue-500 px-3 py-2 rounded-md' onClick={() => { dispatch(decrement()) }}>Decrement</button>
        <button className='bg-green-500 px-3 py-2 rounded-md' onClick={() => { dispatch(increment()) }}>Increment</button>
        <button className='bg-green-500 px-3 py-2 rounded-md' onClick={handleGetUsers}>Get Users</button>
        <br />
      </div>

      <div className='grid grid-cols-3 mx-auto gap-3'>
        { 
          data?.map((user, index )=> (
            <div className='p-4 bg-zinc-800' key={index}>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.username}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SettingsPage