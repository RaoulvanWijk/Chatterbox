"use client"

import React, { useRef } from 'react'
import Link from 'next/link'

export default function register() {
  const username = useRef<HTMLInputElement>()
  const email = useRef<HTMLInputElement>()
  const password = useRef<HTMLInputElement>()
  return (
    <form className='auth-form' action="">
      <h1 className='title'>Welcome new user!</h1>
      <p className='text'>We are happy for you to join us!</p>
      <label htmlFor="username">
        Username
      </label>
      <input type="text" name="username" id="username" ref={username} />
      <label htmlFor="email">
        Email
      </label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">
        Password
      </label>
      <input type="password" name="password" id="password" />
      <button className='main-btn' type="submit">Register</button>
      <Link href='/auth/login'>Already have an account? <span className='text-main'>Login</span></Link>
    </form>
  )
}
