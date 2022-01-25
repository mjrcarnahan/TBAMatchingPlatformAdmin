import { API } from '../utils/constants'

export async function loginUser(dispatch, data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  try {
    dispatch({ type: 'REQUEST_LOGIN' })
    let response = await fetch(`${API}/login`, requestOptions)
    let json = await response.json()
    if (json.data?.user) {
      if (json.data.user.rol_id !== 3) {
        dispatch({ type: 'LOGIN_ERROR', error: 'Email and password not match' })
        return
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: json.data })
      localStorage.setItem('state', JSON.stringify(json.data))
      dispatch({ type: 'LOGIN_ERROR', error: null })
      return json.data
    }
    if (json.error) dispatch({ type: 'LOGIN_ERROR', error: json.error })
    else dispatch({ type: 'LOGIN_ERROR', error: json.errors })
    return
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error })
  }
}

export async function logout(dispatch) {
  localStorage.removeItem('state')
  dispatch({ type: 'LOGOUT' })
}
