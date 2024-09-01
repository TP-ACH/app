import React from 'react'
import { useState } from 'react'
import { Button, Card, NumberInput, Switch, Select, SelectItem, Divider } from '@tremor/react'

import './Rule.scss'

const Rule = ({
  ruleId,
  title,
  recomended,
  description,
  ruleValue,
  maxValue,
  minValue,
  type,
  isEnabled,
}: {
  ruleId: string
  title: string
  recomended: number | null
  description: string
  ruleValue: number
  maxValue: number
  minValue: number
  type: string
  isEnabled: boolean
}) => {
  const [isEnabledState, setIsEnabledState] = useState(isEnabled)
  const [ruleValueState, setRuleValueState] = useState(ruleValue)
  const [ruleType, setRuleType] = useState(type)
  const [error, setError] = useState(false)

  const handleOnChange = (value: number) => {
    if (!value || value < minValue || value > maxValue) {
      setError(true)
    } else {
      setError(false)
    }
    setRuleValueState(value)
  }

  const handleOnChangeType = (value: string) => {
    setRuleType(value)
  }

  const handleSwitch = () => {
    setIsEnabledState(!isEnabledState)
  }

  const handleSave = () => {
    if (!error) {
      console.log('Saved')
    }
  }

  return (
    <div className="device-rule">
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
                {description}
                {recomended ? (
                  <>
                    <br></br>Recomended value is {recomended}
                  </>
                ) : null}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
              <div className="h-10">
                <NumberInput
                  error={error}
                  errorMessage={'Value must be between' + minValue + ' and ' + maxValue}
                  value={ruleValueState}
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
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
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
