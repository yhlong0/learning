import React, { useReducer } from 'react'

async function loginAPI({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'test' && password === 'test') {
        resolve()
      } else {
        reject()
      }
    }, 1000)
  })
}

function loginReducer(state, action) {
  const target = action.payload.target
  switch (action.type) {
    case 'input_change':
      return {
        ...state,
        [target.name]: target.value,
      }
    case 'login':
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case 'login_success':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      }
    case 'login_fail':
      return {
        ...state,
        error: 'Incorrect username or password',
        isLoading: false,
        isLoggedIn: false,
      }
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        password: '',
      }
    default:
      return state
  }
}

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
}

export default function Login() {
  const [state, dispatch] = useReducer(loginReducer, initialState)
  const { username, password, isLoggedIn, error, isLoading } = state

  const onSubmit = async event => {
    event.preventDefault()
    dispatch({ type: 'login' })

    try {
      await loginAPI()
      dispatch({ type: 'login_success' })
    } catch (e) {
      dispatch({ type: 'login_fail' })
    }
  }
  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Hello {username}</h1>
          <button onClick={dispatch({ type: 'logout' })}>Log Out</button>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={e => dispatch({ type: 'input_change', payload: e })}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => dispatch({ type: 'input_change', payload: e })}
          />
          <button type="submit">Log In</button>
        </form>
      )}
    </div>
  )
}
