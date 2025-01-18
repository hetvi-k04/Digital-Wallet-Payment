import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Input, Select,message } from "antd";
import {RegisterUser} from "../../apicalls/users"
const { Option } = Select;

function Register() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            // Call RegisterUser API
            const response = await RegisterUser(values);

            // Check if the response has a success flag
            if (response && response.success) {
                message.success({
                    content: "User created successfully",
                    duration: 2,
                });
                // Navigate to login page after registration
                navigate("/login");
            } else {
                // Handle error message from API
                message.error(response.message || "Registration failed");
            }
        } catch (error) {
            // Catch any errors in the registration process
            message.error(error.message || "An unexpected error occurred");
        }
    };
    return (
        <div className="m-5">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">QUICK PAY - REGISTER</h1>
               <h1 className="text-md underline" onClick={()=>navigate('/login')}>
                Already a Member?Login
               </h1>
            </div>

            
            <hr/>
            <Form layout="vertical"
            onFinish={onFinish}>
                <Row gutter={16}>
                    {/* First Name */}
                    <Col span={6}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: "Please enter your first name!" }]}
                        >
                            <Input placeholder="Enter first name" />
                        </Form.Item>
                    </Col>

                    {/* Last Name */}
                    <Col span={6}>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: "Please enter your last name!" }]}
                        >
                            <Input placeholder="Enter last name" />
                        </Form.Item>
                    </Col>

                    {/* Email */}
                    <Col span={6}>
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

                    {/* Phone Number */}
                    <Col span={6}>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: "Please enter your phone number!" }]}
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {/* Identification Selection */}
                    <Col span={6}>
                        <Form.Item
                            label="Identification Type"
                            name="identificationType"
                            rules={[{ required: true, message: "Please select an identification type!" }]}
                        >
                            <Select placeholder="Select identification type">
                                <Option value="aadhar">Aadhar</Option>
                                <Option value="pan">PAN</Option>
                                <Option value="passport">Passport</Option>
                                <Option value="voter">Voter ID</Option>
                                <Option value="drivingLicense">Driving License</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Identification ID */}
                    <Col span={6}>
                        <Form.Item
                            label="Identification ID"
                            name="identificationId"
                            rules={[{ required: true, message: "Please enter your identification ID!" }]}
                        >
                            <Input placeholder="Enter identification ID" />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Address */}
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: "Please enter your address!" }]}
                        >
                            <Input.TextArea placeholder="Enter your address" rows={3} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {/* Password */}
                    <Col span={6}>
                        <Form.Item
                            label="Password"
                            name="password"
                            type="Password"
                            rules={[
                                { required: true, message: "Please enter your password!" },
                                { min: 6, message: "Password must be at least 6 characters long!" }
                            ]}
                        >
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>
                    </Col>

                    {/* Confirm Password */}
                    <Col span={6}>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: "Please confirm your password!" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Passwords do not match!")
                                        );
                                    }
                                })
                            ]}
                        >
                            <Input.Password placeholder="Confirm password" />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Submit Button */}
               <div className="flex justify-end">
                <button className="primary-contained-btn" htmlType="submit">Register</button>

               </div>

            </Form>
        </div>
    );
}

export default Register;
