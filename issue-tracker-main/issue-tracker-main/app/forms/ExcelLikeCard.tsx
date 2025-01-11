import { Tabs, Table, Card, Tag } from "antd";
import { useState } from "react";

// Dummy data for tables
const generalInfoData = [
  { key: "1", name: "Task 1", assignee: "John Doe", status: "Open" },
  { key: "2", name: "Task 2", assignee: "Jane Smith", status: "In Progress" },
];

const ipData = [
  { key: "1", partName: "Part A", dueDate: "2024-12-01", status: "Completed" },
  {
    key: "2",
    partName: "Part B",
    dueDate: "2024-12-05",
    status: "In Progress",
  },
];

const wlData = [
  { key: "1", name: "WL 1", status: "Open" },
  { key: "2", name: "WL 2", status: "Blocked" },
];

const powerData = [
  { key: "1", system: "System A", status: "In Progress" },
  { key: "2", system: "System B", status: "Completed" },
];

const { TabPane } = Tabs;

const ExcelLikeCard = () => {
  const [activeKey, setActiveKey] = useState("1"); // Default active tab key

  // Common column configurations for tables
  const columns = [
    {
      title: "Site Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "In Progress"
              ? "blue"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  // Custom table rendering for each tab
  const getTableForTab = (tab) => {
    switch (tab) {
      case "General Info":
        return (
          <Table
            columns={columns}
            dataSource={generalInfoData}
            pagination={false}
          />
        );
      case "IP":
        return (
          <Table
            columns={[
              { title: "Part Name", dataIndex: "partName", key: "partName" },
              ...columns,
            ]}
            dataSource={ipData}
            pagination={false}
          />
        );
      case "WL":
        return (
          <Table
            columns={[
              { title: "WL Name", dataIndex: "name", key: "name" },
              ...columns,
            ]}
            dataSource={wlData}
            pagination={false}
          />
        );
      case "Power":
        return (
          <Table
            columns={[
              { title: "System Name", dataIndex: "system", key: "system" },
              ...columns,
            ]}
            dataSource={powerData}
            pagination={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card title="Project Information" style={{ width: "100%" }}>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <TabPane tab="General Info" key="1">
          {getTableForTab("General Info")}
        </TabPane>
        <TabPane tab="IP" key="2">
          {getTableForTab("IP")}
        </TabPane>
        <TabPane tab="WL" key="3">
          {getTableForTab("WL")}
        </TabPane>
        <TabPane tab="Power" key="4">
          {getTableForTab("Power")}
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ExcelLikeCard;
