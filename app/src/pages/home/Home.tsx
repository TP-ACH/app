import React from 'react'
import { SideNav } from '../../components'
import {
  Card,
  Divider,
  Select,
  SelectItem,
  CategoryBar,
  ProgressBar,
  LineChart,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Icon,
} from '@tremor/react'
import { RiCheckboxCircleFill, RiErrorWarningFill, RiTaskFill } from '@remixicon/react'

import './Home.scss'

/*function ContentPlaceholder() {
  return (
    <div className="relative h-full overflow-hidden rounded bg-gray-50 dark:bg-dark-tremor-background-subtle">
      <svg
        className="absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-gray-700"
        fill="none"
      >
        <defs>
          <pattern id="pattern-1" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>
        <rect stroke="none" fill="url(#pattern-1)" width="100%" height="100%"></rect>
      </svg>
    </div>
  )
}*/

// PH data
import dataPH from './data/ph.json'
const PHdata = {
  values: [] as { time: string; min: number; max: number; PH: number }[],
  min: dataPH.min,
  max: dataPH.max,
  interval: dataPH.interval,
}

PHdata.values = dataPH.data.map((item) => {
  return {
    time: item.time,
    min: PHdata.min,
    max: PHdata.max,
    PH: item.PH,
  }
})

// EC data
import dataEC from './data/ec.json'
const ECdata = {
  values: [] as { time: string; min: number; max: number; EC: number }[],
  min: dataEC.min,
  max: dataEC.max,
  interval: dataEC.interval,
}

ECdata.values = dataEC.data.map((item) => {
  return {
    time: item.time,
    min: ECdata.min,
    max: ECdata.max,
    EC: item.EC,
  }
})

const Home = () => {
  return (
    <div id="home" className="h-[75px]">
      <SideNav />
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <div className="sm:flex sm:items-center sm:justify-between">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Dashboard
            </h3>
            <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:space-x-2">
              <Select
                className="w-full sm:w-fit [&>button]:rounded-tremor-small"
                enableClear={false}
                defaultValue="1"
              >
                <SelectItem value="1">Last 30 minutes</SelectItem>
                <SelectItem value="2">Last 60 minutes</SelectItem>
                <SelectItem value="3">Last 12 hours</SelectItem>
                <SelectItem value="4">Last 24 hours</SelectItem>
                <SelectItem value="5">Last 7 days</SelectItem>
                <SelectItem value="6">Last 30 days</SelectItem>
              </Select>
              <Select
                className="mt-2 w-full sm:mt-0 sm:w-fit [&>button]:rounded-tremor-small"
                enableClear={false}
                defaultValue="1"
              >
                <SelectItem value="1">Kit 1</SelectItem>
                <SelectItem value="2">Kit 2</SelectItem>
                <SelectItem value="3">Kit 3</SelectItem>
              </Select>
            </div>
          </div>
        </header>
        <Divider />
        <Card className="rounded-tremor-small p-0">
          <div className="grid-cols-12 divide-y divide-tremor-border dark:divide-dark-tremor-border md:grid md:divide-x md:divide-y-0">
            <div className="divide-y divide-tremor-border px-2 dark:divide-dark-tremor-border md:col-span-4">
              <div className="py-2">
                <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                  <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Temprerature
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex justify-center m-auto">
                    <Card>
                      <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center pb-4">
                        <span>23°C</span>
                      </p>
                      <CategoryBar
                        values={[5, 5, 5, 5, 5, 5, 5, 5, 10]}
                        colors={[
                          'rose',
                          'orange',
                          'yellow',
                          'emerald',
                          'emerald',
                          'emerald',
                          'yellow',
                          'orange',
                          'rose',
                        ]}
                        markerValue={23}
                      />
                    </Card>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                  <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Humidity
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex justify-center m-auto">
                    <Card>
                      <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center pb-4">
                        <span>78%</span>
                      </p>
                      <CategoryBar
                        values={[25, 20, 20, 35]}
                        colors={['rose', 'orange', 'yellow', 'emerald']}
                        markerValue={78}
                      />
                    </Card>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                  <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Light Intensity
                  </h3>
                </div>
                <div className="p-4">
                  <Card>
                    <p className="text-tremor-default font-bold text-tremor-content dark:text-dark-tremor-content text-center pb-4">
                      <span>45%</span>
                    </p>
                    <ProgressBar value={45} color="emerald" className="mt-3" />
                  </Card>
                </div>
              </div>
            </div>
            <div className="p-2 md:col-span-8 md:h-auto">
              <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Alerts
              </h3>
              <AccordionList className="mx-auto mt-4">
                <Accordion>
                  <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong [&>.tremor-AccordionHeader-children]:items-center">
                    <Icon icon={RiErrorWarningFill} color="red" size="lg" />
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                      Add water
                    </p>
                  </AccordionHeader>
                  <AccordionBody className="leading-6">
                    Please, add water to the tank to maintain the water level.
                  </AccordionBody>
                </Accordion>
                <Accordion>
                  <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong [&>.tremor-AccordionHeader-children]:items-center">
                    <Icon icon={RiErrorWarningFill} color="yellow" size="lg" />
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                      Clean the tank
                    </p>
                  </AccordionHeader>
                  <AccordionBody className="leading-6">
                    Please, clean the tank to maintain the water quality.
                  </AccordionBody>
                </Accordion>
                <Accordion>
                  <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong [&>.tremor-AccordionHeader-children]:items-center">
                    <Icon icon={RiErrorWarningFill} color="red" size="lg" />
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                      Fill PH solution
                    </p>
                  </AccordionHeader>
                  <AccordionBody className="leading-6">
                    Please, fill the PH solution to maintain the PH level.
                  </AccordionBody>
                </Accordion>
                <Accordion>
                  <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong [&>.tremor-AccordionHeader-children]:items-center">
                    <Icon icon={RiCheckboxCircleFill} color="green" size="lg" />
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                      You can harvest!
                    </p>
                  </AccordionHeader>
                  <AccordionBody className="leading-6">
                    Your plants are ready to harvest. Please, check the plants.
                  </AccordionBody>
                </Accordion>
              </AccordionList>
            </div>
          </div>
        </Card>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="rounded-tremor-small p-0">
            <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
              <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                PH Level
              </h3>
            </div>
            <LineChart
              className="h-60 px-2"
              data={PHdata.values}
              index="time"
              categories={['PH', 'min', 'max']}
              colors={['emerald', 'red', 'red']}
              xAxisLabel={PHdata.interval}
              minValue={1}
              maxValue={14}
            />
          </Card>
          <Card className="rounded-tremor-small p-0">
            <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
              <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                EC Level
              </h3>
            </div>
            <LineChart
              className="h-60 px-2"
              data={ECdata.values}
              index="time"
              categories={['EC', 'min', 'max']}
              colors={['emerald', 'red', 'red']}
              xAxisLabel={ECdata.interval}
              minValue={0}
              maxValue={10}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
