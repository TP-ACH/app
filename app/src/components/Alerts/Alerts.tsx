import React from 'react'
import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Button,
  Icon,
} from '@tremor/react'
import { RiErrorWarningFill, RiCheckboxCircleFill } from '@remixicon/react'
import { Client, Alert, AlertType, AlertStatus, ErrorMessage, Message } from '../../services'
import './Alerts.scss'

const getIcon = (type: AlertType) => {
  switch (type) {
    case 'ok':
      return <Icon icon={RiCheckboxCircleFill} color="green" size="lg" />
    case 'action':
      return <Icon icon={RiErrorWarningFill} color="yellow" size="lg" />
    case 'error':
      return <Icon icon={RiErrorWarningFill} color="red" size="lg" />
    case 'warning':
      return <Icon icon={RiErrorWarningFill} color="yellow" size="lg" />
    default:
      return <Icon icon={RiErrorWarningFill} color="yellow" size="lg" />
  }
}

const getColor = (type: AlertType) => {
  switch (type) {
    case 'ok':
      return 'green'
    case 'action':
      return 'yellow'
    case 'error':
      return 'red'
    case 'warning':
      return 'yellow'
    default:
      return 'yellow'
  }
}

const getTitle = (type: AlertType, topic: string) => {
  const newTopic = topic.replace(/_/g, ' ')

  switch (type) {
    case 'ok':
      return `Everything is fine: ${newTopic}`
    case 'action':
      return `Action required: ${newTopic}`
    case 'error':
      return `Error: ${newTopic}`
    case 'warning':
      return `Warning: ${newTopic}`
    default:
      return `Warning: ${newTopic}`
  }
}

const Alerts = ({ device }: { device: string }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alertsRes: Alert[] | ErrorMessage = await Client.getAlerts<Alert[] | ErrorMessage>(
          device,
          'open'
        )
        if (Array.isArray(alertsRes)) {
          setAlerts(alertsRes)
        } else {
          console.error('Error fetching data:', alertsRes)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [device])

  const handleOnClick = async (id: string, status: AlertStatus) => {
    try {
      const alertRes: Message | ErrorMessage = await Client.putAlerts<Message | ErrorMessage>(
        id,
        status
      )
      if ('message' in alertRes) {
        const alertsRes: Alert[] | ErrorMessage = await Client.getAlerts<Alert[] | ErrorMessage>(
          device,
          'open'
        )
        if (Array.isArray(alertsRes)) {
          setAlerts(alertsRes)
        }
      } else {
        console.error('Error updating alert:', alertRes)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  if (alerts.length === 0) {
    return (
      <div className="device-alerts">
        <p className="mt-4 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          No alerts found
        </p>
      </div>
    )
  }

  return (
    <div className="device-alerts mt-4 overflow-y-auto max-h-[500px]">
      {alerts.map((alert) => (
        <AccordionList className="mx-auto" key={alert._id}>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong [&>.tremor-AccordionHeader-children]:items-center">
              {getIcon(alert.type)}
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {getTitle(alert.type, alert.topic)}
              </p>
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <div className="px-4">{alert.message}</div>
              <div className="py-4 pt-0 text-right">
                <Button
                  color={getColor(alert.type)}
                  type="submit"
                  onClick={() => handleOnClick(alert._id, 'closed')}
                >
                  Close
                </Button>
              </div>
            </AccordionBody>
          </Accordion>
        </AccordionList>
      ))}
    </div>
  )
}

export default Alerts
