"use client";

import Image from 'next/image'
import { useEffect } from 'react';
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <h1>Home</h1>
      
      <Link href="/auth/login">Login</Link>
    </>
  )
}
