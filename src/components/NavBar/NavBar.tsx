import { Navbar, Button } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {

  const menuItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
    {
      label: 'Pricing',
      href: '/pricing',
    }
  ];

  return (
    <Navbar
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="https://flowbite.com/">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
          width={100}
          height={100}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link href='/register'>
          <Button className='mr-2 w-24' outline>
            Sign Up
          </Button>
        </Link>
        <Link href="/login">
          <Button className='w-24'>
            Login
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index}>
            {item.label}
          </Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar