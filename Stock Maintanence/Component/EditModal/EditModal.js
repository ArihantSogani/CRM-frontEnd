import { Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import style from "./EditModal.module.css";
import { Formik } from "formik";
import Input from "../../../../sharedComponents/Input/Input";
import _ from "loadsh";
import Button from "../../../../sharedComponents/Button/Button";
import api from "../../../../http/api";
import { useCookies } from "react-cookie";

const EditModal = ({ visible, handleClose, modalData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      await api.patch(
        `/api/v1/storage/jewelry/gemstone/${_.get(modalData, "_id")}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        }
      );
      notification.success({
        message: `${_.get(modalData, "name")} updated successfully.`,
      });
      handleClose();
    } catch (err) {
      console.log(err);
      notification.warn({
        message: _.get(err, "response.data.message", "Error"),
      });
    }
    setLoading(false);
  };

  return (
    <Modal
      width={"40%"}
      visible={open}
      footer={null}
      title="Edit"
      closable
      onCancel={handleClose}
    >
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={{
          name: _.get(modalData, "name"),
          shape: _.get(modalData, "shape"),
          size: _.get(modalData, "size"),
          weight: _.get(modalData, "weight.$numberDecimal"),
          quantity: _.get(modalData, "quantity"),
          price: _.get(modalData, "price"),
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form className={style.modalStructure}>
            <div className={style.flexRow}>
              <div className={style.selectInput}>
                Gem Stone Name:
                <Input
                  name={"name"}
                  value={_.get(values, "name")}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className={style.select}
                />
              </div>
              <div className={style.selectInput}>
                Gem Stone Shape:
                <Input
                  name={"shape"}
                  value={_.get(values, "shape")}
                  onChange={handleChange}
                  placeholder="Enter Shape"
                  className={style.select}
                />
              </div>
            </div>
            <div className={style.flexRow}>
              <div className={style.selectInput}>
                Gem Stone Size:
                <Input
                  name={"size"}
                  value={_.get(values, "size")}
                  onChange={handleChange}
                  className={style.select}
                  placeholder="Enter Size"
                />
              </div>
              <div className={style.selectInput}>
                Gem Stone Weight:
                <Input
                  name={"weight"}
                  value={_.get(values, "weight")}
                  onChange={handleChange}
                  className={style.select}
                  placeholder="Enter Weight"
                />
              </div>
            </div>
            <div className={style.flexRow}>
              <div className={style.selectInput}>
                Gem Stone Quantity:
                <Input
                  name={"quantity"}
                  value={_.get(values, "quantity")}
                  onChange={handleChange}
                  placeholder="Enter Quantity"
                  className={style.select}
                />
              </div>
              <div className={style.selectInput}>
                Gem Stone Price:
                <Input
                  name={"price"}
                  value={_.get(values, "price")}
                  onChange={handleChange}
                  className={style.select}
                  placeholder="Enter Price"
                />
              </div>
            </div>
            <div className={style.footer}>
              <p onClick={handleClose}>Cancel</p>
              <Button loading={loading} onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditModal;
