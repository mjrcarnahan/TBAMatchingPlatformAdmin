import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, loginUser } from '../../context'
import { Router } from '../../router'
import { texts } from '../../utils/texts'
import './index.css'

const Login = ({ history }) => {
  const { state, dispatch } = useContext(AuthContext)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleInput = ({ target }) =>
    setForm({
      ...form,
      [target.name]: target.value
    })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await loginUser(dispatch, form)
  }

  useEffect(() => {
    if (state?.token) history.push(Router.admin.ip)
  }, [history, state])

  return (
    <div className="login">
      <Link to="/" className="logo">
        <img src="/images/logo.svg" alt="" />
      </Link>
      <div className="circle">
        <div className="circle-container">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
        </div>
      </div>
      <div className="login-left">
        <img src="/images/logoWhite.png" alt="" />
      </div>
      <form className="login-right" method="POST" onSubmit={handleSubmit}>
        <h2 className="title">{texts.login.title}</h2>
        <div className="input">
          <input
            name="email"
            type="email"
            className="w-100"
            placeholder={texts.login.input1}
            onChange={handleInput}
            value={form.email}
            required
          />
          {state?.error?.email &&
            state.error.email.map((error, key) => (
              <p className="error" key={key}>
                {error}
              </p>
            ))}
        </div>
        <div className="input">
          <input
            name="password"
            type="password"
            className="w-100"
            placeholder={texts.login.input2}
            onChange={handleInput}
            value={form.password}
            required
          />
          {state?.error?.password &&
            state.error.password.map((error, key) => (
              <p className="error" key={key}>
                {error}
              </p>
            ))}
        </div>
        {state.error && typeof state.error === 'string' && (
          <div className="input">
            <div className="error">{state.error}</div>
          </div>
        )}

        <button type="submit" className="btn-primary">
          {texts.login.button}
        </button>
      </form>
    </div>
  )
}

export default Login
