import React from 'react'
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

const Devices = () => {
  return (
    <div id="devices" className="h-[75px]">
      <SideNav />
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <div className="sm:flex sm:items-center sm:justify-between">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Devices
            </h3>
            <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:space-x-2">
              <Select
                className="w-full sm:w-fit [&>button]:rounded-tremor-small"
                enableClear={false}
                defaultValue="1"
              >
                <SelectItem value="1">Last 30 minutes</SelectItem>
                <SelectItem value="2">Last 60 minutes</SelectItem>
                <SelectItem value="3">Last 12 hours</SelectItem>
                <SelectItem value="4">Last 24 hours</SelectItem>
                <SelectItem value="5">Last 7 days</SelectItem>
                <SelectItem value="6">Last 30 days</SelectItem>
              </Select>
              <Select
                className="mt-2 w-full sm:mt-0 sm:w-fit [&>button]:rounded-tremor-small"
                enableClear={false}
                defaultValue="1"
              >
                <SelectItem value="1">Kit 1</SelectItem>
                <SelectItem value="2">Kit 2</SelectItem>
                <SelectItem value="3">Kit 3</SelectItem>
              </Select>
            </div>
          </div>
        </header>
        <Divider />
        <Card className="mt-6">
          <TabGroup>
            <TabList>
              <Tab>PH</Tab>
              <Tab>EC</Tab>
              <Tab>Temperature</Tab>
              <Tab>Humidity</Tab>
              <Tab>Light & Water</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="mt-4">
                <PHDevice />
              </TabPanel>
              <TabPanel className="mt-4">
                <ECDevice />
              </TabPanel>
              <TabPanel className="mt-4">
                <TemperatureDevice />
              </TabPanel>
              <TabPanel className="mt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card className="h-36 rounded-tremor-small p-2">nivel hum.</Card>
                  <Card className="h-36 rounded-tremor-small p-2">ultimo dato</Card>
                  <Card className="h-36 rounded-tremor-small p-2">rango</Card>
                  <Card className="h-36 rounded-tremor-small p-2">max/min/avg</Card>
                </div>
              </TabPanel>
              <TabPanel className="mt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card className="h-36 rounded-tremor-small p-2">Estado actual luz</Card>
                  <Card className="h-36 rounded-tremor-small p-2">prendido apagado luz</Card>
                  <Card className="h-36 rounded-tremor-small p-2">Esado actual agua</Card>
                  <Card className="h-36 rounded-tremor-small p-2">cuando se cargo el tanke</Card>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>
    </div>
  )
}

export default Devices
