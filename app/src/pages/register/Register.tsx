import React from 'react'
import { useState } from 'react'
import { Title, Card, TextInput, Callout, Bold, Button } from '@tremor/react'
import {
  RiAlarmWarningLine,
  RiCheckboxCircleLine,
  RiMailLine,
  RiLockPasswordLine,
} from '@remixicon/react'
import { Link } from 'react-router-dom'
//import { Client, RegisterRequest, RegisterResponse,ErrorMessage } from '../../services'
import './Register.scss'

const Register = () => {
  const [pageError, setPageError] = useState('')
  const [response, setResponse] = useState('')
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    deviceId: '',
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
    if (!state.firstName) {
      setPageError('Please enter your first name')
      return
    }
    if (!state.lastName) {
      setPageError('Please enter your last name')
      return
    }
    if (!state.deviceId) {
      setPageError('Please enter your device ID')
      return
    }

    if (state.password !== state.confirmPassword) {
      setPageError('Passwords do not match')
      return
    }

    // Call register function
    try {
      /*const data: RegisterRequest = {
        username: state.email,
        password: state.password,
        first_name: state.firstName,
        last_name: state.lastName,
        device_id: state.deviceId,
      }

      const res: RegisterResponse | ErrorMessage = await Client.login(data)*/

      const res = {
        ok: true,
      }
      console.log(res)
      if ('ok' in res) {
        setResponse('Successfully registered!')
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } /*else if ('error' in res) {
        setPageError(res.error)
      }*/ else {
        setPageError('Server error, please try again later')
      }
    } catch (error) {
      setPageError('Server error, please try again later')
    }
  }

  return (
    <div id="register" className="content-center text-center">
      <Title className="my-20">LOGO</Title>
      <Card>
        <div className="mx-auto border-2 border-gray-400 rounded-lg">
          <form className="mx-auto max-w-md space-y-8 my-10" onSubmit={handleSubmit}>
            <Title className="my-5 text-center">
              <Bold className="text-black">Register</Bold>
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

            <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Email
                  <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextInput
                    type="email"
                    name="email"
                    className="mt-2"
                    placeholder="Email address"
                    errorMessage="Please enter a valid email address"
                    onChange={handleChange}
                    value={state.email}
                    icon={RiMailLine}
                    required
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="password"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Password
                  <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextInput
                    placeholder="Password"
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
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="confirm-password"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Confirm Password
                  <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextInput
                    placeholder="******"
                    name="confirmPassword"
                    type="password"
                    errorMessage="Passwords do not match"
                    onChange={handleChange}
                    value={state.confirmPassword}
                    icon={RiLockPasswordLine}
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="deviceId"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Device ID
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  name="deviceId"
                  placeholder="Device ID"
                  errorMessage="Please enter your device ID"
                  onChange={handleChange}
                  value={state.deviceId}
                  className="mt-2"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  First name
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  errorMessage="Please enter your first name"
                  onChange={handleChange}
                  value={state.firstName}
                  className="mt-2"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Last name
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  errorMessage="Please enter your last name"
                  onChange={handleChange}
                  value={state.lastName}
                  className="mt-2"
                  required
                />
              </div>
            </div>
            <div className="text-center flex justify-center space-x-4">
              <Link to={'/login'}>
                <Button type="submit" size="lg" variant="secondary">
                  <h3 className="text-lg">
                    <Bold>CANCEL</Bold>
                  </h3>
                </Button>
              </Link>
              <Button type="submit" size="lg">
                <h3 className="text-lg">
                  <Bold>CONFIRM</Bold>
                </h3>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Register
