import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import dateConverter from "../../../constants/convertDate";

const CompanyTable = ({
  data,
  handleApproval,
  handleDenial,
  handleChange,
  loading,
  handlePaid,
}) => {
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Request Sent time.",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => <>{dateConverter(data)}</>,
    },
    {
      title: "Company Status",
      key: "isApproved",
      render: (data) => (
        <Tag
          color={
            data.isApproved
              ? "blue"
              : data.isApproved === null
              ? "orange"
              : "red"
          }
        >
          {data.isApproved
            ? "Approved"
            : data.isApproved === null
            ? "Waiting for Approval"
            : "Not Approved"}
        </Tag>
      ),
    },
    {
      title: "Paid Company",
      key: "isPaidCompany",
      render: (data) => (
        <Tag
          onClick={(e) => handlePaid(e, data)}
          color={data.isPaidCompany ? "geekblue" : "error"}
          className="cursor"
        >
          {data.isPaidCompany ? "Paid" : "Not Paid"}{" "}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <>
          <Button
            onClick={() => handleApproval(data)}
            type="primary"
            style={{ marginRight: "12px" }}
          >
            Approve
          </Button>
          <Button onClick={() => handleDenial(data)} danger>
            Denial
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <Table
      dataSource={tableData}
      loading={loading}
      columns={columns}
      onChange={handleChange}
      pagination={{
        pageSize: 10,
        showPageSizeOptions: true,
      }}
    />
  );
};

export default CompanyTable;
