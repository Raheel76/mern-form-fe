// ForgotPassword.js
import React, { useState } from 'react';
import { Button, Spin, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            message.error('Email is required');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            message.success(response.data.message);
            setEmailSent(true);
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-img bg-[#466d72] justify-center items-center">
            <div className="border w-[600px] p-6 bg-[#fffefe] rounded-2xl shadow-2xl">
                <h6 className="text-center text-[32px] font-bold text-[#FF6F61] mb-6">
                    Forgot Password
                </h6>


                {!emailSent ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <h6 className="font-medium mb-1">Email</h6>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            htmlType="submit"
                            className="text-base font-medium w-full h-12 bg-[#FF6F61] text-white auth-btn"
                            disabled={loading}
                        >
                            {loading ? <Spin /> : "Send OTP"}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="mb-4">OTP has been sent to your email (stored in MongoDB)</p>
                        <Button
                            type="primary"
                            onClick={() => navigate('/auth/otp', { state: { email } })}
                            className="text-base font-medium w-full h-12 bg-[#FF6F61] text-white"
                        >
                            Verify OTP
                        </Button>
                    </div>
                )}
                <p className="text-center text-sm text-gray-400 mt-4">
                    Remembered your password?{" "}
                    <Link to={"/auth/login"} className="font-medium text-blue-600">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default ForgotPassword;