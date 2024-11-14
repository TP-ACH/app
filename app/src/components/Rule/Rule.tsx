import React from 'react'
import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  NumberInput,
  Switch,
  Select,
  SelectItem,
  Divider,
  Callout,
} from '@tremor/react'
import { Client, Rule as RuleData, DeviceRules } from '../../services'
import { RiCheckboxCircleLine } from '@remixicon/react'
import './Rule.scss'

const Rule = ({
  ruleId,
  device,
  sensor,
  ruleData,
  title,
  ruleValue,
  step,
  maxValue,
  minValue,
  type,
  isEnabled,
  onValueChange,
}: {
  ruleId: string
  device: string
  sensor: string
  ruleData: RuleData
  title: string
  ruleValue: number
  step: number
  maxValue: number
  minValue: number
  type: string
  isEnabled: boolean
  onValueChange: (value: number) => void
}) => {
  const [isEnabledState, setIsEnabledState] = useState(isEnabled)
  const [ruleValueState, setRuleValueState] = useState(ruleValue)
  const [ruleType, setRuleType] = useState(type)
  const [error, setError] = useState(false)
  const [updated, setUpdated] = useState('')

  useEffect(() => {
    setIsEnabledState(isEnabled)
    setRuleValueState(ruleValue)
    setRuleType(type)
  }, [isEnabled, ruleValue, type])

  const handleOnChange = (value: number) => {
    if (!value || value < minValue || value > maxValue) {
      setError(true)
    } else {
      setError(false)
    }
    setRuleValueState(value)
    setIsEnabledState(isEnabledState)
    onValueChange(value)
  }

  const handleOnChangeType = (value: string) => {
    setRuleType(value)
  }

  const handleSwitch = async () => {
    const isEnabled = !isEnabledState
    setIsEnabledState(isEnabled)
    const rule: RuleData = {
      bound: ruleValueState,
      compare: ruleData.compare,
      time: ruleData.time,
      enabled: isEnabled,
      action: {
        type: ruleType,
        dest: ruleData.action.dest,
      },
    }

    const deviceRules: DeviceRules = {
      device: device,
      rules_by_sensor: [
        {
          sensor: sensor,
          rules: [rule],
        },
      ],
    }

    const response = await Client.putDeviceRules(deviceRules)
    if ('message' in response) {
      setUpdated(isEnabled ? 'Rule enabled' : 'Rule disabled')
      setTimeout(() => {
        setUpdated('')
      }, 2000)
    }
  }

  const handleSave = async () => {
    const rule: RuleData = {
      bound: ruleValueState,
      compare: ruleData.compare,
      time: ruleData.time,
      enabled: isEnabledState,
      action: {
        type: ruleType,
        dest: ruleData.action.dest,
      },
    }

    const deviceRules: DeviceRules = {
      device: device,
      rules_by_sensor: [
        {
          sensor: sensor,
          rules: [rule],
        },
      ],
    }

    const response = await Client.putDeviceRules(deviceRules)
    if ('message' in response) {
      setUpdated(response.message)
      setTimeout(() => {
        setUpdated('')
      }, 2000)
    }
  }

  return (
    <div className="device-rule">
      {updated != '' ? (
        <Callout className="mt-4" title="Success" icon={RiCheckboxCircleLine} color="teal">
          {updated}
        </Callout>
      ) : null}
      <Card className="p-0">
        <div className="border-b border-tremor-border bg-tremor-background-muted px-4 py-3 dark:border-dark-tremor-border dark:bg-dark-tremor-background-muted flex items-start justify-between items-center">
          <label
            htmlFor={ruleId}
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            {title}
          </label>
          <Switch
            name={ruleId}
            id={ruleId}
            checked={isEnabledState}
            onChange={handleSwitch}
            disabled={error}
          />
        </div>
        {isEnabledState ? (
          <>
            <div className="flex items-start justify-between space-x-10 p-4">
              <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                {maxValue ? (
                  <>
                    Max value is <b>{maxValue}</b>
                  </>
                ) : null}
                {minValue ? (
                  <>
                    <br></br>Min value is <b>{minValue}</b>
                  </>
                ) : null}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
              <div className="h-10">
                <NumberInput
                  error={error}
                  errorMessage={'Value must be between ' + minValue + ' and ' + maxValue}
                  value={ruleValueState}
                  step={step}
                  max={maxValue}
                  min={minValue}
                  disabled={!isEnabledState}
                  onValueChange={handleOnChange}
                />
              </div>
              <div>
                <Select
                  defaultValue="Automatic"
                  value={ruleType}
                  placeholder="Type"
                  onValueChange={handleOnChangeType}
                >
                  <SelectItem value="mqtt">Automatic</SelectItem>
                  <SelectItem value="alert">Manual</SelectItem>
                </Select>
              </div>
            </div>
            <Divider className="px-4" />
            <div className="p-4 pt-0 text-right">
              <Button type="submit" disabled={error} onClick={handleSave}>
                Save
              </Button>
            </div>
          </>
        ) : null}
      </Card>
    </div>
  )
}

export default Rule
