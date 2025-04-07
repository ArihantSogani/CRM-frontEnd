import React, { useEffect, useState } from "react";
import { Alert, Table, Button as AntdButton } from "antd";
import { Button as Btn } from "antd";
import Button from "../../../../sharedComponents/Button/Button";
import _ from "loadsh";
import camelCaseToWord from "../../../../constants/camelCasetoWord";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { companyAdmin } from "../../../../constants/role.constants";

const OrderTable = ({
  orders,
  handleUpdate,
  handleChange,
  loading,
  handleDelete,
  selectedOrder,
  handleEdit,
  page,
}) => {
  const [tableData, setTableData] = useState(orders);
  const { user } = useSelector((state) => state.user);
  const role = _.get(user, "role");
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [pagination, setPagination] = useState(10);

  useEffect(() => {
    setPagination(page);
  }, [page]);

  const handleAlert = (data) => {
    setAlertDisplay(true);
    setDeleteData(data);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderCode",
      key: "orderCode",
      sorter: (a, b) => a.orderCode.split("-")[1] - b.orderCode.split("-")[1],
    },
    {
      title: "Jewelry Type",
      dataIndex: "jewelryType",
      key: "jewelryType",
      render: (data) => (
        <div style={{ textTransform: "capitalize" }}>{data} </div>
      ),
    },
    {
      title: "Current Process",
      dataIndex: "currentProcess",
      key: "currentProcess",
      render: (data) => <>{camelCaseToWord(data)} </>,
      filters: [
        {
          text: "Casting",
          value: "Casting",
        },
        {
          text: "Filling",
          value: "Filling",
        },
        {
          text: "Pre Polishing",
          value: "Pre Polishing",
        },
        {
          text: "Setting",
          value: "Setting",
        },
        {
          text: "Final Polishing",
          value: "Final Polishing",
        },
        {
          text: "Delivery",
          value: "Delivery",
        },
        {
          text: "Not Started",
          value: "Not Started",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.currentProcess.includes(value),
    },
    {
      title: "SKU",
      dataIndex: "designCode",
      key: "designCode",
      sorter: (a, b) => a.designCode.split("R")[1] - b.designCode.split("R")[1],
    },
    {
      title: "Type of Metal",
      dataIndex: "typeofMetal",
      key: "typeofMetal",
      render: (data) => <>{camelCaseToWord(data)}</>,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(_.get(a, "createdAt")) - new Date(_.get(b, "createdAt")),
    },
    {
      title: "Ring Size",
      dataIndex: "ringSize",
      key: "ringSize",
    },
    {
      title: "Gem Stone",
      dataIndex: "gemStone",
      key: "gemStone",
    },
    {
      title: "Action",
      key: "Action",
      render: (data) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button onClick={() => handleUpdate(data)}>
            {selectedOrder === "completed" ? "View Report" : "Update"}
          </Button>
          <Btn
            danger
            onClick={() => handleAlert(data)}
            style={{ marginTop: 6, width: "100%", borderRadius: "5px" }}
          >
            Delete
          </Btn>
        </div>
      ),
    },
    role === companyAdmin
      ? {
          title: "Edit",
          key: "Edit",
          render: (data) => (
            <AiFillEdit
              size={24}
              color="#02374e"
              className="cursor"
              onClick={() => handleEdit(data)}
            />
          ),
        }
      : {},
  ];

  useEffect(() => {
    setTableData(orders);
  }, [orders]);

  return (
    <>
      {alertDisplay ? (
        <Alert
          message="Delete"
          description="Are you sureyou want to delete the order."
          showIcon
          closable
          onClose={() => setAlertDisplay(false)}
          type="error"
          action={
            <AntdButton
              onClick={() => {
                handleDelete(deleteData);
                setAlertDisplay(false);
              }}
              size="small"
              danger
            >
              Delete
            </AntdButton>
          }
        />
      ) : null}
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={{
          pageSize: pagination,
          showPageSizeOptions: true,
        }}
        onChange={handleChange}
        loading={loading}
      />
    </>
  );
};

export default OrderTable;
