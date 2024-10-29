import React from 'react'
import { useState } from 'react'
import { Card, List, ListItem, Icon, Button } from '@tremor/react'
import { Link, useLocation } from 'react-router-dom'
import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiHome2Line,
  RiSettings5Line,
  RiLogoutBoxLine,
  RiCpuLine,
} from '@remixicon/react'
import logo from '../../assets/logo.png'

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

  function handleLogout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
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
        <div className="m-auto">
          <img src={logo} alt="logo" className="h-[65px]" />
        </div>
      </div>
      <Card
        className={
          hideNav
            ? 'opacity-0 duration-200	ease-linear rounded-none h-screen hidden'
            : 'opacity-100 duration-200	ease-linear rounded-none h-screen'
        }
      >
        <List className="mt-[45px]">
          {items.map((item) => (
            <ListItem key={item.label} className="justify-start py-5">
              <Icon icon={item.icon} tooltip={item.label} size="md" />
              <Link to={item.link}>
                <span className={location.pathname === item.link ? 'font-extrabold underline' : ''}>
                  {item.label}
                </span>
              </Link>
            </ListItem>
          ))}
          <ListItem className="justify-center py-5 absolute bottom-0 left-0">
            <div className="flex justify-center">
              <Button variant="secondary" icon={RiLogoutBoxLine} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </ListItem>
        </List>
      </Card>
    </div>
  )
}

export default SideNav
