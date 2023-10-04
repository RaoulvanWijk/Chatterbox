"use client";

import Image from 'next/image'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect } from 'react';


export default function Home() {
  const { data: session, status, update } = useSession()
  useEffect(() => {
  }, [session])
  
  return (
    <>
      {/* check if session is loading */}
      {/* check if session is set */}
      <h1>Home</h1>
      
      <button onClick={() => signIn()}>Login</button>
    </>
  )
}
