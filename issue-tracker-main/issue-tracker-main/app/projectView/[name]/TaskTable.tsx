"use client";
import {
  Collapse,
  Divider,
  Space,
  Tooltip,
  Tag,
  Input,
  Dropdown,
  MenuProps,
} from "antd";
import "../../css/ProjectPage.css";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import SliderWindow from "@/app/components/SliderWindow";
import { useState } from "react";
import TaskDetails from "./TaskDetails";
import DragAndDropIcon from "../../components/DragAndDropIcon";
import CustomDropdown from "@/app/components/CustomDropdown";

const TaskTable = (props) => {
  const value = props.value;
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState({});
  let openSlide = false;
  const taskList = Object.keys(value);
  const items2 = [];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Tag color="#D1A500">Low</Tag>,
    },
    {
      key: "2",
      label: <Tag color="#cc5500">Medium</Tag>,
    },
    {
      key: "3",
      label: <Tag color="#c04000">High</Tag>,
    },
  ];
  let keyList = [];
  const onClickDetailsSlide = (task) => {
    setIsPaneOpen(!isPaneOpen);
    setClickedTask(task);
  };
  const closeDetailsSlide = () => {
    setIsPaneOpen(!isPaneOpen);
    setClickedTask({});
  };

  const addSection = () => {}
  for (let i = 0; i < taskList.length; i++) {
    let valList = value[taskList[i]];
    let tempList = [];
    console.log("valList is::", valList);
    for (let j = 0; j < valList.length; j++) {
      tempList.push(
        <div>
          <div className="tableSpace">
            <p style={{ width: "40%", display: "flex", alignItems: "center" }}>
              {/*<DragAndDropIcon/>*/}
              <CheckCircleOutlined style={{ marginRight: "2px" }} />
              <Input defaultValue={valList[j].taskName} />
              <span
                onClick={(e) => {
                  return onClickDetailsSlide(valList[j]);
                }}
              >
                <RightOutlined />
              </span>
            </p>
            <Divider type="vertical" style={{ borderWidth: "1px" }}></Divider>
            <Tooltip placement="bottom" title={valList[j].assignee}>
              <p style={{ width: "10%" }}>
                <Input defaultValue={valList[j].assignee} spellCheck="false" />
              </p>
            </Tooltip>

            <Divider type="vertical"></Divider>
            <p style={{ width: "10%" }}>{valList[j].dueDate}</p>
            <Divider type="vertical"></Divider>
            <p style={{ width: "10%" }}>
              <CustomDropdown
                defaultValue={valList[j].status}
                constName="status"
                onSelect={(val) => {
                  console.log("val is::", val);
                }}
              />
            </p>
            <Divider type="vertical"></Divider>
            <p style={{ width: "10%" }}>
              <Tag color={valList[j].color}>{valList[j].priority}</Tag>
            </p>
            <Divider type="vertical"></Divider>
          </div>
          <Divider style={{ borderWidth: "1px" }}></Divider>
        </div>
      );
    }
    tempList.push(<p className="ml-11 mt-2 cursor-pointer">Add Task...</p>);
    keyList.push("" + i);
    items2.push({
      key: "" + i,
      label: <div className="collapseHead"><Input defaultValue={taskList[i]} /><DeleteOutlined /></div>,
      children: tempList,
    });
    console.log(items2);
  }
  return (
    <div>
      <Collapse items={items2} defaultActiveKey={keyList} />
      {isPaneOpen ? (
        <SliderWindow
          content={<TaskDetails task={clickedTask} projectName={props.name} />}
          isPaneOpen={isPaneOpen}
          closeDetailsSlide={closeDetailsSlide}
        />
      ) : null}
      <div className="add-section">
        <PlusOutlined className="mr-2" />
        <p className="cursor-pointer" onClick={addSection}>Add Section</p>
      </div>
    </div>
  );
};

export default TaskTable;
