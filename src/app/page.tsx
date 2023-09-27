"use client";

import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react";


export default function Home() {
  return (
    <>
      <button onClick={() => signIn()}>Login</button>
    </>
  )
}
