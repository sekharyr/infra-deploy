import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Table,
  Typography,
} from "antd";

const { Title } = Typography;

const AuxMaterials = () => {
  const [form] = Form.useForm();

  const dataSource = [
    {
      key: "1",
      label: "Main Grounding Bar",
      name: "groundingBar",
    },
    {
      key: "2",
      label: "Busbar Height",
      name: "busbarHeight",
    },
    {
      key: "3",
      label: "Existing Pole",
      name: "existingPole",
    },
    {
      key: "4",
      label: "Outdoor Cable Tray",
      name: "outdoorCableTray",
    },
    {
      key: "5",
      label: "Indoor Cable Tray",
      name: "indoorCableTray",
    },
  ];

  const columns = [
    {
      title: "Item",
      dataIndex: "label",
      key: "label",
      fixed: "left", // Fixes the first column
      width: 200,
      render: (text) => <strong>{text}</strong>, // Bold labels
    },
    {
      title: "Existing or Not",
      dataIndex: "existingOrNot",
      key: "existingOrNot",
      width: 200,
      render: (_, record) => (
        <Form.Item name={`${record.name}Status`} style={{ marginBottom: 0 }}>
          <Select placeholder="Existing or Not">
            <Select.Option value="existing">Existing</Select.Option>
            <Select.Option value="not">Not Existing</Select.Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      width: 100,
      render: (_, record) => (
        <Form.Item name={`${record.name}Qty`} style={{ marginBottom: 0 }}>
          <InputNumber min={0} placeholder="Qty" style={{ width: "100%" }} />
        </Form.Item>
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (_, record) => (
        <Form.Item name={`${record.name}Notes`} style={{ marginBottom: 0 }}>
          <Input placeholder="Notes" />
        </Form.Item>
      ),
    },
  ];

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Title level={3}>AuxMaterials</Title>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: 800 }} // Enables horizontal scrolling if needed
        // style={{ marginBottom: "16px" }}
        size="small"
      />

      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default AuxMaterials;
