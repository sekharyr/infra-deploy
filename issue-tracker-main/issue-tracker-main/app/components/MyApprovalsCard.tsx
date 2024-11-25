import React, { useState } from "react";
import { Card, Segmented, Table } from "antd";

const MyApprovalsCard = () => {
  const [activeTab, setActiveTab] = useState("In Review");
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
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
        taskName: "Approval Task 1",
        assignee: "John Doe",
        site: "Site X",
        project: "Project 1",
      },
      {
        key: 2,
        taskName: "Approval Task 2",
        assignee: "Jane Smith",
        site: "Site Y",
        project: "Project 2",
      },
    ],
    Completed: [
      {
        key: 3,
        taskName: "Approval Task 3",
        assignee: "Alice Johnson",
        site: "Site Z",
        project: "Project 3",
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
