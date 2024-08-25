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

    setResponse('Logged in successfully')

    // Call login function
    /*const loginData: LoginProps = {
      email: state.email,
      password: state.password,
    }
    try {
      const res = await login(loginData)
      if (res.error) {
        setPageError(res.error)
      } else {
        await setResponse('Hello' + res.user.name)
        setTimeout(() => {
          //router.push('/home')
        }, 2000)
      }
    } catch (error) {
      setPageError('Server error, please try again later')
    }*/
  }

  return (
    <div id="login" className="content-center text-center">
      <Title className="my-20">LOGO</Title>
      <Card>
        <div className="mx-auto border-2 border-gray-400 rounded-lg">
          <form className="mx-auto max-w-sm space-y-8 my-10" onSubmit={handleSubmit}>
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
                Don't have an account?
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
