import React from 'react'
import { useState, useEffect } from 'react'
import { SideNav } from '../../components'
import {
  Divider,
  Card,
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react'

import { Client, ErrorMessage } from '../../services'

import './Devices.scss'
import PHDevice from './PH/PHDevice'
import ECDevice from './EC/ECDevice'
import TemperatureDevice from './Temperature/TemperatureDevice'
import HumidityDevice from './Humidity/HumidityDevice'
import LightDevice from './Light/LightDevice'
import FloaterDevice from './Water/FloaterDevice'

const Devices = () => {
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

  // Detect the current tab
  const location = window.location
  let currentTab = 0
  switch (location.hash) {
    case '':
      currentTab = 0
      break
    case '#ph':
      currentTab = 0
      break
    case '#ec':
      currentTab = 1
      break
    case '#temperature':
      currentTab = 2
      break
    case '#humidity':
      currentTab = 3
      break
    case '#light':
      currentTab = 4
      break
    case '#water':
      currentTab = 4
      break
    default:
      currentTab = 0
      break
  }

  return (
    <div id="devices" className="h-[75px]">
      <SideNav />
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <div className="sm:flex sm:items-center sm:justify-between">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Devices
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
        <Card className="mt-6">
          <TabGroup defaultIndex={currentTab}>
            <TabList>
              <Tab>PH</Tab>
              <Tab>EC</Tab>
              <Tab>Temperature</Tab>
              <Tab>Humidity</Tab>
              <Tab>Light & Water</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="mt-4">
                <PHDevice interval={interval} species={selectedSpecies} device={device} />
              </TabPanel>
              <TabPanel className="mt-4">
                <ECDevice interval={interval} species={selectedSpecies} device={device} />
              </TabPanel>
              <TabPanel className="mt-4">
                <TemperatureDevice interval={interval} species={selectedSpecies} device={device} />
              </TabPanel>
              <TabPanel className="mt-4">
                <HumidityDevice interval={interval} species={selectedSpecies} device={device} />
              </TabPanel>
              <TabPanel className="mt-4">
                <FloaterDevice interval={interval} device={device} />
                <div className="mt-4"></div>
                <LightDevice species={selectedSpecies} device={device} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>
    </div>
  )
}

export default Devices
