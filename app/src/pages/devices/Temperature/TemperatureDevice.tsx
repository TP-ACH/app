import React from 'react'
import { useState, useEffect } from 'react'
import { Card, LineChart, CategoryBar, Divider } from '@tremor/react'
import { Rule as RuleComponent } from '../../../components'
import {
  Client,
  SensorRquest,
  SensorResponse,
  Rule,
  SpeciesRules,
  ErrorMessage,
} from '../../../services'
import { getIntervalDates } from '../../../services/Helper'

import './TemperatureDevice.scss'

interface DeviceData {
  values: { time: string; min: number; max: number; Temperature: number }[]
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
  value: number
  min: number
  max: number
  type: string
  isEnabled: boolean
  rule: Rule
}

const getTemperatureRules = async (species: string, device: string) => {
  // if species is empty get device rules
  // else get species default rules
  let rules: RuleData[] = []

  if (species === 'default') {
    // Get rules from API
    const response = await Client.getDeviceRules<SpeciesRules | ErrorMessage>(device)
    if ('rules_by_sensor' in response) {
      response.rules_by_sensor?.map((sensor) => {
        if (sensor.sensor === 'temperature') {
          rules = sensor.rules.map((rule: Rule) => {
            return {
              ruleId: 'temperature-' + (rule.compare === 'greater' ? 'upper' : 'lower'),
              title:
                rule.compare === 'greater'
                  ? 'Upper Temperature threshold'
                  : 'Lower Temperature threshold',
              value: rule.bound,
              min: 1,
              max: 50,
              type: rule.action.type,
              isEnabled: rule.enabled,
              rule: rule,
            }
          })
        }
      })
    }
  } else {
    // Get default rules from API
    const response = await Client.getDefaultRules<SpeciesRules | ErrorMessage>(species)
    if ('rules_by_sensor' in response) {
      response.rules_by_sensor?.map((sensor) => {
        if (sensor.sensor === 'temperature') {
          rules = sensor.rules.map((rule: Rule) => {
            return {
              ruleId: 'temperature-' + (rule.compare === 'greater' ? 'upper' : 'lower'),
              title:
                rule.compare === 'greater'
                  ? 'Upper Temperature threshold'
                  : 'Lower Temperature threshold',
              value: rule.bound,
              min: 1,
              max: 50,
              type: rule.action.type,
              isEnabled: rule.enabled,
              rule: rule,
            }
          })
        }
      })
    }
  }

  return rules
}

const getTemperatureData = async (interval: string, device: string, rules: RuleData[]) => {
  const DeviceData: DeviceData = {
    values: [] as { time: string; min: number; max: number; Temperature: number }[],
    min: 0,
    max: 0,
    avg: 0,
    threshold: { min: 0, max: 0 },
    interval: '',
    current: 0,
    unit: '°C',
    title: 'Temperature',
  }

  const { startDate, endDate } = getIntervalDates(interval)
  const data: SensorRquest = {
    device_id: device,
    sensor: 'temperature',
    start_date: startDate,
    end_date: endDate,
  }

  const response = await Client.sensor<SensorResponse | ErrorMessage>(data)

  if ('temperature' in response && response.temperature?.data.length === 0) {
    console.error('No data available')
    return DeviceData
  }

  if ('error' in response) {
    console.error(response.error)
    return DeviceData
  }

  DeviceData.min = Math.round((response.temperature?.min || 0) * 100) / 100
  DeviceData.max = Math.round((response.temperature?.max || 0) * 100) / 100
  DeviceData.avg = Math.round((response.temperature?.average || 0) * 100) / 100
  DeviceData.interval = interval
  DeviceData.current =
    Math.round(
      (response.temperature?.data[response.temperature.data.length - 1].reading || 0) * 100
    ) / 100

  DeviceData.threshold = {
    min: rules.find((rule) => rule.ruleId === 'temperature-lower')?.value || 0,
    max: rules.find((rule) => rule.ruleId === 'temperature-upper')?.value || 0,
  }

  DeviceData.values =
    response.temperature?.data.map((item) => {
      return {
        time: item.created_at,
        min: DeviceData.threshold.min,
        max: DeviceData.threshold.max,
        Temperature: item.reading,
      }
    }) || []

  return DeviceData
}

interface TemperatureDeviceProps {
  interval: string
  species: string
  device: string
  onlyCurrent?: boolean
}

const TemperatureDevice: React.FC<TemperatureDeviceProps> = ({
  interval,
  species,
  device,
  onlyCurrent,
}) => {
  const [ruleData, setRules] = useState<RuleData[]>([])
  const [data, setData] = useState<DeviceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (!interval || !species || !device) {
        setData(null)
        setLoading(false)
        setError('Please select interval, species and device to view temperature data')
        return
      }
      try {
        const rule = await getTemperatureRules(species, device)
        setRules(rule)

        const temperature = await getTemperatureData(interval, device, rule)
        if (!temperature || temperature.values.length === 0) {
          setError('No data available')
          setData(null)
        } else {
          setError('')
          setData(temperature)
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
  }, [interval, species, device])

  const handleRuleChange = (rule: { ruleId: string; value: number }) => {
    const newRules = ruleData.map((item) => {
      if (item.ruleId === rule.ruleId) {
        return { ...item, value: rule.value }
      }
      return item
    })

    if (data) {
      data.threshold = {
        min: newRules.find((rule) => rule.ruleId === 'temperature-lower')?.value || 0,
        max: newRules.find((rule) => rule.ruleId === 'temperature-upper')?.value || 0,
      }

      data.values = data.values.map((item) => {
        return {
          ...item,
          min: data.threshold.min,
          max: data.threshold.max,
        }
      })

      setData(data)
    }

    setRules(newRules)
  }

  if (loading)
    return (
      <Card>
        <div>Loading...</div>
      </Card>
    )
  if (error)
    return (
      <Card>
        <div>{error}</div>
      </Card>
    )

  if (onlyCurrent)
    return (
      <div>
        {data ? (
          <div id="temperature">
            <Card className="h-36 rounded-tremor-small p-2">
              <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
                <span>
                  Current Temperature {data.current} {data.unit}
                </span>
              </p>
              <CategoryBar
                values={[
                  data.threshold.min,
                  data.threshold.max - data.threshold.min,
                  45 - data.threshold.max,
                ]}
                colors={['rose', 'emerald', 'rose']}
                markerValue={data.current}
                className="px-4"
              />
            </Card>
          </div>
        ) : (
          <Card>
            <div>No data available</div>
          </Card>
        )}
      </div>
    )

  return (
    <div>
      {data ? (
        <div id="temperature">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="rounded-tremor-small p-2 col-span-2">
              <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Temperature Level
                </h3>
              </div>
              <LineChart
                className="h-60 px-2"
                data={data.values}
                index="time"
                showXAxis={false}
                categories={['Temperature', 'min', 'max']}
                colors={['emerald', 'red', 'red']}
                minValue={0}
                maxValue={50}
              />
            </Card>
            <Card className="h-36 rounded-tremor-small p-2">
              <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4">
                <span>
                  Current Temperature {data.current} {data.unit}
                </span>
              </p>
              <CategoryBar
                values={[
                  data.threshold.min,
                  data.threshold.max - data.threshold.min,
                  45 - data.threshold.max,
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
              <RuleComponent
                key={rule.ruleId}
                device={device}
                sensor="temperature"
                ruleData={rule.rule}
                ruleId={rule.ruleId}
                title={rule.title}
                ruleValue={rule.value}
                step={1}
                maxValue={
                  rule.ruleId === 'temperature-lower'
                    ? Math.round((data.threshold.max - 0.1) * 100) / 100
                    : 50
                }
                minValue={
                  rule.ruleId === 'temperature-upper'
                    ? Math.round((data.threshold.min + 0.1) * 100) / 100
                    : 1
                }
                type={rule.type}
                isEnabled={rule.isEnabled}
                onValueChange={(value) => handleRuleChange({ ruleId: rule.ruleId, value })}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <div>No data available</div>
        </Card>
      )}
    </div>
  )
}

export default TemperatureDevice
