import SearchInput from 'components/Forms/SearchInput'
import { Button, DarkThemeToggle, Navbar } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BsArrowLeftCircleFill } from 'react-icons/bs'

const NavBar = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="w-full bg-orange-100 shadow-md z-10 my-auto"
    >
      <Link href='/' className='flex'>
        <Image
          src="/images/logo-musify.jpg"
          className="mr-3 rounded-md"
          alt="Musify Logo"
          width={54}
          height={54}
        />

        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Musify
        </span>
      </Link>
      <div className="flex md:order-2">
        {/* <Link href='/register'>
          <Button className='mr-2 w-24' outline pill>
            Sign Up
          </Button>
        </Link> */}
        <Link href='/login'>
          <Button className='mr-2' pill>
            Đăng nhập
          </Button>
        </Link>
        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className='absolute md:static top-16 left-0'>
        <div className="hidden md:flex items-center text-gray-800 dark:text-white">
          <BsArrowLeftCircleFill
            size={32}
            className='mx-1 cursor-pointer'
            onClick={() => router.back()}
            title="Trở về trang trước"
          />
        </div>
        <SearchInput />
      </Navbar.Collapse>
      {/* <AppModal show={showModal} onClose={() => setShowModal(false)}>
          <LoginForm />
        </AppModal> */}
    </Navbar>
  )
}

export default NavBar