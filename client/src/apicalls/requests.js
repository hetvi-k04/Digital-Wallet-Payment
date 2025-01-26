import { axiosInstance } from ".";
// Get all requests by user
export const GetAllRequestsByUser = async () => {
  try {
    const response = await axiosInstance.post("/api/requests/get-all-requests-by-user");
    return response.data;  // Correctly returning the 'data' from the response
  } catch (error) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};


export const SendRequest = async (requestData) => {
  console.log("Request Data:", requestData);
  try {
    console.log("Sending Request Data:", requestData); // Log the request payload
    const response = await axiosInstance.post("/api/requests/send-request", requestData);
    console.log("API Response:", response.data); // Log the API response
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : { message: "An error occurred" };
  }
};

//Accept Request
export const AcceptRequest = async (requestData) => {
  try {
    const response = await axiosInstance.post("/api/requests/accept-request", requestData); // Pass the request ID or necessary data
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { message: "An error occurred" };
  }
};

// Decline a request
export const DeclineRequest = async (requestData) => {
  try {
    const response = await axiosInstance.post("/api/requests/decline-request", requestData); // Pass the request ID or necessary data
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { message: "An error occurred" };
  }
};

