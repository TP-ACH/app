import React from 'react'
import { useState } from 'react'
import { SideNav } from '../../components'
import { Card, Divider, Select, SelectItem } from '@tremor/react'
import { Link } from 'react-router-dom'

import './Crop.scss'
import crop from '../../assets/crop.png'

const Crop = () => {
  const [species, setSpecies] = useState('')

  //handle species change
  const handleOnChangeSpecies = (value: string) => {
    console.log('Selected species:', value)
    setSpecies(value)
  }

  return (
    <div id="crop" className="h-[75px]">
      <SideNav />
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <div className="sm:flex sm:items-center sm:justify-between">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Crop
            </h3>
          </div>
        </header>
        <Divider />
        <Card className="mt-6 w-full">
          <div>
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Species
            </h4>
            <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Select the species of the crop you are growing
            </p>
            <div className="mt-6 sm:flex sm:items-center sm:space-x-2 w-1/4">
              <Select
                className="w-full sm:w-fit [&>button]:rounded-tremor-small min-w-full"
                enableClear={false}
                value={species}
                onValueChange={handleOnChangeSpecies}
                placeholder="Select species"
              >
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="cucumber">Cucumber</SelectItem>
                <SelectItem value="pepper">Pepper</SelectItem>
                <SelectItem value="lettuce">Lettuce</SelectItem>
              </Select>
              <div className="text-right">
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <Divider />
          <div
            id="crop-content"
            className="h-[36rem] w-[80rem] m-auto hide-grid"
            style={{ backgroundImage: `url(${crop})` }}
          >
            <div className="grid grid-cols-12">
              <div className="col-span-1 h-24">1</div>
              <div className="col-span-1 h-24">2</div>
              <div className="col-span-1 h-24">3</div>
              <div className="col-span-1 h-24">4</div>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <div className="col-span-1 h-24">10</div>
              <div className="col-span-1 h-24">11</div>
              <div className="col-span-1 h-24">12</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-1 h-24">13</div>
              <div className="col-span-1 h-24">14</div>
              <div className="col-span-1 h-24">15</div>
              <div className="col-span-1 h-24">16</div>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <Link to="/devices#light">
                <div className="col-span-1 h-24">light</div>
              </Link>
              <div className="col-span-1 h-24">22</div>
              <div className="col-span-1 h-24">23</div>
              <div className="col-span-1 h-24">24</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-1 h-24">25</div>
              <Link to="/devices#temperature">
                <div className="col-span-1 h-24">Temperature</div>
              </Link>
              <Link to="/devices#humidity">
                <div className="col-span-1 h-24">humidity</div>
              </Link>
              <div className="col-span-1 h-24">28</div>
              <div className="col-span-1 h-24">29</div>
              <div className="col-span-1 h-24">30</div>
              <div className="col-span-1 h-24">31</div>
              <div className="col-span-1 h-24">32</div>
              <div className="col-span-1 h-24">33</div>
              <div className="col-span-1 h-24">34</div>
              <div className="col-span-1 h-24">35</div>
              <div className="col-span-1 h-24">36</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-1 h-24">37</div>
              <Link to="/devices#temperature">
                <div className="col-span-1 h-24">temperature</div>
              </Link>
              <Link to="/devices#humidity">
                <div className="col-span-1 h-24">Humidity</div>
              </Link>
              <div className="col-span-1 h-24">40</div>
              <div className="col-span-1 h-24">41</div>
              <div className="col-span-1 h-24">42</div>
              <div className="col-span-1 h-24">43</div>
              <div className="col-span-1 h-24">44</div>
              <div className="col-span-1 h-24">45</div>
              <div className="col-span-1 h-24">46</div>
              <div className="col-span-1 h-24">47</div>
              <div className="col-span-1 h-24">48</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-1 h-24">49</div>
              <Link to="/devices#ec">
                <div className="col-span-1 h-24">EC</div>
              </Link>
              <Link to="/devices#ph">
                <div className="col-span-1 h-24">PH</div>
              </Link>
              <Link to="/devices#ph">
                <div className="col-span-1 h-24">PH</div>
              </Link>
              <div className="col-span-1 h-24">53</div>
              <div className="col-span-1 h-24">54</div>
              <div className="col-span-1 h-24">55</div>
              <div className="col-span-1 h-24">56</div>
              <div className="col-span-1 h-24">57</div>
              <div className="col-span-1 h-24">58</div>
              <div className="col-span-1 h-24">59</div>
              <div className="col-span-1 h-24">60</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-1 h-24">61</div>
              <Link to="/devices#ec">
                <div className="col-span-1 h-24">EC</div>
              </Link>
              <Link to="/devices#ph">
                <div className="col-span-1 h-24">PH</div>
              </Link>
              <Link to="/devices#ph">
                <div className="col-span-1 h-24">PH</div>
              </Link>
              <Link to="/devices#water">
                <div className="col-span-1 h-24">water</div>
              </Link>
              <Link to="/devices#water">
                <div className="col-span-1 h-24">water</div>
              </Link>
              <Link to="/devices#water">
                <div className="col-span-1 h-24">water</div>
              </Link>
              <Link to="/devices#water">
                <div className="col-span-1 h-24">water</div>
              </Link>
              <Link to="/devices#water">
                <div className="col-span-1 h-24">water</div>
              </Link>
              <Link to="/devices#water">
                <div className="col-span-1 h-24">water</div>
              </Link>
              <Link to="/devices#water">
                <div className="col-span-1 h-24">water</div>
              </Link>
              <div className="col-span-1 h-24">72</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Crop
