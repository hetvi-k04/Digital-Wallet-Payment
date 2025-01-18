import React from "react";
import { Form, Row, Col, Input,message } from "antd";
import { useNavigate } from "react-router-dom";
import {LoginUser} from "../../apicalls/users"
function Login() {
    const navigate = useNavigate();
    const onFinish = async(values)=>{
        try{
            const response=await LoginUser(values);
            if(response.success){
                message.success(response.message);
                localStorage.setItem("token",response.token);
                console.log("Token saved:", response.token);
               navigate("/")

                }else{
                message.error(response.message);

            }

        } catch(error){
            message.error(error.message);
        };
    }
    return (
        <div className="bg-primary flex items-center justify-center h-screen">
            {/* Card Container */}
            <div className="card w-400 p-2">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">QUICK PAY - LOGIN</h1>
                    
                </div>

                <hr className="mb-4" />

                {/* Login Form */}
                <Form layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        {/* Email */}
                        <Col span={24}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Please enter your email!" },
                                    { type: "email", message: "Please enter a valid email!" }
                                ]}
                            >
                                <Input placeholder="Enter email" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        {/* Password */}
                        <Col span={24}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: "Please enter your password!" },
                                    { min: 6, message: "Password must be at least 6 characters long!" }
                                ]}
                            >
                                <Input.Password placeholder="Enter password" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <Form.Item>
                    <button
                            type="submit"
                            htmlType="submit"
                            className="w-100 primary-contained-btn">
                            Login
                        </button>
                        <h1 className="text-md underline text-blue-500 mt-2"onClick={()=>navigate('/register')}>
                        Not a Member? Register
                    </h1>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
