import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Router } from './router'
import { AuthProvider } from './context'
import Login from './pages/Login'
import Table from './pages/Table'
import Matches from './pages/Matches'
import Profile from './pages/Profile'
import Error404 from './pages/Error404'
import './App.css'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = JSON.parse(localStorage.getItem('state'))?.token
    ? JSON.parse(localStorage.getItem('state'))?.token
    : null
  return <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Error404 />)} />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path={Router.auth.login} component={Login} />
            <PrivateRoute exact path={Router.admin.ip} component={Table} />
            <PrivateRoute exact path={Router.admin.surrogates} component={Table} />
            <PrivateRoute exact path={`${Router.admin.ip}/:id`} component={Profile} />
            <PrivateRoute exact path={`${Router.admin.surrogates}/:id`} component={Profile} />
            <PrivateRoute exact path={Router.admin.matches} component={Matches} />
            <Route path="*" component={Error404} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
