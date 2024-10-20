import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Tracker, Divider, Button, Callout } from '@tremor/react'
import { Client, LightHours, DeviceRules, SpeciesRules, ErrorMessage } from '../../../services'
import { RiCheckboxCircleLine } from '@remixicon/react'

import './LightDevice.scss'

const getLightRules = async (species: string, device: string) => {
  let rule: LightHours | null = null

  if (species === 'default') {
    // Get rules from API
    const response = await Client.getDeviceRules<DeviceRules | ErrorMessage>(device)
    if ('light_hours' in response) {
      rule = response.light_hours ?? null
    }
  } else {
    // Get default rules from API
    const response = await Client.getDefaultRules<SpeciesRules | ErrorMessage>(species)
    if ('light_hours' in response) {
      rule = response.light_hours ?? null
    }
  }

  return rule
}
interface LightDeviceProps {
  species: string
  device: string
}

const LightDevice: React.FC<LightDeviceProps> = ({ species, device }) => {
  const [ruleData, setRules] = useState<LightHours | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dailyTracker, setDailyTracker] = useState([
    { key: '00:00', color: 'red', tooltip: 'Off at 00:00' },
    { key: '01:00', color: 'red', tooltip: 'Off at 01:00' },
    { key: '02:00', color: 'red', tooltip: 'Off at 02:00' },
    { key: '03:00', color: 'red', tooltip: 'Off at 03:00' },
    { key: '04:00', color: 'red', tooltip: 'Off at 04:00' },
    { key: '05:00', color: 'red', tooltip: 'Off at 05:00' },
    { key: '06:00', color: 'red', tooltip: 'Off at 06:00' },
    { key: '07:00', color: 'red', tooltip: 'Off at 07:00' },
    { key: '08:00', color: 'red', tooltip: 'Off at 08:00' },
    { key: '09:00', color: 'red', tooltip: 'Off at 09:00' },
    { key: '10:00', color: 'red', tooltip: 'Off at 10:00' },
    { key: '11:00', color: 'red', tooltip: 'Off at 11:00' },
    { key: '12:00', color: 'red', tooltip: 'Off at 12:00' },
    { key: '13:00', color: 'red', tooltip: 'Off at 13:00' },
    { key: '14:00', color: 'red', tooltip: 'Off at 14:00' },
    { key: '15:00', color: 'red', tooltip: 'Off at 15:00' },
    { key: '16:00', color: 'red', tooltip: 'Off at 16:00' },
    { key: '17:00', color: 'red', tooltip: 'Off at 17:00' },
    { key: '18:00', color: 'red', tooltip: 'Off at 18:00' },
    { key: '19:00', color: 'red', tooltip: 'Off at 19:00' },
    { key: '20:00', color: 'red', tooltip: 'Off at 20:00' },
    { key: '21:00', color: 'red', tooltip: 'Off at 21:00' },
    { key: '22:00', color: 'red', tooltip: 'Off at 22:00' },
    { key: '23:00', color: 'red', tooltip: 'Off at 23:00' },
  ])
  const [updated, setUpdated] = useState('')
  const [lightRule, setLightRule] = useState({
    start: '',
    end: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!species || !device) {
        setLoading(false)
        setError('Please select species and device to view light schedule')
        return
      }
      try {
        const rule = await getLightRules(species, device)
        if (!rule) {
          setError('No data available')
          setRules(null)
        } else {
          setError('')
          setRules(rule)
          setLightRule({ start: rule.start, end: rule.end })
          // change the color of the tracker based on the rule
          // first get the start and end time of the rule
          let paint = false
          for (let i = 0; i < dailyTracker.length; i++) {
            if (dailyTracker[i].key === rule.start) {
              paint = true
            }
            if (paint) {
              dailyTracker[i].color = 'emerald'
              dailyTracker[i].tooltip = 'On' + ' at ' + dailyTracker[i].key
            } else {
              dailyTracker[i].color = 'red'
              dailyTracker[i].tooltip = 'Off' + ' at ' + dailyTracker[i].key
            }
            if (dailyTracker[i].key === rule.end) {
              paint = false
            }
          }
          setDailyTracker(dailyTracker)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dailyTracker, device, species])

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    // make sure user can change only hours
    // round the time to the nearest hour
    const time = value.split(':')
    const hour = time[0]
    const newTime = `${hour}:00`
    let newLightRule = { start: lightRule.start, end: lightRule.end }
    if (name === 'start') {
      setLightRule({ start: newTime, end: lightRule.end })
      newLightRule = { start: newTime, end: lightRule.end }
    } else {
      setLightRule({ start: lightRule.start, end: newTime })
      newLightRule = { start: lightRule.start, end: newTime }
    }

    // change the color of the tracker based on the rule
    // first get the start and end time of the rule
    let paint = false
    for (let i = 0; i < dailyTracker.length; i++) {
      if (dailyTracker[i].key === newLightRule.start) {
        paint = true
      }
      if (paint) {
        dailyTracker[i].color = 'emerald'
        dailyTracker[i].tooltip = 'On' + ' at ' + dailyTracker[i].key
      } else {
        dailyTracker[i].color = 'red'
        dailyTracker[i].tooltip = 'Off' + ' at ' + dailyTracker[i].key
      }
      if (dailyTracker[i].key === newLightRule.end) {
        paint = false
      }
    }
    setDailyTracker(dailyTracker)
  }

  const handleSave = async () => {
    const deviceRules: DeviceRules = {
      device: device,
      light_hours: {
        start: lightRule.start,
        end: lightRule.end,
      },
    }

    const response = await Client.putDeviceRules(deviceRules)
    if ('message' in response) {
      setUpdated(response.message)
      setTimeout(() => {
        setUpdated('')
      }, 2000)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div id="Light">
      <Card>
        {ruleData ? (
          <div>
            <h3 className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center">
              Light Schedule
            </h3>
            <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center">
              Light will be turned on at {lightRule.start} and turned off at {lightRule.end}
            </p>
            <div className="text-center py-8">
              <Tracker data={dailyTracker} className="mt-2 m-auto" />
            </div>
            <Divider className="my-10">Settings</Divider>
            {updated != '' ? (
              <Callout className="mt-4" title="Success" icon={RiCheckboxCircleLine} color="teal">
                {updated}
              </Callout>
            ) : null}
            <div className="flex flex-col w-1/2 m-auto">
              <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center">
                Change light schedule
              </p>
              <div className="flex flex-row justify-between align-center mt-4">
                <label htmlFor="start">Start time:</label>
                <input
                  type="time"
                  id="start"
                  name="start"
                  step="3600000"
                  min={lightRule.start}
                  max={lightRule.end}
                  defaultValue={lightRule.start}
                  value={lightRule.start}
                  onChange={handleTimeChange}
                />
              </div>
              <div className="flex flex-row justify-between align-center mt-4">
                <label htmlFor="end">End time:</label>
                <input
                  type="time"
                  id="end"
                  name="end"
                  step="3600000"
                  min={lightRule.start}
                  max={lightRule.end}
                  defaultValue={lightRule.end}
                  value={lightRule.end}
                  onChange={handleTimeChange}
                />
              </div>
              <Divider className="px-4" />
              <div className="p-4 pt-0 text-right">
                <Button type="submit" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>No data available</div>
        )}
      </Card>
    </div>
  )
}

export default LightDevice
