import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext, logout } from '../../context'
import { Router } from '../../router'
import './index.css'

const Header = () => {
  const { state, dispatch } = useContext(AuthContext)
  const history = useHistory()
  const exit = () => {
    logout(dispatch)
    history.push(Router.auth.login)
  }
  return (
    <header className="header">
      <img className="header-logo-circle" src="/images/logo-circle.svg" alt="" />
      <Link to="/" className="header-logo">
        <img className="header-logo-main" src="/images/logo.svg" alt="" />
      </Link>
      <nav>
        <NavLink to={Router.admin.ip}>Intended Parents</NavLink>
        <NavLink to={Router.admin.surrogates}>Surrogates</NavLink>
        <NavLink to={Router.admin.matches}>Matches</NavLink>
        <div className="separator"></div>
        <div className="profile" onClick={exit}>
          <h6>{`${state.user.first_name} ${state.user.last_name}`}</h6>
          {/* <img src="/images/profile.png" alt="" /> */}
        </div>
      </nav>
    </header>
  )
}

export default Header
