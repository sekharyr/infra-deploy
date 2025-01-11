import React, { useState } from "react";
import { Card, Segmented, Table } from "antd";

const MyReportsCard = () => {
  const [activeTab, setActiveTab] = useState("Open");
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

  // Sample task data for each tab
  const reportData = {
    Open: [
      {
        key: 1,
        reportName: "TSSR",
        site: "NewTech 5G Tower - CD1",
        project: "5G Network Expansion - Urban Area",
      },
      {
        key: 2,
        reportName: "Hardware",
        site: "NewTech 5G Tower - CD2",
        project: "5G Network Expansion - Rural Area",
      },
      {
        key: 3,
        reportName: "Hardware",
        site: "NewTech 5G Tower - CD3",
        project: "5G Network Expansion - Urban Area",
      },
      {
        key: 4,
        reportName: "TSSR",
        site: "NewTech 5G Tower - CD4",
        project: "5G Network Expansion - Rural Area",
      },
      {
        key: 5,
        reportName: "Hardware",
        site: "NewTech 5G Tower - CD5",
        project: "5G Network Expansion - Urban Area",
      },
    ],
    "In Progress": [
      {
        key: 3,
        reportName: "TSSR",
        site: "NewTech 5G Tower - CD4",
        project: "5G Network Expansion - Urban Area",
      },
    ],
    "In Review": [
      {
        key: 4,
        reportName: "Hardware",
        site: "NewTech 5G Tower - CD1",
        project: "5G Network Expansion - Suburb Area",
      },
    ],
    Completed: [
      {
        key: 5,
        reportName: "TSSR",
        site: "NewTech 5G Tower - CD1",
        project: "5G Network Expansion - Central Area",
      },
    ],
  };

  return (
    <Card
      title="My Reports"
      style={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Segmented
        options={["Open", "In Progress", "In Review", "Completed"]}
        value={activeTab}
        onChange={handleTabChange}
      />
      <div style={{ overflowY: "auto", marginTop: "16px", flex: 1 }}>
        <Table
          dataSource={reportData[activeTab]}
          columns={columns}
          pagination={false}
          size="small"
          scroll={{ y: 200 }} // Adjust scroll height as needed
        />
      </div>
    </Card>
  );
};

export default MyReportsCard;
