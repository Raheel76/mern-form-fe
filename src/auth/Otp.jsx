import { Button, Input, Spin, message } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const { OTP } = Input;

const SendOtp = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate OTP input
    if (!otp || otp.length !== 4) {
      message.error('Please enter a complete 4-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp
      });

      message.success('OTP verified successfully!');
      navigate('/auth/reset', {
        state: {
          email,
          resetToken: response.data.data.resetToken
        }
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
        error.message ||
        'Failed to verify OTP';
      message.error(errorMessage);
      setOtp(""); // Clear the OTP field on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#166d83] bg-img min-h-screen justify-center items-center">
      <div className="border w-[600px] bg-[#f7f7f7] p-6 rounded-2xl shadow-2xl">
        <h6 className="text-center text-[32px] font-bold mb-6 text-[#FF6F61]">
          Verify OTP
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="text-sm text-gray-500 text-center mb-3">
              An OTP has been sent to your email: {email}
            </p>
            <div className="flex items-center justify-center">
              <OTP
                length={4}
                value={otp}
                onChange={setOtp}
                inputType="numeric"
                inputStyle={{
                  width: 50,
                  height: 50,
                  fontSize: 18,
                  textAlign: 'center',
                  marginRight: 8,
                  borderRadius: 4,
                  border: '1px solid #d9d9d9'
                }}
                formatter={(str) => str.toUpperCase()}
              />
            </div>

          </div>
          <Button
            htmlType="submit"
            className="text-base font-medium w-full h-12 bg-[#FF6F61] text-white auth-btn"
            disabled={loading}
          >
            {loading ? <Spin /> : "Verify OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendOtp;