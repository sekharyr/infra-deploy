import React, { useState } from "react";
import { Card, Cascader, Select, Row, Col } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const { Option } = Select;

// Sample options for Project, Site, and Report selection
const projectOptions = [
  {
    value: "5G Network Expansion - Urban Area",
    label: "5G Network Expansion - Urban Area",
    children: [
      {
        value: "New Tech 5G Tower - CD1",
        label: "New Tech 5G Tower - CD1",
        children: [
          { value: "TSSR", label: "TSSR" },
          { value: "Hardware", label: "Hardware" },
        ],
      },
    ],
  },
  // More project data...
];

// Sample data for different pie chart views
const dataCategories = {
  Status: [
    { name: "Open", value: 10 },
    { name: "In Progress", value: 20 },
    { name: "In Review", value: 15 },
    { name: "Completed", value: 25 },
  ],
  Priority: [
    { name: "High", value: 8 },
    { name: "Medium", value: 15 },
    { name: "Low", value: 22 },
  ],
  Assignee: [
    { name: "Alice", value: 12 },
    { name: "Bob", value: 9 },
    { name: "Charlie", value: 18 },
  ],
  Reviewer: [
    { name: "David", value: 14 },
    { name: "Eva", value: 10 },
    { name: "Frank", value: 20 },
  ],
  DueDate: [
    { name: "Overdue", value: 5 },
    { name: "Due Today", value: 7 },
    { name: "Upcoming", value: 28 },
  ],
};

const COLORS = ["#FF8042", "#0088FE", "#FFBB28", "#00C49F", "#FF6347"];

const ReportSummaryCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Status");
  const [selectedValue, setSelectedValue] = useState([]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleSelectionChange = (value) => {
    setSelectedValue(value);
    // Optionally update data based on selection
  };

  return (
    <Card
      title="Task Summary"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Cascader and Select in the same row */}
      <Row gutter={16}>
        <Col span={12}>
          <Cascader
            options={projectOptions}
            onChange={handleSelectionChange}
            placeholder="Select Project, Site, and Report"
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={12}>
          <Select
            defaultValue="Status"
            onChange={handleCategoryChange}
            style={{ width: "100%" }}
          >
            <Option value="Status">Status</Option>
            <Option value="Priority">Priority</Option>
            <Option value="DueDate">Due Date</Option>
          </Select>
        </Col>
      </Row>

      {/* Pie Chart */}
      <div style={{ flex: 1, height: "250px", marginTop: "16px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataCategories[selectedCategory]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {dataCategories[selectedCategory].map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{
                padding: "10px",
                // borderLeft: "1px solid #ddd", // Optional border to separate the chart and legend
                // height: "100%",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ReportSummaryCard;
