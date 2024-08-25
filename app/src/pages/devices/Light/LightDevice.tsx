import React from 'react'
import { Card, Icon, Tracker } from '@tremor/react'
import { RiLightbulbFill } from '@remixicon/react'

import './LightDevice.scss'

// Light data
import dataLight from '../data/light.json'
const DeviceData = {
  values: [] as { color: string; tooltip: string }[],
  interval: dataLight.interval,
  current: dataLight.current,
  unit: dataLight.unit,
}

DeviceData.values = dataLight.data.map((item) => {
  return {
    color: item.value ? 'emerald' : 'gray',
    tooltip: item.time + (item.value ? ' Full' : ' Empty'),
  }
})

const LightDevice = () => {
  return (
    <div id="light">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          {DeviceData.current ? (
            <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
              <p className="text-center font-mono text-sm text-slate-500">Light is ON</p>
              <Icon size="xl" icon={RiLightbulbFill} />
            </p>
          ) : (
            <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
              <p className="text-center font-mono text-sm text-slate-500">Light is OFF</p>
              <Icon size="xl" icon={RiLightbulbFill} color="gray" />
            </p>
          )}
        </Card>
        <Card>
          <p className="text-tremor-default flex items-center justify-between">
            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              Light level for last {DeviceData.interval}
            </span>
          </p>
          <Tracker data={DeviceData.values} className="mt-2" />
        </Card>
      </div>
    </div>
  )
}

export default LightDevice
