import React, { useState } from "react";
import { Card, Segmented, Table } from "antd";

const MyApprovalsCard = () => {
  const [activeTab, setActiveTab] = useState("In Review");
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const columns = [
    {
      title: "Report Name",
      dataIndex: "reportName",
      key: "reportName",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
  ];

  // Sample approval data for each tab
  const approvalData = {
    "In Review": [
      {
        key: 1,
        reportName: "TSSR",
        assignee: "John Doe",
        site: "NewTech 5G Tower - CD1",
        project: "5G Network Expansion - Urban Area",
      },
      {
        key: 2,
        reportName: "Hardware",
        assignee: "Jane Smith",
        site: "NewTech 5G Tower - CD2",
        project: "5G Network Expansion - Urban Area",
      },
    ],
    Completed: [
      {
        key: 3,
        reportName: "TSSR",
        assignee: "Alice Johnson",
        site: "NewTech 5G Tower - CD2",
        project: "5G Network Expansion - Suburab Area",
      },
    ],
  };

  return (
    <Card
      title="My Approvals"
      style={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Segmented
        options={["In Review", "Completed"]}
        value={activeTab}
        onChange={handleTabChange}
      />
      <div style={{ overflowY: "auto", marginTop: "16px", flex: 1 }}>
        <Table
          dataSource={approvalData[activeTab]}
          columns={columns}
          pagination={false}
          size="small"
          scroll={{ y: 200 }} // Adjust scroll height as needed
        />
      </div>
    </Card>
  );
};

export default MyApprovalsCard;
