"use client";
import React, { useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table, Modal, Form, Input } from "antd";
import inventoryData from "@/app/constants/TempPayloadsFolder/inventoryData";

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const InventoryTable = () => {
  type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
  type Filters = Parameters<OnChange>[1];

  type GetSingle<T> = T extends (infer U)[] ? U : never;
  type Sorts = GetSingle<Parameters<OnChange>[2]>;

  interface DataType {
    product: string;
    key: string;
    type: string;
    quantity: number;
    vendor: string;
    model: string;
  }

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invData, setInvData] = useState(inventoryData);

  const [form] = Form.useForm();

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const calculateFilters = (data, column) => {
    const temp = [];
    for (let i = 0; i < data.length; i++) {
      const dict = {};
      dict["value"] = data[i][column];
      dict["text"] = data[i][column];
      temp.push(dict);
    }
    return temp;
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      filters: calculateFilters(invData, "product"),
      filteredValue: filteredInfo.product || null,
      onFilter: (value, record) => record.product.includes(value as string),
      sorter: (a, b) => a.product.length - b.product.length,
      sortOrder: sortedInfo.columnKey === "product" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: calculateFilters(invData, "type"),
      sorter: (a, b) => a.type.length - b.type.length,
      sortOrder: sortedInfo.columnKey === "type" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      filters: calculateFilters(invData, "vendor"),
      filteredValue: filteredInfo.vendor || null,
      onFilter: (value, record) => record.vendor.includes(value as string),
      sorter: (a, b) => a.vendor.length - b.vendor.length,
      sortOrder: sortedInfo.columnKey === "vendor" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      filters: calculateFilters(invData, "model"),
      filteredValue: filteredInfo.model || null,
      onFilter: (value, record) => record.model.includes(value as string),
      sorter: (a, b) => a.model.length - b.model.length,
      sortOrder: sortedInfo.columnKey === "model" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      //filters: calculateFilters(inventoryData, "product"),
      filteredValue: filteredInfo.quantity || null,
      //onFilter: (value, record) => record.quantity,
      sorter: (a, b) => a.quantity - b.quantity,
      sortOrder: sortedInfo.columnKey === "quantity" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const length = invData.length;
    const key = length + 1 + "";
    const temp = {}
    temp["key"] = key;
    temp["product"] = values.product;
    temp["vendor"] = values.vendor;
    temp["type"] = values.type;
    temp["quantity"] = values.quantity;
    temp["model"] = values.model;
    invData.push(temp);
    setInvData([...invData]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a Product
      </Button>
      <Table
        columns={columns}
        dataSource={invData}
        onChange={handleChange}
      />
      <Modal
        title="Product Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="product"
            label="Product"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vendor"
            label="Vendor"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form}>Submit</SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InventoryTable;
