import React from 'react'
import { SideNav } from '../../components'
//import { Title } from '@tremor/react'

import './Home.scss'

const Home = () => {
  return (
    <div id="home">
      <SideNav />
      <div className="w-full h-[75px] bg-white">
        <div className="content-center text-center">
          <h1>Home</h1>
        </div>
      </div>
    </div>
  )
}

export default Home
