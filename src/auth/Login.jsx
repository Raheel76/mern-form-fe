import { Button, Spin } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      newErrors.email = "Email is required*";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (
          storedUser.email === formData.email &&
          storedUser.password === formData.password
        ) {
          const authToken =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          localStorage.setItem("authToken", authToken);
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col bg-[#166d83] bg-img min-h-screen justify-center items-center">
      <div className="border  w-[600px] bg-[#f7f7f7]  p-6 rounded-2xl shadow-2xl">
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
            {errors.email && <p className="error-text">{errors.email}</p>}
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
            {errors.password && (
              <div className="error-text">{errors.password}</div>
            )}
          </div>
          <Button
            htmlType="submit"
            className="text-base font-medium w-full h-12 bg-[#FF6F61] text-white auth-btn "
            disabled={loading}
          >
            {loading ? <Spin /> : "Log in"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to={"/auth/signup"} className="font-medium text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
