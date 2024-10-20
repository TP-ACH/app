import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Icon, Tracker } from '@tremor/react'
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react'
import { Client, SensorRquest, SensorResponse, ErrorMessage } from '../../../services'
import { getIntervalDates } from '../../../services/Helper'

import './FloaterDevice.scss'

interface DeviceData {
  values: { key: string; color: string; tooltip: string }[]
  interval: string
  current: number
  title: string
}

const getFloaterData = async (interval: string, device: string) => {
  const DeviceData: DeviceData = {
    values: [],
    interval: '',
    current: 0,
    title: 'Floater',
  }

  const { startDate, endDate } = getIntervalDates(interval)
  const data: SensorRquest = {
    device_id: device,
    sensor: 'floater',
    start_date: startDate,
    end_date: endDate,
  }

  const response = await Client.sensor<SensorResponse | ErrorMessage>(data)

  if ('floater' in response && response.floater?.data.length === 0) {
    console.error('No data available')
    return DeviceData
  }

  if ('error' in response) {
    console.error(response.error)
    return DeviceData
  }

  DeviceData.interval = interval
  DeviceData.current = response.floater?.data[response.floater.data.length - 1].reading || 0

  DeviceData.values =
    response.floater?.data.map((item) => {
      return {
        key: item.created_at,
        color: item.reading ? 'emerald' : 'red',
        tooltip: (item.reading ? 'Full' : 'Empty') + ' tank' + ' at ' + item.created_at,
      }
    }) || []

  return DeviceData
}

interface FloaterDeviceProps {
  interval: string
  device: string
}

const FloaterDevice: React.FC<FloaterDeviceProps> = ({ interval, device }) => {
  const [data, setData] = useState<DeviceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (!interval || !device) {
        setData(null)
        setLoading(false)
        setError('Please select interval, species and device')
        return
      }
      try {
        const floater = await getFloaterData(interval, device)
        if (!floater || floater.values.length === 0) {
          setError('No data available')
          setData(null)
        } else {
          setError('')
          setData(floater)
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
  }, [interval, device])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      {data ? (
        <div id="floater">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <Card>
              {data.current ? (
                <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4 flex flex-col justify-center	justify-items-center">
                  <span className="text-center font-mono text-sm text-slate-500">
                    Water tank is full
                  </span>
                  <Icon size="xl" icon={RiCheckboxCircleFill} />
                </p>
              ) : (
                <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center py-4 flex flex-col justify-center	justify-items-center">
                  <span className="text-center font-mono text-sm text-slate-500">
                    Water tank is empty
                  </span>
                  <Icon size="xl" icon={RiErrorWarningFill} color="rose" />
                </p>
              )}
            </Card>
            <Card>
              <div className="text-center py-8">
                <Tracker data={data.values} className="mt-2 m-auto" />
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default FloaterDevice
