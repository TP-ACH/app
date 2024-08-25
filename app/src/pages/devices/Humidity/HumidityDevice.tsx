import React from 'react'
import { Card, LineChart, CategoryBar } from '@tremor/react'

import './HumidityDevice.scss'

// Humidity data
import dataHumidity from '../data/humidity.json'
const DeviceData = {
  values: [] as { time: string; min: number; max: number; Humidity: number }[],
  min: dataHumidity.min,
  max: dataHumidity.max,
  avg: dataHumidity.avg,
  threshold: dataHumidity.threshold as { min: number; max: number },
  interval: dataHumidity.interval,
  current: dataHumidity.current,
  unit: dataHumidity.unit,
}

DeviceData.values = dataHumidity.data.map((item) => {
  return {
    time: item.time,
    min: DeviceData.threshold.min,
    max: DeviceData.threshold.max,
    Humidity: item.value,
  }
})

const HumidityDevice = () => {
  return (
    <div id="humidity">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="rounded-tremor-small p-2 col-span-2">
          <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Humidity Level
            </h3>
          </div>
          <LineChart
            className="h-60 px-2"
            data={DeviceData.values}
            index="time"
            categories={['Humidity', 'min', 'max']}
            colors={['emerald', 'red', 'red']}
            xAxisLabel={DeviceData.interval}
            minValue={0}
            maxValue={100}
          />
        </Card>
        <Card className="h-36 rounded-tremor-small p-2">
          <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
            <span>
              Current Humidity {DeviceData.current}
              {DeviceData.unit}
            </span>
          </p>
          <CategoryBar
            values={[
              DeviceData.threshold.min,
              DeviceData.threshold.max - DeviceData.threshold.min,
              100 - DeviceData.threshold.max,
            ]}
            colors={['rose', 'emerald', 'rose']}
            markerValue={DeviceData.current}
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
              {DeviceData.max}
              {DeviceData.unit}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-center">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Min
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
              {DeviceData.min}
              {DeviceData.unit}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-center">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Avg
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
              {DeviceData.avg}
              {DeviceData.unit}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HumidityDevice
