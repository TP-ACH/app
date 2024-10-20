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
  value: number
  min: number
  max: number
  type: string
  isEnabled: boolean
  rule: Rule
}

const getECRules = async (species: string, device: string) => {
  // if species is empty get device rules
  // else get species default rules
  let rules: RuleData[] = []

  if (species === 'default') {
    // Get rules from API
    const response = await Client.getDeviceRules<SpeciesRules | ErrorMessage>(device)
    if ('rules_by_sensor' in response) {
      response.rules_by_sensor.map((sensor) => {
        if (sensor.sensor === 'ec') {
          rules = sensor.rules.map((rule: Rule) => {
            return {
              ruleId: 'ec-' + (rule.compare === 'greater' ? 'upper' : 'lower'),
              title: rule.compare === 'greater' ? 'Upper EC threshold' : 'Lower EC threshold',
              value: rule.bound,
              min: 0,
              max: 3,
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
      response.rules_by_sensor.map((sensor) => {
        if (sensor.sensor === 'ec') {
          rules = sensor.rules.map((rule: Rule) => {
            return {
              ruleId: 'ec-' + (rule.compare === 'greater' ? 'upper' : 'lower'),
              title: rule.compare === 'greater' ? 'Upper EC threshold' : 'Lower EC threshold',
              value: rule.bound,
              min: 0,
              max: 3,
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

const getECData = async (interval: string, device: string, rules: RuleData[]) => {
  console.log('Getting EC data', rules)
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

  const { startDate, endDate } = getIntervalDates(interval)
  const data: SensorRquest = {
    device_id: device,
    sensor: 'ec',
    start_date: startDate,
    end_date: endDate,
  }

  const response = await Client.sensor<SensorResponse | ErrorMessage>(data)

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

  DeviceData.threshold = {
    min: rules.find((rule) => rule.ruleId === 'ec-lower')?.value || 0,
    max: rules.find((rule) => rule.ruleId === 'ec-upper')?.value || 0,
  }
  console.log('Threshold:', DeviceData.threshold)

  DeviceData.values =
    response.ec?.data.map((item) => {
      return {
        time: item.created_at,
        min: DeviceData.threshold.min,
        max: DeviceData.threshold.max,
        EC: item.reading,
      }
    }) || []

  console.log('TEST', Math.round((DeviceData.threshold.min + 0.01) * 100) / 100)

  return DeviceData
}

interface ECDeviceProps {
  interval: string
  species: string
  device: string
}

const ECDevice: React.FC<ECDeviceProps> = ({ interval, species, device }) => {
  const [ruleData, setRules] = useState<RuleData[]>([])
  const [data, setData] = useState<DeviceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rule = await getECRules(species, device)
        setRules(rule)

        const ec = await getECData(interval, device, rule)
        if (!ec || ec.values.length === 0) {
          setError('No data available')
          setData(null)
        } else {
          setError('')
          setData(ec)
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
        min: newRules.find((rule) => rule.ruleId === 'ec-lower')?.value || 0,
        max: newRules.find((rule) => rule.ruleId === 'ec-upper')?.value || 0,
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
                showXAxis={false}
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
              <RuleComponent
                key={rule.ruleId}
                device={device}
                sensor="ec"
                ruleData={rule.rule}
                ruleId={rule.ruleId}
                title={rule.title}
                ruleValue={rule.value}
                step={0.01}
                maxValue={
                  rule.ruleId === 'ec-lower'
                    ? Math.round((data.threshold.max - 0.01) * 100) / 100
                    : 3
                }
                minValue={
                  rule.ruleId === 'ec-upper'
                    ? Math.round((data.threshold.min + 0.01) * 100) / 100
                    : 0.01
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
