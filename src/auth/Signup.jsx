import { Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required!";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
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
        localStorage.setItem("user", JSON.stringify(formData));
        window.location.href = "/auth/login";
      }, 1000);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen  bg-[#466d72]  justify-center  items-center">
      <div className="border w-[600px]  p-6 bg-[#f7f7f7] rounded-2xl shadow-2xl">
        <h6 className="text-center text-[32px] font-bold text-[#FF6F61] mb-6">
          Sign Up
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h6 className="font-medium mb-1">Name</h6>
            <input
              type="text"
              name="name"
              placeholder="user name"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
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
            {loading ? <Spin /> : "Sign Up"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="font-medium text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
