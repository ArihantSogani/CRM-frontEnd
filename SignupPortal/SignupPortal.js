import { Select } from "antd";
import React, { useState } from "react";
import PersonalComponent from "../../sharedComponents/PersonalComponent/PersonalComponent";
import CustomerSignUp from "../SignUp/CustomerrSignUp/CustomerSignUp";
import style from "./SignupPortal.module.css";

const SignupPortal = () => {
  const [type, setType] = useState("signupCompanyAdmin");

  const options = [
    {
      label: "Company Admin",
      value: "signupCompanyAdmin",
    },
    {
      label: "Employee",
      value: "signupEmployee",
    },
  ];

  const { Option } = Select;

  return (
    <div className={style.structure}>
      <div className={style.upperStructure}>
        <PersonalComponent />
        <Select
          style={{
            width: 150,
          }}
          placeholder="Select Account Type."
          onChange={(e) => setType(e)}
          defaultValue={"signupCompanyAdmin"}
        >
          {options.map((data, idx) => {
            return (
              <Option value={data.value} key={idx}>
                {data.label}
              </Option>
            );
          })}
        </Select>
      </div>
      <CustomerSignUp type={type} />
    </div>
  );
};

export default SignupPortal;
