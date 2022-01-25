import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Router } from '../../router'

const Error404 = () => {
  const history = useHistory()
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
      <div className="login-right">
        <div className="text-center">
          <h2 className="title-3">Page not found</h2>
          <button
            type="button"
            onClick={() => {
              history.push(Router.auth.login)
            }}
            className="btn-link mt-20"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error404
