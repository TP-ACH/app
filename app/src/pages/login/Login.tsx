import React from 'react'
import { useState } from 'react'
import { Card, TextInput, Button, Title, Bold, Callout } from '@tremor/react'
import {
  RiAlarmWarningLine,
  RiCheckboxCircleLine,
  RiMailLine,
  RiLockPasswordLine,
} from '@remixicon/react'
import { Link } from 'react-router-dom'
import { Client, LoginRequest, LoginResponse, ErrorMessage } from '../../services'
import logo from '../../assets/logo.png'
import './Login.scss'

const Login = () => {
  const [pageError, setPageError] = useState('')
  const [response, setResponse] = useState('')
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPageError('')
    setState({ ...state, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPageError('')
    if (!state.email) {
      setPageError('Please enter a valid email')
      return
    }
    if (!state.password) {
      setPageError('Please enter a valid password (at least 6 characters)')
      return
    }

    // Call login function
    try {
      const data: LoginRequest = {
        username: state.email,
        password: state.password,
      }

      const res: LoginResponse | ErrorMessage = await Client.login(data)
      if ('access_token' in res) {
        setResponse('Welcome back!')
        // save token to local storage
        localStorage.setItem('token', res.access_token)
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } else if ('error' in res) {
        setPageError(res.error)
      } else {
        setPageError('Server error, please try again later')
      }
    } catch (error) {
      setPageError('Server error, please try again later')
    }
  }

  return (
    <div id="login" className="content-center text-center">
      <div className="my-20">
        <img src={logo} alt="logo" className="h-[200px] m-auto" />
      </div>
      <Card>
        <div className="mx-auto border-2 border-gray-400 rounded-lg">
          <form className="mx-auto max-w-md space-y-8 my-10" onSubmit={handleSubmit}>
            <Title className="my-5 text-center">
              <Bold className="text-black">Welcome back</Bold>
            </Title>
            {pageError ? (
              <Callout className="mt-4" title="Error" icon={RiAlarmWarningLine} color="rose">
                {pageError}
              </Callout>
            ) : null}
            {response ? (
              <Callout className="mt-4" title="Success" icon={RiCheckboxCircleLine} color="teal">
                {response}
              </Callout>
            ) : null}
            <div>
              <TextInput
                type="email"
                name="email"
                placeholder="Enter your email address"
                errorMessage="Please enter a valid email address"
                onChange={handleChange}
                value={state.email}
                icon={RiMailLine}
                required
              />
            </div>
            <div>
              <TextInput
                placeholder="Enter your password"
                name="password"
                type="password"
                errorMessage="Wrong Password"
                onChange={handleChange}
                value={state.password}
                icon={RiLockPasswordLine}
                minLength={6}
                required
              />
            </div>
            <div>
              <p>
                Don't have an account? &nbsp;
                <Link to="/register">
                  <u>Register</u>
                </Link>
              </p>
            </div>
            <div className="text-center">
              <Button type="submit" size="lg">
                <h3 className="text-lg">
                  <Bold>LOGIN</Bold>
                </h3>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Login
