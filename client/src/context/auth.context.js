import {createContext} from 'react'

const noop = () => {}

export const AuthContext = createContext({
  token: null, userId: null,
  login: noop,
  loguot: noop,
  isAuthenticated: false
})
