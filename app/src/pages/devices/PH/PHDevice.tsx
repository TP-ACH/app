import React from 'react'
import { Card, LineChart, CategoryBar, Divider } from '@tremor/react'
import { Rule } from '../../../components'

import './PHDevice.scss'

// PH data
import dataPH from '../data/ph.json'
const DeviceData = {
  values: [] as { time: string; min: number; max: number; PH: number }[],
  min: dataPH.min,
  max: dataPH.max,
  avg: dataPH.avg,
  threshold: dataPH.threshold as { min: number; max: number },
  interval: dataPH.interval,
  current: dataPH.current,
  unit: dataPH.unit,
}

DeviceData.values = dataPH.data.map((item) => {
  return {
    time: item.time,
    min: DeviceData.threshold.min,
    max: DeviceData.threshold.max,
    PH: item.value,
  }
})

const PHDevice = () => {
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
            data={DeviceData.values}
            index="time"
            categories={['PH', 'min', 'max']}
            colors={['emerald', 'red', 'red']}
            xAxisLabel={DeviceData.interval}
            minValue={1}
            maxValue={14}
          />
        </Card>
        <Card className="h-36 rounded-tremor-small p-2">
          <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
            <span>
              Current PH {DeviceData.current} {DeviceData.unit}
            </span>
          </p>
          <CategoryBar
            values={[
              DeviceData.threshold.min,
              DeviceData.threshold.max - DeviceData.threshold.min,
              14 - DeviceData.threshold.max,
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
              {DeviceData.max} {DeviceData.unit}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-center">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Min
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
              {DeviceData.min} {DeviceData.unit}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-center">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Avg
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
              {DeviceData.avg} {DeviceData.unit}
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
