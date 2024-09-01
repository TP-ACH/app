import React from 'react'
import { SideNav } from '../../components'
import { Card, Divider } from '@tremor/react'
import { Link } from 'react-router-dom'

import './Crop.scss'
import crop from '../../assets/crop.png'

const Crop = () => {
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
