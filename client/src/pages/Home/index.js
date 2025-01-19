import React from "react";
import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";

function Home() {
  const user = useSelector((state) => state.users.user);

  return (
    <div className="p-6">
      <PageTitle title={`Hello, ${user.firstName} ${user.lastName}! Welcome to Quick Pay`} />

      {/* Account Summary */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md p-6 mt-4 w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Account Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Account Number:</span>
          <span className="font-medium">{user._id}</span>
        </div>
        <div className="flex justify-between">
          <span>Balance:</span>
          <span className="font-medium">₹ {user.balance || 0}</span>
        </div>
      </div>

      {/* User Details */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6 w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="flex justify-between mb-2">
          <span>First Name:</span>
          <span>{user.firstName}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Last Name:</span>
          <span>{user.lastName}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span>ID Type:</span>
          <span>{user.identificationType}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
