import React, { useState } from "react";
import { Card, Segmented, Table } from "antd";

const MyTasksCard = () => {
  const [activeTab, setActiveTab] = useState("Open");
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
  const taskData = {
    Open: [
      { key: 1, taskName: "Task A", site: "Site 1", project: "Project Alpha" },
      { key: 2, taskName: "Task B", site: "Site 2", project: "Project Beta" },
      { key: 3, taskName: "Task A", site: "Site 1", project: "Project Alpha" },
      { key: 4, taskName: "Task B", site: "Site 2", project: "Project Beta" },
      { key: 5, taskName: "Task A", site: "Site 1", project: "Project Alpha" },
      { key: 6, taskName: "Task B", site: "Site 2", project: "Project Beta" },
      { key: 7, taskName: "Task A", site: "Site 1", project: "Project Alpha" },
      { key: 8, taskName: "Task B", site: "Site 2", project: "Project Beta" },
    ],
    "In Progress": [
      { key: 3, taskName: "Task C", site: "Site 3", project: "Project Gamma" },
    ],
    "In Review": [
      { key: 4, taskName: "Task D", site: "Site 4", project: "Project Delta" },
    ],
    Completed: [
      {
        key: 5,
        taskName: "Task E",
        site: "Site 5",
        project: "Project Epsilon",
      },
    ],
  };

  return (
    <Card
      title="My Tasks"
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
          dataSource={taskData[activeTab]}
          columns={columns}
          pagination={false}
          size="small"
          scroll={{ y: 200 }} // Adjust scroll height as needed
        />
      </div>
    </Card>
  );
};

export default MyTasksCard;
