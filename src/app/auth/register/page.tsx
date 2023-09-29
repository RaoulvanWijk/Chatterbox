"use client"

import React, { useRef } from 'react'
import Link from 'next/link'

export default function register() {
  const username = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      })
    })
  }
  return (
    <form className='auth-form' onSubmit={submitHandler}>
      <h1 className='title'>Welcome new user!</h1>
      <p className='text'>We are happy for you to join us!</p>
      <label htmlFor="username">
        Username
      </label>
      <input type="text" name="username" id="username" ref={username} />
      <label htmlFor="email">
        Email
      </label>
      <input type="email" name="email" id="email" ref={email} />
      <label htmlFor="password">
        Password
      </label>
      <input type="password" name="password" id="password" ref={password} />
      <button className='main-btn' type="submit">Register</button>
      <Link className='disclaimer' href='/auth/login'>Already have an account? <span>Login</span></Link>
    </form>
  )
}
