import React from 'react'
import { useState, useEffect } from 'react'
import { Card, LineChart, CategoryBar, Divider } from '@tremor/react'
import { Rule } from '../../../components'
import { Client, SensorRquest, SensorResponse, ErrorMessage } from '../../../services'
import { getIntervalDates } from '../../../services/Helper'

import './ECDevice.scss'

interface DeviceData {
  values: { time: string; min: number; max: number; EC: number }[]
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

const getECRules = async () => {
  // Get rules from API
  const rules = [
    {
      ruleId: 'ec-upper',
      title: 'Upper EC threshold',
      recomended: 2.5,
      description: 'Upper EC threshold',
      value: 2.8,
      min: 0,
      max: 3,
      type: 'Automatic',
      isEnabled: true,
    },
    {
      ruleId: 'ec-lower',
      title: 'Lowe EC threshold',
      recomended: 1,
      description: 'Lower EC threshold',
      value: 1.5,
      min: 0,
      max: 3,
      type: 'Manual',
      isEnabled: false,
    },
  ]

  return rules
}

const getECData = async (interval: string, rules: RuleData[]) => {
  const DeviceData: DeviceData = {
    values: [] as { time: string; min: number; max: number; EC: number }[],
    min: 0,
    max: 0,
    avg: 0,
    threshold: { min: 0, max: 0 },
    interval: '',
    current: 0,
    unit: '',
    title: 'EC',
  }

  console.log('Getting EC data')

  const { startDate, endDate } = getIntervalDates(interval)
  console.log('Start date:', startDate)
  console.log('End date:', endDate)

  const data: SensorRquest = {
    device_id: 'fx393',
    sensor: 'ec',
    start_date: startDate,
    end_date: endDate,
  }

  const response = await Client.sensor<SensorResponse | ErrorMessage>(data)
  console.log(response)

  if ('ec' in response && response.ec?.data.length === 0) {
    console.error('No data available')
    return DeviceData
  }

  if ('error' in response) {
    console.error(response.error)
    return DeviceData
  }

  DeviceData.min = Math.round((response.ec?.min || 0) * 100) / 100
  DeviceData.max = Math.round((response.ec?.max || 0) * 100) / 100
  DeviceData.avg = Math.round((response.ec?.average || 0) * 100) / 100
  DeviceData.interval = interval
  DeviceData.current =
    Math.round((response.ec?.data[response.ec.data.length - 1].reading || 0) * 100) / 100

  DeviceData.threshold = { min: rules[1].value, max: rules[0].value }

  DeviceData.values =
    response.ec?.data.map((item) => {
      return {
        time: item.created_at,
        min: DeviceData.threshold.min,
        max: DeviceData.threshold.max,
        EC: item.reading,
      }
    }) || []

  console.log(DeviceData)
  return DeviceData
}

interface ECDeviceProps {
  interval: string
}

const ECDevice: React.FC<ECDeviceProps> = ({ interval }) => {
  const [ruleData, setRules] = useState<RuleData[]>([])
  const [data, setData] = useState<DeviceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ruleData = await getECRules()
        setRules(ruleData)
        const data = await getECData(interval, ruleData)
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
                data={data.values}
                index="time"
                categories={['EC', 'min', 'max']}
                colors={['emerald', 'red', 'red']}
                minValue={0}
                maxValue={3}
              />
            </Card>
            <Card className="h-36 rounded-tremor-small p-2">
              <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
                <span>
                  Current EC {data.current} {data.unit}
                </span>
              </p>
              <CategoryBar
                values={[
                  data.threshold.min,
                  data.threshold.max - data.threshold.min,
                  3 - data.threshold.max,
                ]}
                colors={['rose', 'emerald', 'rose']}
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
                maxValue={
                  rule.ruleId === 'ec-lower'
                    ? Math.round((data.threshold.max - 0.01) * 100) / 100
                    : 3
                }
                minValue={
                  rule.ruleId === 'ec-upper'
                    ? Math.round((data.threshold.min + 0.01) * 100) / 100
                    : 0
                }
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

export default ECDevice
