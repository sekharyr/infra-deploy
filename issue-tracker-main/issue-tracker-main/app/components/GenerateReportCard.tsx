import React, { useState } from "react";
import { Card, Cascader, Table, Button, message } from "antd";

// Sample options for Project and Site selection
const projectOptions = [
  {
    value: "Project Alpha",
    label: "Project Alpha",
    children: [
      {
        value: "Site 1",
        label: "Site 1",
        reports: [
          { value: "Report A", status: "Completed" },
          { value: "Report B", status: "In Progress" },
        ],
      },
      {
        value: "Site 2",
        label: "Site 2",
        reports: [
          { value: "Report C", status: "Completed" },
          { value: "Report D", status: "In Review" },
        ],
      },
    ],
  },
  // More project data...
];

const GenerateReportCard = () => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [reports, setReports] = useState([]);

  const handleSelectionChange = (value) => {
    setSelectedValue(value);
    // Fetch reports based on selected project and site
    fetchReports(value);
  };

  const fetchReports = (value) => {
    const project = value[0]; // Selected Project
    const site = value[1]; // Selected Site

    // Find reports based on the selected project and site
    const filteredReports = projectOptions
      .filter((projectData) => projectData.value === project)
      .flatMap((projectData) =>
        projectData.children
          .filter((siteData) => siteData.value === site)
          .flatMap((siteData) => siteData.reports)
      );

    setReports(filteredReports); // Set filtered reports
  };

  const handleDownload = (reportName) => {
    // Simulate downloading the report
    message.success(`Downloading ${reportName}...`);
  };

  const columns = [
    {
      title: "Report Name",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          disabled={record.status !== "Completed"}
          onClick={() => handleDownload(record.value)}
        >
          {record.status === "Completed" ? "Download" : "N/A"}
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="Generate Report"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Cascader for selecting Project and Site */}
      <Cascader
        options={projectOptions}
        onChange={handleSelectionChange}
        placeholder="Select Project and Site"
        style={{ width: "100%", marginBottom: "16px" }}
      />

      {/* Table to display the reports with status and download option */}
      <Table
        dataSource={reports}
        columns={columns}
        pagination={false}
        rowKey="value"
        size="small"
      />
    </Card>
  );
};

export default GenerateReportCard;
