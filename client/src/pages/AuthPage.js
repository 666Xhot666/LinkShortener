import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import{useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/auth.context'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading,error,request, clearError} = useHttp()
  const [form, setForm] = useState({
    email:'', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message,clearError])

  useEffect(() => {window.M.updateTextFields() } ,[])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]:event.target.value })
  }

  const registerHandler = async () => {
    try {
    const data = await request('/api/auth/register', 'POST', {...form})
    message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
    const data = await request('/api/auth/login', 'POST', {...form})
    auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div  className="col s6 offset-s3">
        <h1> LinkShortener</h1>
        <div className="card blue darken-4">
      <div className="card-content white-text">
        <span className="card-title">Sign in or Sign up </span>
        <div>
        <div className="row">
        <div className="input-field col s11">
          <input id="email" type="email" name="email" className="validate yellow-input white-text" value={form.email} onChange={changeHandler} />
          <label htmlFor="email">Email</label>
        </div>
        </div>
        <div className="row">
        <div className="input-field col s8">
        <input id="password" type="password" name="password" className="validate yellow-input white-text" value={form.password} onChange={changeHandler}  />
        <label htmlFor="password">Password</label>
        </div>
        </div>
        </div>
      </div>
      <div className="card-action">
        <button
        className="btn orange accent-2 darken-4 black-text"
         style={{marginRight: 10}}
         onClick={loginHandler}
         disabled={loading}
          >
          Sign in
          </button>
        <button
        className="btn grey lighten-2 black-text"

        onClick={registerHandler}
        disabled={loading}
        >
        Sign up
        </button>
      </div>
    </div>
      </div>
    </div>
  )
}
