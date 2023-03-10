import React from 'react'
import { Label, TextInput, Checkbox, Button } from 'flowbite-react'

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-4 w-96 mx-auto">
      <h1 className='text-center font-medium text-gray-700 dark:text-gray-200 text-3xl'>
        Đăng nhập
      </h1>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email1"
            value="Email"
          />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@gmail.com"
          required={true}
          autoComplete="off"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Mật khẩu"
          />
        </div>
        <TextInput
          id="password1"
          type="password"
          required={true}
          autoComplete="off"
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">
          Nhớ mật khẩu
        </Label>
      </div>
      <Button type="submit">
        Đăng nhập
      </Button>
    </form>
  )
}

export default LoginForm