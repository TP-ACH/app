import React from 'react'
import { Card, Icon, Tracker } from '@tremor/react'
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react'

import './WaterDevice.scss'

// Water data
import dataWater from '../data/water.json'
const DeviceData = {
  values: [] as { color: string; tooltip: string }[],
  interval: dataWater.interval,
  current: dataWater.current,
  unit: dataWater.unit,
}

DeviceData.values = dataWater.data.map((item) => {
  return {
    color: item.value ? 'emerald' : 'rose',
    tooltip: item.time + (item.value ? ' Full' : ' Empty'),
  }
})

const WaterDevice = () => {
  return (
    <div id="water">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
        <Card>
          {DeviceData.current ? (
            <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
              <p className="text-center font-mono text-sm text-slate-500">Water tank is full</p>
              <Icon size="xl" icon={RiCheckboxCircleFill} />
            </p>
          ) : (
            <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
              <p className="text-center font-mono text-sm text-slate-500">Water tank is empty</p>
              <Icon size="xl" icon={RiErrorWarningFill} color="rose" />
            </p>
          )}
        </Card>
        <Card>
          <p className="text-tremor-default flex items-center justify-between">
            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              Water level for last {DeviceData.interval}
            </span>
          </p>
          <Tracker data={DeviceData.values} className="mt-2" />
        </Card>
      </div>
    </div>
  )
}

export default WaterDevice
