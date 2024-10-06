import React from 'react'
import { useState, useEffect } from 'react'
import { Card, LineChart, CategoryBar, Divider } from '@tremor/react'
import { Rule } from '../../../components'
import { Client, SensorRquest, SensorResponse, ErrorMessage } from '../../../services'
import { getIntervalDates } from '../../../services/Helper'

import './PHDevice.scss'

interface DeviceData {
  values: { time: string; min: number; max: number; PH: number }[]
  min: number
  max: number
  avg: number
  threshold: { min: number; max: number }
  interval: string
  current: number
  unit: string
  title: string
}
interface RuleData {
  ruleId: string
  title: string
  recomended: number
  description: string
  value: number
  min: number
  max: number
  type: string
  isEnabled: boolean
}

const getPHRules = async () => {
  // Get rules from API
  const rules = [
    {
      ruleId: 'ph-upper',
      title: 'Upper PH threshold',
      recomended: 8,
      description: 'Upper PH threshold',
      value: 8,
      min: 1,
      max: 13,
      type: 'Automatic',
      isEnabled: true,
    },
    {
      ruleId: 'ph-lower',
      title: 'Lowe PH threshold',
      recomended: 3,
      description: 'Lower PH threshold',
      value: 3,
      min: 1,
      max: 13,
      type: 'Manual',
      isEnabled: false,
    },
  ]

  return rules
}

const getPHData = async (interval: string, rules: RuleData[]) => {
  const DeviceData: DeviceData = {
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

  if ('ph' in response && response.ph?.data.length === 0) {
    console.error('No data available')
    return DeviceData
  }

  if ('error' in response) {
    console.error(response.error)
    return DeviceData
  }

  DeviceData.min = Math.round((response.ph?.min || 0) * 100) / 100
  DeviceData.max = Math.round((response.ph?.max || 0) * 100) / 100
  DeviceData.avg = Math.round((response.ph?.average || 0) * 100) / 100
  DeviceData.interval = interval
  DeviceData.current =
    Math.round((response.ph?.data[response.ph.data.length - 1].reading || 0) * 100) / 100

  DeviceData.threshold = { min: rules[1].value, max: rules[0].value }

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
}

interface PHDeviceProps {
  interval: string
}

const PHDevice: React.FC<PHDeviceProps> = ({ interval }) => {
  const [ruleData, setRules] = useState<RuleData[]>([])
  const [data, setData] = useState<DeviceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ruleData = await getPHRules()
        setRules(ruleData)
        const data = await getPHData(interval, ruleData)
        if (!data || data.values.length === 0) {
          setError('No data available')
          setData(null)
        } else {
          setError('')
          setData(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [interval])

  const handleRuleChange = (rule: { ruleId: string; value: number }) => {
    console.log('Rule changed:', rule)
    const newRules = ruleData.map((item) => {
      if (item.ruleId === rule.ruleId) {
        return { ...item, value: rule.value }
      }
      return item
    })

    if (data) {
      setData({
        ...data,
        threshold: { min: newRules[1].value, max: newRules[0].value },
      })
    }

    setRules(newRules)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      {data ? (
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
                data={data.values}
                index="time"
                categories={['PH', 'min', 'max']}
                colors={['emerald', 'red', 'red']}
                minValue={1}
                maxValue={14}
              />
            </Card>
            <Card className="h-36 rounded-tremor-small p-2">
              <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
                <span>
                  Current PH {data.current} {data.unit}
                </span>
              </p>
              <CategoryBar
                values={[
                  1,
                  data.threshold.min - 1,
                  data.threshold.max - data.threshold.min,
                  14 - data.threshold.max - 1,
                  1,
                ]}
                colors={['slate', 'rose', 'emerald', 'rose', 'slate']}
                markerValue={data.current}
                className="px-4"
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
                  {data.max} {data.unit}
                </p>
              </Card>
              <Card>
                <div className="flex items-center justify-center">
                  <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Min
                  </h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
                  {data.min} {data.unit}
                </p>
              </Card>
              <Card>
                <div className="flex items-center justify-center">
                  <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Avg
                  </h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center">
                  {data.avg} {data.unit}
                </p>
              </Card>
            </div>
          </div>
          <Divider className="my-10">Settings</Divider>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ruleData.map((rule) => (
              <Rule
                key={rule.ruleId}
                ruleId={rule.ruleId}
                title={rule.title}
                recomended={rule.recomended}
                description={rule.description}
                ruleValue={rule.value}
                maxValue={rule.ruleId === 'ph-lower' ? data.threshold.max - 0.1 : 13}
                minValue={rule.ruleId === 'ph-upper' ? data.threshold.min + 0.1 : 1}
                type={rule.type}
                isEnabled={rule.isEnabled}
                onValueChange={(value) => handleRuleChange({ ruleId: rule.ruleId, value })}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default PHDevice
