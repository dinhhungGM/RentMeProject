import "./SidebarSetting.scss";
import { memo } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "features/Auth/AuthSlice";
import socket  from "utils/socket";

function SidebarSetting() {
  
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(logout());
    socket.emit('logout')
    history.push("/");
  };
  
  return (
    <div className="menu">
      <div className="menu__setting">
        <div className="menu__setting--tile">Settings</div>
        <NavLink
          to="/setting/profile"
          className="setting__item"
          activeClassName="setting__item--active"
        >
          <div className="setting__list">Edit Profile</div>
        </NavLink>
        <NavLink
          to="/setting/wallet"
          className="setting__item"
          activeClassName="setting__item--active"
        >
          <div className="setting__list">Wallet</div>
        </NavLink>
        {user?.typeAccount === "local" ? (
          <NavLink
            to="/setting/privacy"
            className="setting__item"
            activeClassName="setting__item--active"
          >
            <div className="setting__list">Privacy</div>
          </NavLink>
        ) : (
          <></>
        )}
        {user?.role === 0 ? (
          <NavLink
            to="/admin"
            className="setting__item"
            activeClassName="setting__item--active"
          >
            <div className="setting__list">Admin Page</div>
          </NavLink>
        ) : (
          <></>
        )}
        <hr />
        <div className="setting__list" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}
export default memo(SidebarSetting)