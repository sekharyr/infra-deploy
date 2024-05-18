"use client";
import React from "react";
import {
  Descriptions,
  Card,
  Input,
  Avatar,
  Tabs,
  Button,
  Dropdown,
  Space,
  Tag,
  DatePicker
} from "antd";
import type { DescriptionsProps } from "antd";
import { useState } from "react";
import FileAttachmentSection from "@/app/components/FileAttachmentSection";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import PriorityType from "@/app/constants/PriorityType";
import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';
const TaskDetails = (props) => {
  const filesFromReviewer = ["task.pdf", "overview.pdf"];
  const filesFromAssigner = ["taskDetails.pdf"];
  const itemsTask: MenuProps["items"] = [
    {
      key: "1",
      label: "Task1",
    },
    {
      key: "2",
      label: "Task2",
    },
  ];
  const { task } = props;
  console.log("task is::",task);
  const priorityKey = Object.keys(PriorityType).find(key => PriorityType[key]["STATUS"].toLowerCase() === task.priority.toLowerCase());
  const priority = priorityKey && PriorityType[priorityKey];
  console.log("Priority is::",priority)
  const [isClickedOnComment, setIsClickedOnComment] = useState(false);
  const showButton = () => {
    setIsClickedOnComment(true);
  };
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Assignee",
      children:
        (
          <p>
            <Avatar className="basic-avatar mr-2 ml-2" size={36}>
              {task.avatar}
            </Avatar>
            {task.assignee}
          </p>
        ) || "",
    },
    {
      key: "2",
      label: "Due Date",
      children: <DatePicker defaultValue={dayjs('2019-09-03', dateFormat)} onChange={onDateChange} /> || "",
    },
    {
      key: "3",
      label: "Projects",
      children: (
        <div>
          <p>{props.projectName || ""}</p>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      ),
    },
    {
      key: "4",
      label: "Priority",
      children: <Tag color={priority.COLOR || "black"}>{priority.STATUS || ""}</Tag>,
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
        <FileAttachmentSection
          showFooter={true}
          attachedFiles={filesFromReviewer}
        />
        <p className="mb-5 text-xs">Attachments From Assigner</p>
        <FileAttachmentSection
          showFooter={true}
          attachedFiles={filesFromAssigner}
        />
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
