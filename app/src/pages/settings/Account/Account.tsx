import React from 'react'
import { useState, useEffect } from 'react'
import { TextInput, Divider, Callout } from '@tremor/react'
import { Client, User, ErrorMessage } from '../../../services'
import { RiAlarmWarningLine, RiCheckboxCircleLine } from '@remixicon/react'

import './Account.scss'

const getUserData = async () => {
  try {
    const data = await Client.user()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

const Account = () => {
  // Get usr data
  const [userData, setUserData] = useState<User>({
    username: '',
    first_name: '',
    last_name: '',
    old_password: '',
    new_password: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [response, setResponse] = useState('')

  useEffect(() => {
    // Get user data from api
    const fetchData = async () => {
      try {
        const data = await getUserData()
        if (!data || 'error' in data) {
          setError('No data available')
        } else {
          setError('')
          setUserData(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('')
    setResponse('')
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  async function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResponse('')
    if (!userData.first_name) {
      setError('Please enter a valid first name')
      setLoading(false)
      return
    }
    if (!userData.last_name) {
      setError('Please enter a valid last name')
      setLoading(false)
      return
    }

    console.log(userData)
    if (userData.old_password || userData.new_password) {
      console.log('password')
      if (!userData.old_password) {
        setError('Please enter your current password')
        setLoading(false)
        return
      }
      if (!userData.new_password) {
        setError('Please enter a new password')
        setLoading(false)
        return
      }
    }

    // Call login function
    try {
      const data: User = {
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
      }

      if (userData.old_password && userData.new_password) {
        data.old_password = userData.old_password
        data.new_password = userData.new_password
      }

      console.log(data)

      const res: User | ErrorMessage = await Client.updateUser(data)
      if ('first_name' in res) {
        setUserData(res)
        setResponse('Information updated')
        setTimeout(() => {
          setResponse('')
        }, 2000)
      } else if ('error' in res) {
        setError(res.error)
      } else {
        setError('Server error, please try again later')
      }
    } catch (error) {
      setError('Server error, please try again later')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div id="settings-account">
      {error ? (
        <Callout className="mt-4" title="Error" icon={RiAlarmWarningLine} color="rose">
          {error}
        </Callout>
      ) : null}
      {response ? (
        <Callout className="mt-4" title="Success" icon={RiCheckboxCircleLine} color="teal">
          {response}
        </Callout>
      ) : null}
      <form onSubmit={handleNameSubmit} className="mt-6">
        <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Information
        </h4>
        <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Update your Name. Username cannot be changed.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="mt-6">
            <label
              htmlFor="email"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Username
            </label>
            <TextInput
              type="text"
              id="username"
              name="username"
              placeholder={userData.username}
              value={userData.username}
              disabled
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="email"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              First Name
            </label>
            <TextInput
              type="text"
              id="first_name"
              name="first_name"
              placeholder={userData.first_name}
              value={userData.first_name}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="email"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Last Name
            </label>
            <TextInput
              type="text"
              id="last_name"
              name="last_name"
              placeholder={userData.last_name}
              value={userData.last_name}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            />
          </div>
        </div>

        <Divider />
        <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Password
        </h4>
        <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Update your password
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="mt-6">
            <label
              htmlFor="old_password"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Current password
            </label>
            <TextInput
              type="password"
              id="old_password"
              name="old_password"
              placeholder=""
              onChange={handleInputChange}
              autoComplete="old_password"
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="new_password"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              New password
            </label>
            <TextInput
              type="password"
              id="new_password"
              name="new_password"
              placeholder=""
              onChange={handleInputChange}
              autoComplete="new_password"
              className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            />
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="mt-6 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          >
            Save settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default Account
