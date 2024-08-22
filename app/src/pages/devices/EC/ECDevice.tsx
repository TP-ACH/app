import React from 'react'
import { Card, LineChart, CategoryBar } from '@tremor/react'

import './ECDevice.scss'

// EC data
import dataEC from '../data/ec.json'
const DeviceData = {
  values: [] as { time: string; min: number; max: number; EC: number }[],
  min: dataEC.min,
  max: dataEC.max,
  avg: dataEC.avg,
  threshold: dataEC.threshold as { min: number; max: number },
  interval: dataEC.interval,
  current: dataEC.current,
  unit: dataEC.unit,
}

DeviceData.values = dataEC.data.map((item) => {
  return {
    time: item.time,
    min: DeviceData.threshold.min,
    max: DeviceData.threshold.max,
    EC: item.value,
  }
})

const ECDevice = () => {
  return (
    <div id="ec">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="rounded-tremor-small p-2 col-span-2">
          <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              EC Level
            </h3>
          </div>
          <LineChart
            className="h-60 px-2"
            data={DeviceData.values}
            index="time"
            categories={['EC', 'min', 'max']}
            colors={['emerald', 'red', 'red']}
            xAxisLabel={DeviceData.interval}
            minValue={0}
            maxValue={10}
          />
        </Card>
        <Card className="h-36 rounded-tremor-small p-2">
          <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
            <span>
              Current EC {DeviceData.current} {DeviceData.unit}
            </span>
          </p>
          <CategoryBar
            values={[
              DeviceData.threshold.min,
              DeviceData.threshold.max - DeviceData.threshold.min,
              10 - DeviceData.threshold.max,
            ]}
            colors={['rose', 'emerald', 'rose']}
            markerValue={DeviceData.current}
          />
        </Card>
        <div className="h-36 p-0 gap-4 grid grid-cols-1 sm:grid-cols-3">
          <Card>
            <div className="flex items-center justify-between">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Max
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {DeviceData.max} {DeviceData.unit}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Min
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {DeviceData.min} {DeviceData.unit}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Avg
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {DeviceData.avg} {DeviceData.unit}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ECDevice
