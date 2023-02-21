import AppHeader from 'components/AppHeader/AppHeader'
import LoginForm from 'components/Forms/LoginForm/LoginForm'
import React from 'react'

const Login = () => {
  return (
    <div className="mt-20">
      <AppHeader
        title="Đăng nhập"
      />
      <LoginForm />
    </div>
  )
}

export default Login