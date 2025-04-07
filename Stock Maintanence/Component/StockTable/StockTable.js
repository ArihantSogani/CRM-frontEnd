import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import _ from "loadsh";

const StockTable = ({
  selectedInput,
  currentData,
  handleEdit,
  handleDelete,
  loading,
  page,
}) => {
  const [inputData, setInputData] = useState(selectedInput);
  const [tableData, setTableData] = useState(null);
  const [pagination, setPagination] = useState(10);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setPagination(page);
  }, [page]);

  useEffect(() => {
    setInputData(selectedInput);
  }, [selectedInput]);

  useEffect(() => {
    setTableData(currentData);
  }, [currentData]);

  useEffect(() => {
    setTableLoading(false);
  }, [loading]);

  const designCode = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: "20%",
    },
    {
      title: "Availability",
      key: "availible",
      width: "20%",
      render: (data) => {
        return (
          <>
            {_.get(data, "availible") ? (
              <Tag color={"#87d068"}>Yes</Tag>
            ) : (
              <Tag color={"#f50"}>No</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Gem Stones",
      key: "gemStone",
      width: "50%",
      render: (data) => {
        <>
          {_.get(data, "gemStone", []).map((gemStoneData, idx) => {
            return (
              <Tag
                color={
                  idx % 2 === 0 ? "geekblue" : idx % 3 ? "green" : "orange"
                }
              >
                {gemStoneData}
              </Tag>
            );
          })}
        </>;
      },
    },
    {
      title: "Action",
      width: "10%",
      render: (data) => {
        return (
          <div style={{ display: "flex" }}>
            <AiFillEdit
              size={24}
              color="#02374e"
              style={{ marginRight: 12 }}
              className="cursor"
              onClick={() => handleEdit(data)}
            />
            <MdDeleteOutline
              size={24}
              color="#ff4d4f"
              className="cursor"
              onClick={() => handleDelete(data)}
            />
          </div>
        );
      },
    },
  ];

  const gemColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Weight",
      render: (data) => {
        return (
          <>
            {_.get(data, "weight")
              ? `${_.get(data, "weight.$numberDecimal")} gms`
              : null}
          </>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      width: "10%",
      render: (data) => {
        return (
          <div style={{ display: "flex" }}>
            <AiFillEdit
              size={24}
              color="#02374e"
              style={{ marginRight: 12 }}
              className="cursor"
              onClick={() => handleEdit(data)}
            />
            <MdDeleteOutline
              size={24}
              color="#ff4d4f"
              className="cursor"
              onClick={() => handleDelete(data)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Table
      pagination={{
        pageSize: pagination,
      }}
      loading={tableLoading}
      style={{ width: "100%" }}
      columns={inputData === "gemstone" ? gemColumns : designCode}
      dataSource={tableData}
    />
  );
};

export default StockTable;
