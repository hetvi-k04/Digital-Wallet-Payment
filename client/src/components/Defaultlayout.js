import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function Defaultlayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [showUsername, setShowUsername] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize collapsed state based on localStorage
  useEffect(() => {
    const savedCollapseState = localStorage.getItem("collapsed");
    if (savedCollapseState) {
      setCollapsed(JSON.parse(savedCollapseState));
    }
  }, []);

  // Function to toggle sidebar collapse state
  const toggleCollapse = () => {
    setCollapsed((prevState) => {
      const newState = !prevState;
      localStorage.setItem("collapsed", JSON.stringify(newState)); // Persist state
      return newState;
    });
  };

  // Function to check if the menu item is active
  const isActive = (path) => location.pathname === path ? 'active' : '';

  // User menu items
  const userMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-8-fill"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-fill"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-fill"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-profile-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-fill"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  // Admin menu items
  const adminMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-8-fill"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Users",
      icon: <i className="ri-user-community-fill"></i>,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-fill"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-fill"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-profile-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-fill"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const menuToRender = user?.isadmin ? adminMenu : userMenu;

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="menu">
          {menuToRender.map((item, index) => (
            <div
              key={index}
              className={`menu-item flex text-white ${isActive(item.path)}`}
              onClick={item.onClick}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="body">
        {/* Header */}
        <div className="header flex justify-between items-center">
          {/* Toggle Button */}
          <div className="text-white">
            {collapsed ? (
              <i
                className="ri-close-circle-fill"
                onClick={toggleCollapse}
              ></i>
            ) : (
              <i
                className="ri-menu-3-line"
                onClick={toggleCollapse}
              ></i>
            )}
          </div>

          {/* Title */}
          <div className="header-title">
            <h1 className="text-xl text-white">QUICK PAY</h1>
          </div>

          {/* User Info with Icon */}
          {user && (
            <div
              className="user-info flex items-center gap-2 cursor-pointer"
              onClick={() => setShowUsername(!showUsername)} // Toggle visibility of username
            >
              <i className="ri-user-line text-white"></i>
              {showUsername && (
                <h1 className="text-md text-white underline">
                  {user.firstName} {user.lastName}
                </h1>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Defaultlayout;
