import React from 'react'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    delete axios.defaults.headers.common['Authorization'];

    navigate('/auth/login')
    console.log('Logout successful!')
    localStorage.removeItem('token'); // Remove token from local storage if needed
  }
  return (
    <div className=' h-20 bg-white flex justify-between items-center px-10 shadow-md'>
      Header
      <Button type='primary' className='px-8 py-3  white ' onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Header
