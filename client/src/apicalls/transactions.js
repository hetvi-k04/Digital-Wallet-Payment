import axios from "axios";
import { axiosInstance } from ".";

// Verify account
export const VerifyAccount = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Authentication token is missing");
        }

        const response = await axios.post(
            "/api/transactions/verify-account",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error verifying account:", error);
        throw error;
    }
};

// Transfer funds
export const TransferFunds = async (payload) => {
    try {
        const token = localStorage.getItem("token");  // Get the token from localStorage
        const response = await axiosInstance.post(
            "/api/transactions/transfer-funds",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Attach the token here
                },
            }
        );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

  export const GetTransactionsofUser = async () => {
    try {
        const response = await axiosInstance.post('/api/transactions/get-all-transactions-by-user');
        return response.data; // Ensure the structure is `{ success: true, data: [...] }`
    } catch (error) {
        return { success: false, message: error.message }; // Proper error message format
    }
};



