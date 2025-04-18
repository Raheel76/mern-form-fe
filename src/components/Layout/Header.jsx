import React from 'react'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigate('/auth/signup')
  }
  return (
    <div>
      Header
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Header
