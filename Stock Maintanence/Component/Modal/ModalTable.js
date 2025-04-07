import React from "react";
import { Table } from "antd";
import { get } from "loadsh";

const ModalTable = (props) => {
    const { handleChange, loading } = props;

    const columns = [
        {
            title: "Reference ID",
            dataIndex: "",
            key: "reference_id"
        },
        {
            title: "Stock (In/Out)",
            dataIndex: "name",
            key: "stock"
        },
        {
            title: "Weight",
            dataIndex: "weight",
            key: "weight"
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        }
    ];

    return (
        <Table

            columns={columns}
            pagination={{
                pageSize: 10,
                showPageSizeOptions: true,
            }}
            onChange={handleChange}
            loading={loading} />
    );
};

export default ModalTable;