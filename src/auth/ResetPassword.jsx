import { Button, Input, Spin, message } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { email, resetToken } = location.state || {};

  useEffect(() => {
    if (!email || !resetToken) {
      navigate('/auth/forgot');
    } else {
      setIsValidToken(true);
    }
  }, [email, resetToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      message.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    
    if (password.length < 4) {
      message.error('Password must be at least 4 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { 
        email,
        token: resetToken,
        password,
        confirmPassword
      });
      
      message.success(response.data.message);
      navigate('/auth/login');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!isValidToken) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col bg-[#166d83] bg-img min-h-screen justify-center items-center">
      <div className="border w-[600px] bg-[#f7f7f7] p-6 rounded-2xl shadow-2xl">
        <h6 className="text-center text-[32px] font-bold mb-6 text-[#FF6F61]">
          Reset Password
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h6 className="font-medium mb-1">New Password</h6>
            <Input.Password
              placeholder="Enter new password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={4}
              required
            />
          </div>
          <div className="mb-6">
            <h6 className="font-medium mb-1">Confirm New Password</h6>
            <Input.Password
              placeholder="Confirm new password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={4}
              required
            />
          </div>
          <Button
            htmlType="submit"
            className="text-base font-medium w-full h-12 bg-[#FF6F61] text-white auth-btn"
            disabled={loading}
          >
            {loading ? <Spin /> : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;