import React from "react";
import { Table } from "antd";
import { get } from "loadsh";

const StockTable = (props) => {
    const { stocks, handleChange, loading } = props;

    const columns = [
        {
            title: "Stock ID",
            dataIndex: "stockCode",
            key: "stockId",
        },
        {
            title: "Dealer Name",
            dataIndex: "dealerName",
            key: "dealerName",
        },
        {
            title: "Contact no.",
            dataIndex: "contactNo",
            key: "contactNo",
        },
        {
            title: "Date",
            dataIndex: "arrivalAt",
            key: "arrivalAt",
        },
        {
            title: "Cost",
            dataIndex: "cost",
            key: "cost",
        },
    ];
    return (
        <Table
            dataSource={get(stocks, "stock", [])}
            columns={columns}
            pagination={{
                pageSize: 10,
                showPageSizeOptions: true,
            }}
            onChange={handleChange}
            loading={loading}
        />
    );
};

export default StockTable;