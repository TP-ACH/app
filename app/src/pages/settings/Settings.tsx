import React from 'react'
import { SideNav } from '../../components'
import { Divider, Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Icon } from '@tremor/react'
import { RiSettings5Line, RiNotification2Line, RiUser3Line } from '@remixicon/react'

import './Settings.scss'
import General from './General/General'
import Notifications from './Notifications/Notifications'
import Account from './Account/Account'

const Settings = () => {
  return (
    <div id="devices" className="h-[75px]">
      <SideNav />
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <div className="sm:flex sm:items-center sm:justify-between">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Settings
            </h3>
          </div>
        </header>
        <Divider />
        <Card className="mt-6">
          <TabGroup>
            <TabList>
              <Tab>
                <div className="flex items-center space-x-2">
                  <Icon icon={RiSettings5Line} className="pl-0" />
                  General
                </div>
              </Tab>
              <Tab>
                <div className="flex items-center space-x-2">
                  <Icon icon={RiNotification2Line} className="pl-0" />
                  Notifications
                </div>
              </Tab>
              <Tab>
                <div className="flex items-center space-x-2">
                  <Icon icon={RiUser3Line} className="pl-0" />
                  Account
                </div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="mt-4">
                <General />
              </TabPanel>
              <TabPanel className="mt-4">
                <Notifications />
              </TabPanel>
              <TabPanel className="mt-4">
                <Account />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>
    </div>
  )
}

export default Settings
