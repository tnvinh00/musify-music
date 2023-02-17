import { Navbar, Button, TextInput, DarkThemeToggle, Flowbite } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchIcon from 'components/Icons/SearchIcon'
import AppModal from 'components/Modal/Modal'
import LoginForm from 'components/Forms/LoginForm/LoginForm'

const NavBar = () => {

  const [showModal, setShowModal] = React.useState(false)

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="w-full bg-orange-100 shadow-md z-10"
    >
      <Link href='/' className='flex'>
        <Image
          src="/images/logo-musify.jpg"
          className="mr-3 rounded-md"
          alt="Flowbite Logo"
          width={54}
          height={54}
        />

        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Musify
        </span>
      </Link>
      <div className="flex md:order-2">
        <Link href='/register'>
          <Button className='mr-2 w-24' outline pill>
            Sign Up
          </Button>
        </Link>
        <Button className='mr-2 w-24' pill onClick={() => setShowModal(true)}>
          Login
        </Button>
        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <TextInput
          id="input-success"
          placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
          required={true}
          icon={SearchIcon}
          className="text-center w-96 lg:w-[40rem]"
          color="success"
        />
      </Navbar.Collapse>
      {/* <AppModal show={showModal} onClose={() => setShowModal(false)}>
          <LoginForm />
        </AppModal> */}
    </Navbar>
  )
}

export default NavBar