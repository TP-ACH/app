import React from 'react'
// import { useState, useEffect } from 'react'
import { Card, LineChart, CategoryBar, Divider } from '@tremor/react'
import { Rule } from '../../../components'
// import { Client, SensorRquest, SensorResponse, ErrorMessage } from '../../../services'

import './PHDevice.scss'

// PH data
import dataPH from '../data/ph.json'
const deviceData = {
  values: [] as { time: string; min: number; max: number; PH: number }[],
  min: dataPH.min,
  max: dataPH.max,
  avg: dataPH.avg,
  threshold: dataPH.threshold as { min: number; max: number },
  interval: dataPH.interval,
  current: dataPH.current,
  unit: dataPH.unit,
}

deviceData.values = dataPH.data.map((item) => {
  return {
    time: item.time,
    min: deviceData.threshold.min,
    max: deviceData.threshold.max,
    PH: item.value,
  }
})

// PH data using API
/*const DeviceData = {
  values: [] as { time: string; min: number; max: number; PH: number }[],
  min: 0,
  max: 0,
  avg: 0,
  threshold: { min: 0, max: 0 },
  interval: '',
  current: 0,
  unit: '',
  title: 'PH',
}

const getIntervalDates = (interval: string) => {
  const endDate = new Date()
  const startDate = new Date()

  // interval value format is number-time e.g. 1-m, 1-h, 1-d, 1-w, 1-m, 3-m, 6-m, 1-y
  const [value, time] = interval.split('-')
  switch (time) {
    case 'm':
      startDate.setMinutes(startDate.getMinutes() - parseInt(value))
      break
    case 'h':
      startDate.setHours(startDate.getHours() - parseInt(value))
      break
    case 'd':
      startDate.setDate(startDate.getDate() - parseInt(value))
      break
    case 'w':
      startDate.setDate(startDate.getDate() - parseInt(value) * 7)
      break
    case 'M':
      startDate.setMonth(startDate.getMonth() - parseInt(value))
      break
    case 'y':
      startDate.setFullYear(startDate.getFullYear() - parseInt(value))
      break
    default:
      startDate.setHours(startDate.getHours() - 1)
      break
  }

  // return the dates in the format yyyy-mm-dd-hh mm:ss
  return {
    startDate: startDate.toISOString().split('.')[0],
    endDate: endDate.toISOString().split('.')[0],
  }
}

const getPHData = async (interval: string) => {
  console.log('Getting PH data')

  const { startDate, endDate } = getIntervalDates(interval)
  console.log('Start date:', startDate)
  console.log('End date:', endDate)

  const data: SensorRquest = {
    device_id: 'fx393',
    sensor: 'ph',
    start_date: startDate,
    end_date: endDate,
  }

  const response = await Client.sensor<SensorResponse | ErrorMessage>(data)
  console.log(response)

  if ('error' in response) {
    console.error(response.error)
    return
  }

  DeviceData.min = response.ph?.min || 0
  DeviceData.max = response.ph?.max || 0
  DeviceData.avg = response.ph?.average || 0
  DeviceData.threshold = { min: 5, max: 8 }
  DeviceData.interval = interval
  DeviceData.current = response.ph?.data[response.ph.data.length - 1].reading || 0

  DeviceData.values =
    response.ph?.data.map((item) => {
      return {
        time: item.created_at,
        min: DeviceData.threshold.min,
        max: DeviceData.threshold.max,
        PH: item.reading,
      }
    }) || []

  console.log(DeviceData)
  return DeviceData
}*/

interface PHDeviceProps {
  interval: string
}

const PHDevice: React.FC<PHDeviceProps> = ({ interval }) => {
  console.log(interval)
  /*const [deviceData, setDeviceData] = useState(DeviceData)
  const [intervalValue] = useState(interval)
  console.log(intervalValue)

  // nake sure it's called only once
  useEffect(() => {
    if (deviceData.values.length === 0) {
      const fetchData = async () => {
        const data = await getPHData(intervalValue)
        if (data) {
          setDeviceData(data)
        }
      }
      fetchData()
    }
  }, [deviceData, intervalValue])*/

  return (
    <div id="ph">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="rounded-tremor-small p-2 col-span-2">
          <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              PH Level
            </h3>
          </div>
          <LineChart
            className="h-60 px-2"
            data={deviceData.values}
            index="time"
            categories={['PH', 'min', 'max']}
            colors={['emerald', 'red', 'red']}
            xAxisLabel={deviceData.interval}
            minValue={1}
            maxValue={14}
          />
        </Card>
        <Card className="h-36 rounded-tremor-small p-2">
          <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
            <span>
              Current PH {deviceData.current} {deviceData.unit}
            </span>
          </p>
          <CategoryBar
            values={[
              deviceData.threshold.min,
              deviceData.threshold.max - deviceData.threshold.min,
              14 - deviceData.threshold.max,
            ]}
            colors={['rose', 'emerald', 'rose']}
            markerValue={deviceData.current}
          />
        </Card>
        <div className="h-36 p-0 gap-4 grid grid-cols-1 sm:grid-cols-3">
          <Card>
            <div className="flex items-center justify-center">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Max
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
              {deviceData.max} {deviceData.unit}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-center">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Min
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
              {deviceData.min} {deviceData.unit}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-center">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Avg
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
              {deviceData.avg} {deviceData.unit}
            </p>
          </Card>
        </div>
      </div>
      <Divider className="my-10">Settings</Divider>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Rule
          ruleId="ph-1"
          title="Upper PH threshold"
          recomended={10}
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
          ruleValue={9}
          maxValue={14}
          minValue={1}
          type="Automatic"
          isEnabled={true}
        />
        <Rule
          ruleId="ph-2"
          title="Lowe PH threshold"
          recomended={3}
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
          ruleValue={5}
          maxValue={14}
          minValue={1}
          type="Manual"
          isEnabled={false}
        />
      </div>
    </div>
  )
}

export default PHDevice
