import React from "react";
import style from "./PersonalComponent.module.css";
import { BellFilled, DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, notification } from "antd";
import api from "../../http/api";
import { useCookies } from "react-cookie";
import { setLogout } from "../../store/authSlice";
import { get } from "loadsh";
import { useNavigate } from "react-router";
import { setLoadingFalse, setLoadingTrue } from "../../store/LoadingSlice";

const PersonalComponent = () => {
  const dispach = useDispatch();
  const { user, company } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cookie, , removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispach(setLoadingTrue());
    try {
      await api.get("/api/v1/user/logout", {
        headers: {
          Authorization: `Bearer ${cookie.session.token}`,
        },
      });
      removeCookie("session");
      dispatch(setLogout());
      dispach(setLoadingFalse());
      notification.success({
        message: "Logged Out Successfully!",
      });
      navigate("/");
    } catch (err) {
      dispach(setLoadingFalse());
      notification.error({
        message: get(err, "response.data.message", "Error"),
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key={12}>
        <div>Profile</div>
      </Menu.Item>
      <Menu.Item key={13}>
        <div onClick={handleLogout}>Logout</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.container}>
      <BellFilled style={{ fontSize: 24, color: "#02374E" }} />
      <Dropdown overlay={menu} placement="bottomRight">
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img className={style.image} src={get(user, 'profile', get(company, 'logo'))} alt="" />
          <DownOutlined />
        </span>
      </Dropdown>
    </div>
  );
};

export default PersonalComponent;
