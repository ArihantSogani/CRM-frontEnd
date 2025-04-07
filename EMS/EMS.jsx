import React, { useEffect, useState } from "react";
import style from "./EMS.module.css";
import Button from "../../sharedComponents/Button/Button";
import { GrAdd } from "react-icons/gr";
import Input from "../../sharedComponents/Input/Input";
import PersonalComponent from "../../sharedComponents/PersonalComponent/PersonalComponent";
import { useCookies } from "react-cookie";
import api from "../../http/api";
import MiniLoader from "../../sharedComponents/MiniLoader/MiniLoader";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router";

const EMS = () => {
  const [cookies] = useCookies();
  const [employeesData, setEmployeesData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await api.get("/api/v1/user/getAllEmployees", {
          headers: {
            Authorization: `Bearer ${cookies.session.token}`,
          },
        });
        setEmployeesData(data.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className={style.upperContainer}>
        <PersonalComponent />
      </div>
      <div className={style.structure}>
        <div className={style.flexRow} style={{ alignItems: "flex-end" }}>
          <h1 className={style.emsCnt}>111</h1>
          <p className={style.content}>Total Employees</p>
        </div>
        <div
          className={style.flexRow}
          style={{ justifyContent: "space-between", margin: "16px 0" }}
        >
          <div className={style.flexRow} style={{ width: "40%" }}>
            <Input
              className={style.searchBox}
              placeholder={"Search by Employee Id"}
            />
          </div>
          <Button buttonStyle={{ width: "20%", fontWeight: "500" }} onClick={() => navigate("/signupPortal")}>
            <GrAdd
              style={{
                background: "white",
                borderRadius: "50%",
                fontSize: 16,
                padding: 4,
                marginRight: 12,
              }}
            />{" "}
            Add Employee
          </Button>
        </div>
        {isLoading ? (
          <div
            className={style.flexRow}
            style={{ width: "100%", justifyContent: "center" }}
          >
            <MiniLoader />
          </div>
        ) : (
          <div className={style.flexRow} style={{ flexWrap: true }}>
            {employeesData.map((data, idx) => {
              return (
                <div className={style.card} style={{ marginRight: 16 }}>
                  <img
                    src={
                      data?.profileImage !== ""
                        ? data?.profileImage
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt=""
                  />
                  <h1>{data?.name}</h1>
                  <p>
                    <CiMail size={24} style={{ marginRight: 8 }} />{" "}
                    {data?.email}
                  </p>
                  <p>
                    <BsFillTelephoneOutboundFill
                      size={16}
                      style={{ marginRight: 16 }}
                    />{" "}
                    {data?.mobileNumber}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EMS;
