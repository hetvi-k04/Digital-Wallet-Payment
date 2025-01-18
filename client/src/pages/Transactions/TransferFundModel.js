import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyAccount } from '../../apicalls/transactions';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { TransferFunds } from '../../apicalls/transactions';

function TransferFundModel({ showTransferFundsModel, setShowTransferFundsModel, reloadData }) {
    const user = useSelector((state) => state.users.user);
    const [isVerified, setVerified] = useState(false);
    const [notification, setNotification] = useState({ type: '', message: '' });
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    // Reset verification when the receiver account changes
    const handleFieldChange = (changedFields) => {
        if (changedFields.some(field => field.name[0] === 'receiver')) {
            setVerified(false);
            setNotification({ type: '', message: '' });
        }
    };

    // Show custom notifications
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification({ type: '', message: '' }), 3000);
    };

    const verifyAccount = async () => {
        const receiver = form.getFieldValue('receiver');

        if (!receiver) {
            showNotification('error', 'Receiver is required!');
            return;
        }

        try {
            dispatch(ShowLoading());
            const response = await VerifyAccount({ receiver });
            dispatch(HideLoading());

            if (response.success) {
                setVerified(true);
                showNotification('success', 'Account Verified Successfully');
            } else {
                setVerified(false);
                showNotification('error', 'Invalid Account');
            }
        } catch (error) {
            dispatch(HideLoading());
            console.error('Error:', error);
            showNotification('error', 'Error verifying account');
            setVerified(false);
        }
    };

    const onFinish = async (values) => {
        console.log("Stored Token:", localStorage.getItem("token"));

        try {
            dispatch(ShowLoading());

            const payload = {
                ...values,
                sender: user._id,
                amount: Number(values.amount),
                reference: values.reference || "no reference",
                status: "success",
            };

            const response = await TransferFunds(payload);

            console.log("Transfer Response:", response);

            if (response.success) {
                setShowTransferFundsModel(false);
                reloadData();
                showNotification('success', `Transfer Successful! ₹${values.amount} sent.`);
            } else {
                showNotification('error', `Transfer Failed: ${response.message}`);
            }

            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            console.error("Error during transfer:", error);

            showNotification('error', 'Error: Something went wrong during the transfer.');
        }
    };

    // Debugging: Log notification state to ensure it updates
    useEffect(() => {
        console.log("Notification state updated:", notification);
    }, [notification]);

    return (
        <Modal
            title="Transfer Funds"
            open={showTransferFundsModel}
            onCancel={() => setShowTransferFundsModel(false)}
            footer={null}
        >
            {/* Custom Notification */}
            {notification.message && (
                <div
                    style={{
                        padding: '10px',
                        marginBottom: '10px',
                        color: notification.type === 'error' ? '#D8000C' : '#4F8A10',
                        backgroundColor: notification.type === 'error' ? '#FFD2D2' : '#DFF2BF',
                        border: `1px solid ${notification.type === 'error' ? '#D8000C' : '#4F8A10'}`,
                        borderRadius: '5px',
                        textAlign: 'center',
                    }}
                >
                    {notification.message}
                </div>
            )}

            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                onFieldsChange={(_, allFields) => handleFieldChange(allFields)}
            >
                <div className="flex gap-2 items-center">
                    <Form.Item
                        label="Account Number"
                        name="receiver"
                        rules={[{ required: true, message: "Please input the receiver's account number!" }] }
                        className="w-100"
                    >
                        <Input />
                    </Form.Item>
                    <button
                        className="primary-contained-btn mt-1"
                        type="button"
                        onClick={verifyAccount}
                    >
                        Verify
                    </button>
                </div>

                {isVerified && (
                    <div style={{ color: 'green', marginBottom: '10px' }}>
                        ✅ Account Verified Successfully
                    </div>
                )}

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        { required: true, message: "Please input your amount!" },
                        {
                            validator: (_, value) => {
                                const amount = Number(value);
                                if (!amount || amount <= 0) {
                                    return Promise.reject("Please enter a valid amount!");
                                }
                                if (amount > user.balance) {
                                    return Promise.reject("Insufficient Balance!");
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input type="number" min="1" />
                </Form.Item>

                <Form.Item label="Reference" name="reference">
                    <Input.TextArea />
                </Form.Item>

                <div className="flex justify-end gap-1">
                    <button
                        type="button"
                        className="primary-outlined-btn"
                        onClick={() => setShowTransferFundsModel(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-contained-btn"
                        disabled={
                            !(Number(form.getFieldValue("amount")) > 0 &&
                              Number(form.getFieldValue("amount")) <= user.balance &&
                              isVerified)
                        }
                    >
                        Transfer
                    </button>
                </div>
            </Form>
        </Modal>
    );
}

export default TransferFundModel;
