import { Button, Input, Spin } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SendOtp = () => {
    const onChange = text => {
        console.log('onChange:', text);
    };
    const onInput = value => {
        console.log('onInput:', value);
    };
    const sharedProps = {
        onChange,
        onInput,
    };

    return (
        <div className="flex flex-col bg-[#166d83] bg-img min-h-screen justify-center items-center">
            <div className="border  w-[600px] bg-[#f7f7f7]  p-6 rounded-2xl shadow-2xl">
                <h6 className="text-center text-[32px] font-bold mb-6 text-[#FF6F61]">
                    OTP
                </h6>
                <form>
                    <div className="mb-6">
                        <h6 className="font-medium text-center mb-1">OTP has been sent</h6>
                        <div className="flex justify-center">
                            <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
                        </div>
                    </div>

                    <Button
                        htmlType="submit"
                        className="text-base font-medium w-full h-12 bg-[#FF6F61] text-white auth-btn "

                    >
                        Verify
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

export default SendOtp;


