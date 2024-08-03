import React from 'react'
import { useState } from 'react'
import { Card, List, ListItem, Icon, Title } from '@tremor/react'
import { Link, useLocation } from 'react-router-dom'
import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiHome2Line,
  RiSettings5Line,
  RiLogoutBoxLine,
  RiStarLine,
  RiCpuLine,
} from '@remixicon/react'

import './SideNav.scss'

const SideNav = () => {
  const items = [
    {
      label: 'Home',
      icon: RiHome2Line,
      link: '/',
    },
    {
      label: 'Devices',
      icon: RiCpuLine,
      link: '/devices',
    },
    {
      label: 'Crop',
      icon: RiStarLine,
      link: '/crop',
    },
    {
      label: 'Settings',
      icon: RiSettings5Line,
      link: '/settings',
    },
  ]
  const [hideNav, setHideNav] = useState(false)
  const location = useLocation()

  function handleNav() {
    setHideNav(!hideNav)
    document.getElementById('app')?.classList.toggle('hide-nav')
  }

  return (
    <div id="side-nav">
      <div className="menu absolute top-0 left-0 w-screen	h-[75px] bg-white border z-20 flex content-start gap-x-[5vw]">
        <Icon
          className="z-20"
          icon={hideNav ? RiMenuUnfoldLine : RiMenuFoldLine}
          tooltip={hideNav ? 'Show' : 'Hide'}
          size="xl"
          onClick={() => handleNav()}
        />
        <Title className="mt-4">LOGO</Title>
      </div>
      <Card
        className={
          hideNav
            ? 'opacity-0 duration-200	ease-linear rounded-none h-screen'
            : 'opacity-100 duration-200	ease-linear rounded-none h-screen'
        }
      >
        <List className="mt-[45px]">
          {items.map((item) => (
            <ListItem key={item.label} className="justify-start py-5">
              <Icon icon={item.icon} tooltip={item.label} size="md" />
              <Link to={item.link}>
                <span className={location.pathname === item.link ? 'font-extrabold' : ''}>
                  {item.label}
                </span>
              </Link>
            </ListItem>
          ))}
          <ListItem className="justify-center py-5 absolute bottom-0 left-0">
            <Icon icon={RiLogoutBoxLine} tooltip="Logout" size="md" />
            <Link to="/logout">
              <span className="font-bold">Logout</span>
            </Link>
          </ListItem>
        </List>
      </Card>
    </div>
  )
}

export default SideNav
