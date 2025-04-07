import React from "react";
import logo from "../Logo/logo";
import style from "./Navbar.module.css";
import { Link, useLocation, Outlet } from "react-router-dom";
import { AiFillHome, AiTwotonePieChart } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { RiListSettingsLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { admin, companyAdmin, customer } from "../../constants/role.constants";
import { get } from "loadsh";
import { IoIosPeople } from "react-icons/io";
import { VscNewFile } from "react-icons/vsc";

const Navbar = () => {
  const { isCompany, user } = useSelector((state) => state.user);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const role = get(user, "role");

  return role === customer ? (
    <Outlet />
  ) : (
    <>
      <div className={style.navbar}>
        <div className={style.background}>
          {/* <img src={logo} alt="" /> */}
          <h2 style={{ fontSize: 36, fontWeight: 500, margin: "36px 0" }}>CRM</h2>
          <ul>
            {isCompany || role === admin ? (
              <li className={`${path === "" ? style.selected : null}`}>
                <Link to="/home" className={`${style.textLink}`}>
                  <div className={style.LiItem}>
                    <AiFillHome size={24} className={style.Icon} />
                    Home
                  </div>
                </Link>
              </li>
            ) : (
              <>
                <li className={`${path === "order" ? style.selected : null}`}>
                  <Link to="/order" className={style.textLink}>
                    <div className={style.LiItem}>
                      <FaClipboardList size={24} className={style.Icon} />
                      Orders
                    </div>
                  </Link>
                </li>
                <li
                  className={`${path === "stockmaintanence" ? style.selected : null
                    }`}
                >
                  <Link to="/stockmaintanence" className={style.textLink}>
                    <div className={style.LiItem}>
                      <RiListSettingsLine size={24} className={style.Icon} />
                      Stock Maintanence
                    </div>
                  </Link>
                </li>
                {/* <li className={`${path === "reports" ? style.selected : null}`}>
                  <Link to="/reports" className={style.textLink}>
                    <div className={style.LiItem}>
                      <AiTwotonePieChart size={24} className={style.Icon} />
                      Reports
                    </div>
                  </Link>
                </li> */}
              </>
            )}
            {role === companyAdmin ? (
              <>
                <li className={`${path === "ems" ? style.selected : null}`}>
                  <Link to="/ems" className={style.textLink}>
                    <div className={style.LiItem}>
                      <BsFillPersonFill size={24} className={style.Icon} />
                      EMS
                    </div>
                  </Link>
                </li>
                <li
                  className={`${path === "signupPortal" ? style.selected : null
                    }`}
                >
                  <Link to="/signupPortal" className={style.textLink}>
                    <div className={style.LiItem}>
                      <IoIosPeople size={24} className={style.Icon} />
                      Signup Panel
                    </div>
                  </Link>
                </li>
                <li
                  className={`${path === "addOrder" ? style.selected : null}`}
                >
                  <Link to="/addOrder" className={style.textLink}>
                    <div className={style.LiItem}>
                      <VscNewFile size={24} className={style.Icon} />
                      Add Order
                    </div>
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
