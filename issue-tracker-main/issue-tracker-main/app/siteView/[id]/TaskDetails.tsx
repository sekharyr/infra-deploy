import React, { useState } from "react";
import { Card, Input, Avatar, Tabs, Button, Select } from "antd";
import FileAttachmentSection from "@/app/components/FileAttachmentSection";
import { CheckCircleOutlined } from "@ant-design/icons";
import PriorityType from "@/app/constants/PriorityType";
import IPPartSurvey from "@/app/forms/IPPartSurvey";
import TaskDetailsCard from "@/app/forms/TaskDetailsCard";
import AttachmentCard from "@/app/components/AttachmentCard";
import AuxMaterials from "@/app/forms/AuxMaterials";

const TaskDetails = ({ task, projectName }) => {
  const filesFromReviewer = ["task.pdf", "overview.pdf"];
  const filesFromAssigner = ["taskDetails.pdf"];
  const priorityKey = Object.keys(PriorityType).find(
    (key) =>
      PriorityType[key]["STATUS"].toLowerCase() === task.priority.toLowerCase()
  );
  const priority = priorityKey && PriorityType[priorityKey];
  const [isClickedOnComment, setIsClickedOnComment] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [comments, setComments] = useState([]); // To store comments

  const handleCategoryChange = (value) => setSelectedCategory(value);

  const handleAddComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const renderForm = () => {
    switch (selectedCategory) {
      case "ip_existing_equipment":
      case "ip_new_equipment":
        return <IPPartSurvey />;
      case "wl_propose_information":
      case "wl_auxiliary_materials":
        return <AuxMaterials />;
      default:
        return null;
    }
  };

  const items = [
    {
      key: "1",
      label: "Details",
      children: (
        <div>
          {/* Task Details */}
          <TaskDetailsCard
            task={task}
            onDateChange={(date, dateString) => console.log(date, dateString)}
            handleCategoryChange={handleCategoryChange}
          />
          <Card className="description-card scrollable">
            <Input.TextArea
              rows={4}
              placeholder="What's this task about?"
              defaultValue={task.description}
            />
          </Card>

          {/* Comments & Activities Tabs */}
          <Card className="comments-tabs-card scrollable">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Comments" key="1">
                {/* Display all comments */}
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index}>{comment}</div>
                  ))
                ) : (
                  <div>No comments yet</div>
                )}
                <Card className="comment-input-card">
                  <Input.TextArea
                    rows={3}
                    placeholder="Add a comment"
                    onClick={() => setIsClickedOnComment(true)}
                  />
                  {isClickedOnComment && (
                    <Button
                      type="primary"
                      onClick={() => {
                        handleAddComment("New Comment");
                        setIsClickedOnComment(false); // Reset the input
                      }}
                    >
                      Comment
                    </Button>
                  )}
                </Card>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activities" key="2">
                <div>See activities here</div>
                {/* You can replace this with dynamic content */}
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </div>
      ),
    },
    {
      key: "2",
      label: "Work",
      children: (
        <div>
          {/* Render the dynamic form in the Work tab */}
          <Card className="form-card scrollable">{renderForm()}</Card>
          {/* Attachments in Work tab */}
          <AttachmentCard />
        </div>
      ),
    },
  ];

  return (
    <div className="task-details">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default TaskDetails;
