import { Checkbox, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Input from "../../../../sharedComponents/Input/Input";
import style from "../EditModal/EditModal.module.css";
import _ from "loadsh";

const { Option } = Select;

const DesignModal = ({ visible, handleClose, modalData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  return (
    <Modal
      visible={open}
      handleClose={handleClose}
      footer={null}
      title="Edit"
      closable
    >
      <div className={style.modalStructure}>
        <div className={style.flexRow}>
          <div className={style.selectInput}>
            Design Code:
            <Input
              placeholder={"Enter design code."}
              className={style.select}
            />
          </div>
          <div className={style.selectInput}>
            Availible:
            <Checkbox />
          </div>
        </div>
        <div className={style.flexRow}>
          <Select mode={"tags"}>
            {
              _.get(modalData, "gemStone", []).map((gem) => {
                return <Option value={"gem"}>
                  
                </Option>
              })
            }
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default DesignModal;
