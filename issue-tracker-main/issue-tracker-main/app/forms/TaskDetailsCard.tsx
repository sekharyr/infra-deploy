import React, { useState } from "react";
import { Card, Row, Col, Avatar, DatePicker, Select, Tag, Input } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const TaskDetailsCard = ({
  task,
  onDateChange,
  handleCategoryChange,
  //   handlePriorityChange,
  //   handleStatusChange,
}) => {
  const [assignee, setAssignee] = useState(task.assignee);
  const [reviewer, setReviewer] = useState(task.reviewer);
  const [dueDate, setDueDate] = useState(dayjs(task.dueDate));
  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  return (
    <Card className="task-details-card scrollable">
      <Row gutter={16}>
        <Col span={12}>
          <Row align="middle">
            <Col span={4}>
              <strong>Assignee:</strong>
            </Col>
            <Col span={16}>
              <div
                className="assignee-info"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar size="small" style={{ backgroundColor: "#375252" }}>
                  {assignee.slice(0, 1).toUpperCase()}
                </Avatar>
                <Input
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  style={{ marginLeft: 4 }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row align="middle">
            <Col span={4}>
              <strong>Reviewer:</strong>
            </Col>
            <Col span={16}>
              <div
                className="reviewer-info"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar size="small" style={{ backgroundColor: "#375252" }}>
                  {reviewer.slice(0, 1).toUpperCase()}
                </Avatar>
                <Input
                  value={reviewer}
                  onChange={(e) => setReviewer(e.target.value)}
                  style={{ marginLeft: 4 }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row align="middle">
            <Col span={4}>
              <strong>Due Date:</strong>
            </Col>
            <Col span={16}>
              <DatePicker
                value={dueDate}
                onChange={(date) => {
                  setDueDate(date);
                  onDateChange(date); // Call the external date change handler
                }}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row align="middle">
            <Col span={4}>
              <strong>Category:</strong>
            </Col>
            <Col span={16}>
              <Select
                placeholder="Select category"
                style={{ width: "100%" }}
                value={category}
                onChange={(value) => {
                  setCategory(value);
                  handleCategoryChange(value); // Call the external category change handler
                }}
              >
                <Option value="ip_existing_equipment">
                  IP Existing Equipment
                </Option>
                <Option value="ip_new_equipment">IP New Equipment</Option>
                <Option value="wl_propose_information">
                  WL Propose Information
                </Option>
                <Option value="wl_auxiliary_materials">
                  WL Auxiliary Materials
                </Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row align="middle">
            <Col span={4}>
              <strong>Priority:</strong>
            </Col>
            <Col span={16}>
              <Select
                placeholder="Select priority"
                style={{ width: "100%" }}
                value={priority}
                onChange={(value) => {
                  setPriority(value);
                  handlePriorityChange(value); // Call the external priority change handler
                }}
              >
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row align="middle">
            <Col span={4}>
              <strong>Status:</strong>
            </Col>
            <Col span={16}>
              <Select
                placeholder="Select status"
                style={{ width: "100%" }}
                value={status}
                onChange={(value) => {
                  setStatus(value);
                  handleStatusChange(value); // Call the external status change handler
                }}
              >
                <Option value="open">Open</Option>
                <Option value="in-progress">In Progress</Option>
                <Option value="completed">Completed</Option>
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default TaskDetailsCard;
