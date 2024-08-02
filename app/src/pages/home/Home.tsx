import React from 'react'
import { SideNav } from '../../components'
import { Title } from '@tremor/react'

import './Home.scss'

const Home = () => {
  return (
    <div id="home">
      <Title>Home</Title>
      <SideNav />
    </div>
  )
}

export default Home
