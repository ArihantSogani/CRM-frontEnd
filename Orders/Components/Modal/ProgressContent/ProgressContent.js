import React, { useState } from "react";
import { Menu } from "antd";
import style from "./ProgressContent.module.css";
import { AiOutlineEdit } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";
import Casting from "./Casting/Casting";
import Filing from "./Filing/Filing";
import Setting from "./Setting/Setting";
import PrePolishing from "./PrePolishing/PrePolishing";
import FinalPolishing from "./FinalPolishing/FinalPolishing";
import Delivery from "./Delivery/Delivery";
import { useSelector } from "react-redux";

const ProgressContent = (props) => {
  const { processCount } = useSelector((state) => state.order);
  const { SubMenu } = Menu;

  const rootSubmenuKeys = ["casting", "cleaning", "prePolish"];

  const [openKeys, setOpenKeys] = useState([`sub${processCount + 1}`]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className={style.contentContainer}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        className={style.MenuTitle}
      >
        <>
          <SubMenu
            style={{
              display: `${processCount >= 1 ? "inherit" : "none"}`,
            }}
            key="sub1"
            title={
              <>
                Casting <AiOutlineEdit className={`${style.icon}`} />{" "}
                <BiCommentAdd className={`${style.icon}`} />
              </>
            }
          >
            <Casting style={style} />
          </SubMenu>
          <SubMenu
            style={{
              display: `${processCount >= 2 ? "inherit" : "none"}`,
            }}
            key="sub2"
            title={
              <>
                Filing <AiOutlineEdit className={`${style.icon}`} />{" "}
                <BiCommentAdd className={`${style.icon}`} />
              </>
            }
          >
            <Filing style={style} />
          </SubMenu>
          <SubMenu
            key="sub3"
            style={{
              display: `${processCount >= 3 ? "inherit" : "none"}`,
            }}
            title={
              <>
                Pre Polishing <AiOutlineEdit className={`${style.icon}`} />{" "}
                <BiCommentAdd className={`${style.icon}`} />
              </>
            }
          >
            <PrePolishing style={style} />
          </SubMenu>
          <SubMenu
            key="sub4"
            style={{
              display: `${processCount >= 4 ? "inherit" : "none"}`,
            }}
            title={
              <>
                Setting <AiOutlineEdit className={`${style.icon}`} />{" "}
                <BiCommentAdd className={`${style.icon}`} />
              </>
            }
          >
            <Setting style={style} />
          </SubMenu>
          <SubMenu
            key="sub5"
            style={{
              display: `${processCount >= 5 ? "inherit" : "none"}`,
            }}
            title={
              <>
                Final Polishing <AiOutlineEdit className={`${style.icon}`} />{" "}
                <BiCommentAdd className={`${style.icon}`} />
              </>
            }
          >
            <FinalPolishing style={style} />
          </SubMenu>
          <SubMenu
            key="sub5"
            style={{
              display: `${processCount >= 6 ? "inherit" : "none"}`,
            }}
            title={
              <>
                Delivery <AiOutlineEdit className={`${style.icon}`} />{" "}
                <BiCommentAdd className={`${style.icon}`} />
              </>
            }
          >
            <Delivery style={style} />
          </SubMenu>
        </>
      </Menu>
    </div>
  );
};

export default ProgressContent;
