"use client";
import React from "react";
import { Descriptions, Card, Input, Avatar, Button, Tabs } from "antd";
import type { DescriptionsProps } from "antd";
import { useState } from "react";

const TaskDetails = (props) => {
  const { task } = props;
  const [isClickedOnComment, setIsClickedOnComment] = useState(false);
  const showButton = () => {
    setIsClickedOnComment(true);
  };
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Assignee",
      children: task.assignee || "",
    },
    {
      key: "2",
      label: "Due Date",
      children: task.dueDate || "",
    },
    {
      key: "3",
      label: "Projects",
      children: task.projects || "",
    },
    {
      key: "4",
      label: "Priority",
      children: task.priority || "",
    },
  ];
  return (
    <div className="task-details">
      <div className="task-details-body">
        <Descriptions
          className="TaskDescriptions"
          title={task.taskName}
          column={1}
          items={items}
        />
        <p className="mb-5 text-xs">Description</p>
        <Card className="w-full h-32 cardLine mb-5">
          <textarea
            className="rounded-lg"
            rows="4"
            cols="90"
            placeholder="What's this task about.?"
          ></textarea>
        </Card>
        <p className="mb-5 text-xs">Attachments From Reviewer</p>
        <Card className="w-full h-32 cardLine mb-5">
          <Input type="file" />
        </Card>
        <p className="mb-5 text-xs">Attachments From Assigner</p>
        <Card className="w-full h-32 cardLine mb-5">
          <Input type="file" />
        </Card>
      </div>
      <div className="commentsSection">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Comments",
              key: "1",
              children: <div>See comments here</div>,
            },
            {
              label: "Activities",
              key: "2",
              children: <div>See activities here</div>,
            },
          ]}
        />
        <div className="h-60"></div>
      </div>
      <div className="fixed-comments-section">
        <Avatar className="basic-avatar mr-2 ml-2" size={40}>
          SD
        </Avatar>
        <Card className="h-max comment-card mb-5 mt-5">
          <textarea
            onClick={showButton}
            className="rounded-lg"
            rows="3"
            cols="90"
            placeholder="Add a comment"
          ></textarea>
          {isClickedOnComment ? (
            <Button className="float-right mt-5">Comment</Button>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default TaskDetails;
