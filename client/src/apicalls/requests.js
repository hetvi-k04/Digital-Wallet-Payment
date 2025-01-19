import { axiosInstance } from ".";

// Get all requests by user
export const GetAllRequestsByUser = async () => {
  try {
    const response = await axiosInstance.post("/requests/get-all-requests-by-user");
    return response.data;  // Correctly returning the 'data' from the response
  } catch (error) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};

// Send request to another user
export const SendRequest = async (requestData) => {
  try {
    const response = await axiosInstance.post("/api/requests/send-request", requestData);  // Make sure to send requestData
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};
