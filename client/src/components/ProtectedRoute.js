// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/usersSlice';
import Defaultlayout from "./Defaultlayout"
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('Token from localStorage:', token);
    if (token) {
      // Fetch user data if token exists
      const fetchUserData = async () => {
        try {
          const response = await GetUserInfo();
          if (response.success) {
            dispatch(setUser(response.data));
          } else {
            message.error("Failed to fetch user data");
            navigate("/login");
          }
        } catch (error) {
          message.error("Failed to fetch user data");
          navigate("/login");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // Show loading screen until data is fetched
  return (
    user ? (
        <div>
            <Defaultlayout>
                {children}
            </Defaultlayout>
        </div>
    ) : null
);

}

export default ProtectedRoute;
