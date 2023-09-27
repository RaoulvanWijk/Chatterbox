import React from 'react'
import Link from 'next/link'

export default function login() {
  return (
    <form className='auth-form' action="">
      <h1 className='title'>Welcome back!</h1>
      <p className='text'>We are happy to see you back!</p>
      <label htmlFor="email">
        Email
      </label>
      <input type="text" name="email" id="email" />
      <label htmlFor="password">
        Password
      </label>
      <input type="password" name="password" id="password" />
      <button className='main-btn' type="submit">Login</button>
      <Link href='/auth/register'>Don't have an account yet? <span className='text-main'>Register</span></Link>
    </form>
  )
}
