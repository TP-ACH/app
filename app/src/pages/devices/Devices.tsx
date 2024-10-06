import React from 'react'
import { useState } from 'react'
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

import './Devices.scss'
import PHDevice from './PH/PHDevice'
import ECDevice from './EC/ECDevice'
import TemperatureDevice from './Temperature/TemperatureDevice'
import HumidityDevice from './Humidity/HumidityDevice'
import LightDevice from './Light/LightDevice'
import WaterDevice from './Water/WaterDevice'

const Devices = () => {
  const [interval, setInterval] = useState('30-d')

  //handle interval change
  const handleOnChangeInterval = (value: string) => {
    console.log('Selected interval:', value)
    setInterval(value)
  }

  console.log('Current interval state:', interval)

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
            <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:space-x-2 w-1/4">
              <Select
                className="w-full sm:w-fit [&>button]:rounded-tremor-small min-w-full"
                enableClear={false}
                value={interval}
                onValueChange={handleOnChangeInterval}
              >
                <SelectItem value="30-m">Last 30 minutes</SelectItem>
                <SelectItem value="60-m">Last 60 minutes</SelectItem>
                <SelectItem value="12-h">Last 12 hours</SelectItem>
                <SelectItem value="24-h">Last 24 hours</SelectItem>
                <SelectItem value="7-d">Last 7 days</SelectItem>
                <SelectItem value="30-d">Last 30 days</SelectItem>
              </Select>
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
                <PHDevice interval={interval} />
              </TabPanel>
              <TabPanel className="mt-4">
                <ECDevice />
              </TabPanel>
              <TabPanel className="mt-4">
                <TemperatureDevice />
              </TabPanel>
              <TabPanel className="mt-4">
                <HumidityDevice />
              </TabPanel>
              <TabPanel className="mt-4">
                <WaterDevice />
                <LightDevice />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>
    </div>
  )
}

export default Devices
