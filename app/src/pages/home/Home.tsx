import React from 'react'
import { useState, useEffect } from 'react'
import { SideNav, Alerts } from '../../components'
import { Card, Divider, Select, SelectItem, CategoryBar, LineChart, Icon } from '@tremor/react'
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react'
import { Client, ErrorMessage } from '../../services'
import './Home.scss'

// PH data
import dataPH from './data/ph.json'
const PHdata = {
  values: [] as { time: string; min: number; max: number; PH: number }[],
  min: dataPH.min,
  max: dataPH.max,
  interval: dataPH.interval,
}

PHdata.values = dataPH.data.map((item) => {
  return {
    time: item.time,
    min: PHdata.min,
    max: PHdata.max,
    PH: item.PH,
  }
})

// EC data
import dataEC from './data/ec.json'
const ECdata = {
  values: [] as { time: string; min: number; max: number; EC: number }[],
  min: dataEC.min,
  max: dataEC.max,
  interval: dataEC.interval,
}

ECdata.values = dataEC.data.map((item) => {
  return {
    time: item.time,
    min: ECdata.min,
    max: ECdata.max,
    EC: item.EC,
  }
})

const Home = () => {
  /*const [isWaterTankFull, setIsWaterTankFull] = useState(true)
  const [isLightOn, setIsLightOn] = useState(true)*/
  const isWaterTankFull = true
  const isLightOn = true
  const [devices, setDevices] = useState<{ id: string; name: string }[]>([])
  const [device, setDevice] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
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
            <div className="flex justify-end w-1/4 items-center">
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
                    Temprerature
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex justify-center m-auto">
                    <Card>
                      <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center pb-4">
                        <span>23°C</span>
                      </p>
                      <CategoryBar
                        values={[5, 5, 5, 5, 5, 5, 5, 5, 10]}
                        colors={[
                          'rose',
                          'orange',
                          'yellow',
                          'emerald',
                          'emerald',
                          'emerald',
                          'yellow',
                          'orange',
                          'rose',
                        ]}
                        markerValue={23}
                      />
                    </Card>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                  <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Humidity
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex justify-center m-auto">
                    <Card>
                      <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center pb-4">
                        <span>78%</span>
                      </p>
                      <CategoryBar
                        values={[25, 20, 20, 35]}
                        colors={['rose', 'orange', 'yellow', 'emerald']}
                        markerValue={78}
                      />
                    </Card>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                  <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Light & Watter
                  </h3>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <Card>
                    {isLightOn ? (
                      <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center flex flex-col justify-center	justify-items-center">
                        <span className="text-center">Light is on</span>
                        <Icon size="xl" icon={RiCheckboxCircleFill} />
                      </p>
                    ) : (
                      <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center flex flex-col justify-center	justify-items-center">
                        <span className="text-center">Light is off</span>
                        <Icon size="xl" icon={RiErrorWarningFill} color="rose" />
                      </p>
                    )}
                  </Card>
                  <Card>
                    {isWaterTankFull ? (
                      <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center flex flex-col justify-center	justify-items-center">
                        <span className="text-center">Water tank is full</span>
                        <Icon size="xl" icon={RiCheckboxCircleFill} />
                      </p>
                    ) : (
                      <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center flex flex-col justify-center	justify-items-center">
                        <span className="text-center">Water tank is empty</span>
                        <Icon size="xl" icon={RiErrorWarningFill} color="rose" />
                      </p>
                    )}
                  </Card>
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
          <Card className="rounded-tremor-small p-0">
            <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
              <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                PH Level
              </h3>
            </div>
            <LineChart
              className="h-60 px-2"
              data={PHdata.values}
              index="time"
              showXAxis={false}
              categories={['PH', 'min', 'max']}
              colors={['emerald', 'red', 'red']}
              xAxisLabel={PHdata.interval}
              minValue={1}
              maxValue={14}
            />
          </Card>
          <Card className="rounded-tremor-small p-0">
            <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
              <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                EC Level
              </h3>
            </div>
            <LineChart
              className="h-60 px-2"
              data={ECdata.values}
              index="time"
              showXAxis={false}
              categories={['EC', 'min', 'max']}
              colors={['emerald', 'red', 'red']}
              xAxisLabel={ECdata.interval}
              minValue={0}
              maxValue={10}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
