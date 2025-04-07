import { notification } from "antd";
import React, { useEffect, useState } from "react";
import PersonalComponent from "../../../sharedComponents/PersonalComponent/PersonalComponent";
import style from "./HomePage.module.css";
import { get } from "loadsh";
import api from "../../../http/api";
import { useCookies } from "react-cookie";
import CompanyTable from "../CompanyTable/CompanyTable";

const HomePage = () => {
  const [cookie] = useCookies();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePaid = async (e, data) => {
    setLoading(true);
    console.log(e.target.innerHTML);
    try {
      let companies;
      if (e.target.innerHTML.trim() === "Not Paid") {
        companies = await api.get(`/api/v1/company/paid/${get(data, "_id")}`, {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });
      } else {
        companies = await api.get(
          `/api/v1/company/notpaid/${get(data, "_id")}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.session.token}`,
            },
          }
        );
      }
      setCompanyData(get(companies, "data.data.company"));
      notification.success({
        message: `${get(data, "name")} Payment changed.`,
      });
    } catch (err) {
      notification.warn({
        message: get(err, "response.data.message", "Error"),
      });
      console.log(err);
    }
    setLoading(false);
  };

  const handleApprove = async (data) => {
    setLoading(true);
    try {
      const companies = await api.get(
        `/api/v1/company/approve/${get(data, "_id")}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        }
      );
      setCompanyData(get(companies, "data.data.company"));
      notification.success({
        message: `${get(data, "name")} is Approved.`,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      notification.warn({
        message: get(err, "response.data.message", "Error"),
      });
    }
  };

  const handleDenial = async (data) => {
    setLoading(true);
    try {
      const companies = await api.get(
        `/api/v1/company/denial/${get(data, "id")}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        }
      );
      setCompanyData(get(companies, "data.data.company"));
      notification.success({
        message: `${get(data, "name")} is Denied.`,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      notification.warn({
        message: get(err, "response.data.message", "Error"),
      });
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await api.get("/api/v1/company/", {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });
        setCompanyData(get(data, "data.data.company"));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
        notification.warn({
          message: get(err, "response.data.message", "Error"),
        });
      }
    })();
  }, [cookie]);

  return (
    <div style={{ paddingLeft: "180px" }}>
      <div className={style.upperContainer}>
        <PersonalComponent />
      </div>
      <div className={style.lowerBody}>
        <h1>Companies</h1>
        <div className={style.card}>
          <CompanyTable
            handleApproval={handleApprove}
            data={companyData}
            loading={loading}
            handlePaid={handlePaid}
            handleDenial={handleDenial}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
