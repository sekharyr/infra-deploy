"use client";
import { Collapse, Divider, Space, Table, Tag } from "antd";
import "../../css/ProjectPage.css";
import { CheckCircleOutlined, RightOutlined } from "@ant-design/icons";
import SliderWindow from "@/app/components/SliderWindow";
import { useState } from "react";
import TaskDetails from "./TaskDetails";

const TaskTable = (props) => {
  const value = props.value;
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState({});
  let openSlide = false;
  const taskList = Object.keys(value);
  const items = [];
  let keyList = [];
  const onClickDetailsSlide = (task) => {
    setIsPaneOpen(!isPaneOpen);
    setClickedTask(task);
  };
  const closeDetailsSlide = () => {
    setIsPaneOpen(!isPaneOpen);
    setClickedTask({});
  };
  for (let i = 0; i < taskList.length; i++) {
    let valList = value[taskList[i]];
    let tempList = [];
    console.log("valList is::", valList);
    for (let j = 0; j < valList.length; j++) {
      tempList.push(
        <div className="tableSpace">
          <p style={{ width: "40%" }}>
            <CheckCircleOutlined style={{ marginRight: "2px" }} />
            {valList[j].taskName}
            <span
              onClick={(e) => {
                return onClickDetailsSlide(valList[j]);
              }}
            >
              <RightOutlined />
            </span>
          </p>
          <Divider type="vertical" style={{ borderWidth: "3px" }}></Divider>
          <p style={{ width: "10%" }}>{valList[j].assignee}</p>
          <Divider type="vertical"></Divider>
          <p style={{ width: "10%" }}>{valList[j].dueDate}</p>
          <Divider type="vertical"></Divider>
          <p style={{ width: "10%" }}>
            <Tag color="red">{valList[j].priority}</Tag>
          </p>
          <Divider type="vertical"></Divider>
        </div>
      );
    }
    keyList.push("" + i);
    items.push({
      key: "" + i,
      label: taskList[i],
      children: tempList,
    });
    console.log(items);
  }
  return (
    <div>
      <Collapse items={items} defaultActiveKey={keyList} />
      {isPaneOpen ? (
        <SliderWindow
          content={<TaskDetails task={clickedTask} />}
          isPaneOpen={isPaneOpen}
          closeDetailsSlide={closeDetailsSlide}
        />
      ) : null}
    </div>
  );
};

export default TaskTable;
