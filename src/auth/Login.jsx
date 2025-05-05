import { Button, Spin, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Store token in memory (axios defaults)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      localStorage.setItem('token', response.data.token); // Store token in local storage if needed
      message.success('Login successful!');
      console.log(response.data.user);

      navigate('/');

    } catch (error) {
      console.log(error.response.data.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#166d83]  bg-img min-h-screen justify-center items-center">
      <div className="border w-[600px] bg-[#f7f7f7] p-6 rounded-2xl shadow-2xl">
        <h6 className="text-center text-[32px] font-bold mb-6 text-[#FF6F61]">
          Login
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h6 className="font-medium mb-1">Email</h6>
            <input
              type="email"
              name="email"
              placeholder="email address"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <h6 className="font-medium mb-1">Password</h6>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <Button
            htmlType="submit"
            className="text-base font-medium w-full h-12 bg-[#FF6F61] text-white auth-btn"
            disabled={loading}
          >
            {loading ? <Spin /> : "Log in"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="font-medium text-blue-600">
            Sign up
          </Link>
        </p>
        <div className="flex justify-center mt-4">
          <Link to="/auth/forgot" className="font-medium text-center text-blue-600">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;