import React from 'react'
import { useState, useEffect } from 'react'
import { Divider, Select, SelectItem, Callout } from '@tremor/react'
import { Client, DeviceRules, SpeciesRules, ErrorMessage } from '../../../services'
import { RiAlarmWarningLine, RiCheckboxCircleLine } from '@remixicon/react'

import './General.scss'

const General = () => {
  const [species, setSpecies] = useState<{ id: string; name: string }[]>([])
  const [selectedSpecies, setSelectedSpecies] = useState('')
  const [devices, setDevices] = useState<{ id: string; name: string }[]>([])
  const [device, setDevice] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      let speciesList: { id: string; name: string }[] = []
      let devicesList: { id: string; name: string }[] = []
      try {
        const speciesRes: { species: string[] } | ErrorMessage = await Client.getSpecies<
          { species: string[] } | ErrorMessage
        >()
        if ('species' in speciesRes && Array.isArray(speciesRes.species)) {
          speciesList = speciesRes.species.map((species) => {
            return {
              id: species,
              name: species,
            }
          })
          setSpecies(speciesList)
        }

        const devicesRes: string[] | ErrorMessage = await Client.getDevices<
          { devices: string[] } | ErrorMessage
        >()
        if (Array.isArray(devicesRes)) {
          devicesList = devicesRes.map((device) => {
            return {
              id: device,
              name: device,
            }
          })
          setDevices(devicesList)
          if (localStorage.getItem('device')) {
            setDevice(localStorage.getItem('device') || '')
          } else if (devicesList.length > 0) {
            setDevice(devicesList[0].id)
          }
        }

        const defaultSpecies: DeviceRules | ErrorMessage = await Client.getDeviceRules(
          devicesList[0].id
        )
        if ('species' in defaultSpecies && defaultSpecies.species) {
          setSelectedSpecies(defaultSpecies.species)
        } else {
          setSelectedSpecies(speciesList[0].id)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  //handle device change
  const handleOnChangeDevice = (value: string) => {
    setDevice(value)
  }

  //handle species change
  const handleOnChangeSpecies = (value: string) => {
    setSelectedSpecies(value)
  }

  async function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResponse('')
    if (!selectedSpecies) {
      setError('Please select a species')
      return
    }
    if (!device) {
      setError('Please select a device')
      return
    }

    try {
      const defaultRules: SpeciesRules | ErrorMessage =
        await Client.getDefaultRules(selectedSpecies)
      console.log(defaultRules)
      if ('error' in defaultRules) {
        setError('Server error, please try again later')
        return
      }

      const data: DeviceRules = {
        device: device,
        species: selectedSpecies,
        rules_by_sensor: defaultRules.rules_by_sensor,
        light_hours: defaultRules.light_hours,
      }

      // putDeviceRules
      const response: ErrorMessage | { message: string } = await Client.putDeviceRules(data)
      if ('error' in response) {
        setError('Server error, please try again later')
        return
      }
      // set device local storage
      localStorage.setItem('device', device)
      setResponse('Defaults updated successfully')
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
    <div id="settings-general">
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
        <h3 className="mt-6 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Workspace settings
        </h3>
        <p className="mt-2 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Optimize your workspace with customizable settings and advanced features
        </p>
        <div className="mt-8 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
          <div>
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Device
            </h4>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Select the default device for your workspace.
            </p>
          </div>
          <div className="mt-6 sm:flex sm:items-center sm:space-x-2 w-full">
            <Select
              className="w-full [&>button]:rounded-tremor-small"
              enableClear={false}
              value={device}
              onValueChange={handleOnChangeDevice}
              placeholder="Select device"
            >
              {devices.map((device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Species
            </h4>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Select the species of the crop you are growing. This will override selected device
              rules.
            </p>
          </div>
          <div className="mt-6 sm:flex sm:items-center sm:space-x-2 w-full">
            <Select
              className="w-full [&>button]:rounded-tremor-small"
              enableClear={false}
              value={selectedSpecies}
              onValueChange={handleOnChangeSpecies}
              placeholder="Select species"
            >
              {species.map((species) => (
                <SelectItem key={species.id} value={species.id}>
                  {species.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <Divider className="my-10" />
        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            className="whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          >
            Save settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default General
