// import React, { useEffect } from 'react';
// import { GetUserInfo } from '../../apicalls/users';
// import { message } from 'antd';

// function Home() {
//   const [userData, setUserData] = React.useState(null);

//   const getData = async () => {
//     try {
//       const response = await GetUserInfo();
//       console.log("API Response:", response); // Debug the response

//       if (response.success && response.data) {
//         setUserData(response.data);
//       } else {
//         message.error("Failed to fetch user data.");
//       }
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div>
//       <h1>Hello, Welcome to QUICK PAY</h1>
//       {userData ? (
//         <h2>User: {userData.firstName} {userData.lastName}</h2>
//       ) : (
//         <h2>Loading user data...</h2>
//       )}
//     </div>
//   );
// }

// export default Home;
import React,{useEffect} from 'react';
// import { GetUserInfo } from '../../apicalls/users';
//  import { message } from 'antd';

function Home() {


 
  return (
    <div>
      Home
    </div>
  )
}

export default Home

