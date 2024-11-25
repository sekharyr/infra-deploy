"use client";
import React, { useState } from "react";
import {
  Card,
  Steps,
  Button,
  Space,
  message,
  Collapse,
  Input,
  Avatar,
  Divider,
  Form,
  Row,
  Col,
  Select,
  Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Step } = Steps;
const { Panel } = Collapse;
const { TextArea } = Input;

const ReviewCard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [approver1, setApprover1] = useState({
    name: "",
    status: "Pending",
    comments: "",
  });
  const [approver2, setApprover2] = useState({
    name: "",
    status: "Pending",
    comments: "",
  });
  const [activityLog, setActivityLog] = useState([]);

  const steps = [
    { title: "Open", description: "Start the review process" },
    { title: "Reviewer1", description: "Review by the first reviewer" },
    { title: "Reviewer2", description: "Review by the second reviewer" },
    { title: "Closed", description: "Review process completed" },
  ];

  const next = () => {
    if (currentStep === steps.length - 1) return;
    setCurrentStep(currentStep + 1);
    setActivityLog([
      ...activityLog,
      `Moved to ${steps[currentStep + 1].title}`,
    ]);
  };

  const prev = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
    setActivityLog([
      ...activityLog,
      `Moved back to ${steps[currentStep - 1].title}`,
    ]);
  };

  const handleFinish = () => {
    message.success("TSSR review finalized successfully!");
    setActivityLog([...activityLog, "Review finalized"]);
  };

  const renderApproverSection = (approver, setApprover, approverTitle) => (
    <Card bordered={false} style={{ marginBottom: "16px" }}>
      <div style={{ marginBottom: "16px" }}>
        {/* <h4>{approverTitle} Details</h4> */}

        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <div>
            <label>Name</label>
            {/* <Avatar size="small">
              {approver.name
                ? approver.name.charAt(0)
                : approverTitle.charAt(0)}
            </Avatar> */}
            <div>
              <Input
                placeholder={`${approverTitle} Name`}
                value={approver.name}
                onChange={(e) =>
                  setApprover({ ...approver, name: e.target.value })
                }
                // style={{ width: "300px", marginLeft: "10px" }}
              />
            </div>
          </div>

          <div style={{ width: "150px", marginLeft: "16px" }}>
            <label>Status</label>
            <Select
              value={approver.status}
              onChange={(value) => setApprover({ ...approver, status: value })}
              style={{ width: "100%" }}
            >
              <Option value="Pending">Pending</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </div>

          {/* <div
            style={{ width: "120px", marginLeft: "16px", textAlign: "center" }}
          >
            <label>Status Tag</label>
            <Tag
              color={
                approver.status === "Completed"
                  ? "green"
                  : approver.status === "In Progress"
                  ? "blue"
                  : "orange"
              }
            >
              {approver.status}
            </Tag>
          </div> */}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Comments
          </label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <TextArea
              rows={3}
              placeholder="Add comments"
              value={approver.comments}
              onChange={(e) =>
                setApprover({ ...approver, comments: e.target.value })
              }
              style={{ width: "50%" }}
            />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <Collapse defaultActiveKey={["1"]} style={{ marginBottom: "16px" }}>
      <Panel header="TSSR Review Process" key="1">
        {/* Steps and Actions */}
        <Card bordered={false}>
          <Steps current={currentStep} style={{ marginBottom: "24px" }}>
            {steps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.description}
              />
            ))}
          </Steps>

          {/* Display Approver1 Section on Reviewer1 Step */}
          {currentStep === 1 && (
            <>
              {/* <Divider>Approver 1</Divider> */}
              {renderApproverSection(approver1, setApprover1, "Approver 1")}
            </>
          )}

          {/* Display Approver2 Section on Reviewer2 Step */}
          {currentStep === 2 && (
            <>
              {/* <Divider>Approver 2</Divider> */}
              {renderApproverSection(approver2, setApprover2, "Approver 2")}
            </>
          )}

          {/* Activity Log */}
          {/* <div style={{ marginBottom: "16px" }}>
            <h4>Activity Log</h4>
            {activityLog.length > 0 ? (
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                {activityLog.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            ) : (
              <p>No activities logged yet.</p>
            )}
          </div> */}

          {/* Navigation Buttons */}
          <Space>
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {currentStep > 0 && <Button onClick={prev}>Previous</Button>}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleFinish}>
                Finish Review
              </Button>
            )}
          </Space>
        </Card>
      </Panel>
    </Collapse>
  );
};

export default ReviewCard;
