import React from 'react'
import { Card, Switch, Divider } from '@tremor/react'

import './Notifications.scss'

const Notifications = () => {
  return (
    <div id="settings-notifications">
      <form action="#" method="POST">
        <h3 className="mt-6 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Notifications
        </h3>
        <p className="mt-2 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Choose which notifications you want to receive and how you want to receive them
        </p>
        <div className="mt-8 space-y-6">
          <Card className="max-w-xl overflow-hidden p-0">
            <div className="border-b border-tremor-border bg-tremor-background-muted px-4 py-3 dark:border-dark-tremor-border dark:bg-dark-tremor-background-muted">
              <label
                htmlFor="feature-1"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Fill water tank
              </label>
            </div>
            <div className="flex items-start space-x-10 p-4">
              <p
                id="feature-1-description"
                className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content"
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat.
              </p>
              <Switch name="feature-1" id="feature-1" aria-describedby="feature-1-description" />
            </div>
          </Card>
          <Card className="max-w-xl overflow-hidden p-0">
            <div className="border-b border-tremor-border bg-tremor-background-muted px-4 py-3 dark:border-dark-tremor-border dark:bg-dark-tremor-background-muted">
              <label
                htmlFor="feature-2"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Ready to harvest
              </label>
            </div>
            <div className="flex items-start space-x-10 p-4">
              <p
                id="feature-2-description"
                className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content"
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
              </p>
              <Switch name="feature-2" id="feature-2" aria-describedby="feature-2-description" />
            </div>
          </Card>
        </div>
        <Divider className="my-10" />
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          >
            Save settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default Notifications
