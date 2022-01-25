export const initialState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {}

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        loading: false
      }

    case 'LOGOUT':
      return {
        ...state,
        user: '',
        token: '',
        progress: ''
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
