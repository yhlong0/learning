import React from 'react'

export default function Login() {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button type="submit">Log In </button>
    </form>
  )
}
