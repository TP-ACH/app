import React from 'react'
import { useState, useEffect } from 'react'
import { SideNav, Alerts } from '../../components'
import { Card, Divider, Select, SelectItem } from '@tremor/react'
import { Client, ErrorMessage } from '../../services'
import './Home.scss'

import PHDevice from '../devices/PH/PHDevice'
import ECDevice from '../devices/EC/ECDevice'
import HumidityDevice from '../devices/Humidity/HumidityDevice'
import TemperatureDevice from '../devices/Temperature/TemperatureDevice'
import FloaterDevice from '../devices/Water/FloaterDevice'
import LightDevice from '../devices/Light/LightDevice'

const Home = () => {
  const [interval, setInterval] = useState('30-m')
  const [species, setSpecies] = useState<{ id: string; name: string }[]>([])
  const [selectedSpecies, setSelectedSpecies] = useState('default')
  const [devices, setDevices] = useState<{ id: string; name: string }[]>([])
  const [device, setDevice] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speciesRes: { species: string[] } | ErrorMessage = await Client.getSpecies<
          { species: string[] } | ErrorMessage
        >()
        if ('species' in speciesRes && Array.isArray(speciesRes.species)) {
          const speciesList = speciesRes.species.map((species) => {
            return {
              id: species,
              name: species,
            }
          })
          // add default species
          speciesList.unshift({ id: 'default', name: 'My Settings' })
          setSpecies(speciesList)
        }

        const devicesRes: string[] | ErrorMessage = await Client.getDevices<
          { devices: string[] } | ErrorMessage
        >()
        if (Array.isArray(devicesRes)) {
          const devicesList = devicesRes.map((device) => {
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
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  //handle device change
  const handleOnChangeDevice = (value: string) => {
    setDevice(value)
    setSelectedSpecies('default')
  }

  //handle species change
  const handleOnChangeSpecies = (value: string) => {
    setSelectedSpecies(value)
  }

  //handle interval change
  const handleOnChangeInterval = (value: string) => {
    setInterval(value)
  }

  return (
    <div id="home" className="h-[75px]">
      <SideNav />
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <div className="sm:flex sm:items-center sm:justify-between">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Home
            </h3>
            <div className="flex justify-end w-3/4 space-x-4 items-center">
              <div className="sm:mt-0 sm:flex sm:items-center w-full space-x-2">
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
              <div className="sm:mt-0 sm:flex sm:items-center w-full space-x-2">
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
              <div className="sm:mt-0 sm:flex sm:items-center w-full space-x-2">
                <Select
                  className="w-full [&>button]:rounded-tremor-small"
                  enableClear={false}
                  value={interval}
                  onValueChange={handleOnChangeInterval}
                  placeholder="Select interval"
                >
                  <SelectItem value="30-m">Last 30 minutes</SelectItem>
                  <SelectItem value="60-m">Last 60 minutes</SelectItem>
                  <SelectItem value="12-h">Last 12 hours</SelectItem>
                  <SelectItem value="24-h">Last 24 hours</SelectItem>
                  <SelectItem value="3-d">Last 3 days</SelectItem>
                  <SelectItem value="7-d">Last 7 days</SelectItem>
                  <SelectItem value="30-d">Last 30 days</SelectItem>
                </Select>
              </div>
            </div>
          </div>
        </header>
        <Divider />
        <Card className="rounded-tremor-small p-0">
          <div className="grid-cols-12 divide-y divide-tremor-border dark:divide-dark-tremor-border md:grid md:divide-x md:divide-y-0">
            <div className="divide-y divide-tremor-border px-2 dark:divide-dark-tremor-border md:col-span-4">
              <div className="py-2">
                <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                  <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Temperature
                  </h3>
                </div>
                <div className="py-2">
                  <TemperatureDevice
                    interval={interval}
                    species={selectedSpecies}
                    device={device}
                    onlyCurrent={true}
                  />
                </div>
              </div>
              <div className="py-2">
                <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                  <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Humidity
                  </h3>
                </div>
                <div className="py-2">
                  <HumidityDevice
                    interval={interval}
                    species={selectedSpecies}
                    device={device}
                    onlyCurrent={true}
                  />
                </div>
              </div>
              <div className="py-2">
                <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                  <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Light & Watter
                  </h3>
                </div>
                <div className="py-2 grid grid-cols-1 gap-2">
                  <LightDevice species={selectedSpecies} device={device} onlyCurrent={true} />
                  <FloaterDevice interval={interval} device={device} onlyCurrent={true} />
                </div>
              </div>
            </div>
            <div className="p-2 md:col-span-8 md:h-auto">
              <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Alerts
                </h3>
              </div>
              <Alerts device={device} />
            </div>
          </div>
        </Card>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PHDevice interval={interval} species={selectedSpecies} device={device} onlyData={true} />
          <ECDevice interval={interval} species={selectedSpecies} device={device} onlyData={true} />
        </div>
      </div>
    </div>
  )
}

export default Home
