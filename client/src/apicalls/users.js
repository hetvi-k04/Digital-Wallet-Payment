import axios from "axios";
const {axiosInstance} = require(".");

//login user
export const LoginUser = async (payload)=>{
    try{
        const {data}=await axiosInstance.post('/api/users/login',payload);
        return data;

    }catch(error){
        return error.response.data;

    }


}

//register user

export const RegisterUser = async (payload)=>{
    try{
        const {data}=await axiosInstance.post('/api/users/register',payload);
        return data;

    }catch(error){
        return error.response.data;

    }
}
//get user details
// export const GetUserInfo = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     console.log("Token:", token);

//     const response = await axios.post(
//       "http://localhost:5000/api/users/get-user-info",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("API Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Network Error:", error.message);
//     if (error.response) {
//       console.error("Server Response:", error.response.data);
//     }
//     throw error;
//   }
// };

export const GetUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token sent:", token);

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(
      "http://localhost:5000/api/users/get-user-info",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Server Response:", response);

    // Check if the response is structured correctly
    if (response.data && response.data.success) {
      return response.data;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Error in GetUserInfo:", error);
    throw new Error(error.response?.data?.message || "Invalid response from server");
  }
};




