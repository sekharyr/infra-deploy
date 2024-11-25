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
  DatePicker,
} from "antd";
import "../../css/ProjectPage.css";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import SliderWindow from "@/app/components/SliderWindow";
import { useState, useEffect } from "react";
import TaskDetails from "./TaskDetails";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

const TaskTable = (props) => {
  const value = props.value;
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState({});
  const [collapsedItems, setCollapsedItems] = useState([]);
  const taskList = Object.keys(value);

  const onClickDetailsSlide = (task) => {
    setIsPaneOpen(!isPaneOpen);
    setClickedTask(task);
  };
  const closeDetailsSlide = () => {
    setIsPaneOpen(!isPaneOpen);
    setClickedTask({});
  };

  const onDelete = (key) => {
    setCollapsedItems(collapsedItems.filter((item) => item.key !== key));
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onAddTask = (key) => {
    const sectionIndex = collapsedItems.findIndex((item) => item.key === key);
    if (sectionIndex === -1) return;

    const newTask = (
      <div className="task-row">
        <div className="tableSpace">
          <p style={{ width: "30%", display: "flex", alignItems: "center" }}>
            <CheckCircleOutlined style={{ marginRight: "8px" }} />
            <Input defaultValue={"Enter a task name"} />
            <span onClick={() => onClickDetailsSlide({})}>
              <RightOutlined />
            </span>
          </p>
          <Divider type="vertical" style={{ borderWidth: "1px" }} />
          <Tooltip placement="bottom" title={"Assignee Name"}>
            <p style={{ width: "15%" }}>
              <Input defaultValue={"Assignee Name"} spellCheck="false" />
            </p>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="bottom" title={"Reviewer Name"}>
            <p style={{ width: "15%" }}>
              <Input defaultValue={"Reviewer Name"} spellCheck="false" />
            </p>
          </Tooltip>
          <Divider type="vertical" />
          <DatePicker onChange={onDateChange} />
          <Divider type="vertical" />
          <p style={{ width: "10%" }}>
            <CustomDropdown
              defaultValue={"open"}
              constName="status"
              onSelect={(val) => console.log("Status selected:", val)}
            />
          </p>
          <Divider type="vertical" />
          <p style={{ width: "10%" }}>
            <Tag color={"#D1A500"}>Low</Tag>
          </p>
        </div>
        <Divider style={{ borderWidth: "1px" }} />
      </div>
    );

    collapsedItems[sectionIndex].children.splice(
      collapsedItems[sectionIndex].children.length - 1,
      0,
      newTask
    );
    setCollapsedItems([...collapsedItems]);
  };

  const addSection = () => {
    const newSection = {
      key: String(collapsedItems.length + 1),
      label: (
        <div className="collapseHead">
          <Input defaultValue={"Enter a section name..."} />
          <DeleteOutlined />
        </div>
      ),
      children: [
        <div className="task-row">
          <div className="tableSpace">
            <p style={{ width: "30%", display: "flex", alignItems: "center" }}>
              <CheckCircleOutlined style={{ marginRight: "8px" }} />
              <Input defaultValue={"Enter a task name"} />
              <span onClick={() => onClickDetailsSlide({})}>
                <RightOutlined />
              </span>
            </p>
            <Divider type="vertical" style={{ borderWidth: "1px" }} />
            <Tooltip placement="bottom" title={"Assignee Name"}>
              <p style={{ width: "15%" }}>
                <Input defaultValue={"Assignee Name"} spellCheck="false" />
              </p>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="bottom" title={"Reviewer Name"}>
              <p style={{ width: "15%" }}>
                <Input defaultValue={"Reviewer Name"} spellCheck="false" />
              </p>
            </Tooltip>
            <Divider type="vertical" />
            <DatePicker onChange={onDateChange} />
            <Divider type="vertical" />
            <p style={{ width: "10%" }}>
              <CustomDropdown
                defaultValue={"open"}
                constName="status"
                onSelect={(val) => console.log("Status selected:", val)}
              />
            </p>
            <Divider type="vertical" />
            <p style={{ width: "10%" }}>
              <Tag color={"#D1A500"}>Low</Tag>
            </p>
          </div>
          <Divider style={{ borderWidth: "1px" }} />
        </div>,
        <p
          className="ml-11 mt-2 cursor-pointer"
          onClick={() => onAddTask(newSection.key)}
        >
          Add Task...
        </p>,
      ],
    };
    setCollapsedItems([...collapsedItems, newSection]);
  };

  useEffect(() => {
    // Initialize collapsedItems with existing task data
    const newItems = taskList.map((task, index) => ({
      key: String(index),
      label: (
        <div className="collapseHead">
          <Input defaultValue={task} />
          <DeleteOutlined onClick={() => onDelete(String(index))} />
        </div>
      ),
      children: value[task].map((item, idx) => (
        <div className="task-row" key={idx}>
          <div className="tableSpace">
            <p style={{ width: "30%", display: "flex", alignItems: "center" }}>
              <CheckCircleOutlined style={{ marginRight: "8px" }} />
              <Input defaultValue={item.taskName} />
              <span onClick={() => onClickDetailsSlide(item)}>
                <RightOutlined />
              </span>
            </p>
            <Divider type="vertical" style={{ borderWidth: "1px" }} />
            <Tooltip placement="bottom" title={item.assignee}>
              <p style={{ width: "15%" }}>
                <Input defaultValue={item.assignee} spellCheck="false" />
              </p>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="bottom" title={item.reviewer}>
              <p style={{ width: "15%" }}>
                <Input defaultValue={item.reviewer} spellCheck="false" />
              </p>
            </Tooltip>
            <Divider type="vertical" />
            <DatePicker
              defaultValue={dayjs(item.dueDate, dateFormat)}
              onChange={onDateChange}
            />
            <Divider type="vertical" />
            <p style={{ width: "10%" }}>
              <CustomDropdown
                defaultValue={item.status}
                constName="status"
                onSelect={(val) => console.log("Status selected:", val)}
              />
            </p>
            <Divider type="vertical" />
            <p style={{ width: "10%" }}>
              <Tag color={item.color}>{item.priority}</Tag>
            </p>
          </div>
          <Divider style={{ borderWidth: "1px" }} />
        </div>
      )),
    }));
    setCollapsedItems(newItems);
  }, [value]);

  return (
    <div>
      <div>TEST</div>
      <Collapse
        items={collapsedItems}
        defaultActiveKey={taskList.map((_, i) => String(i))}
      />
      {isPaneOpen && (
        <SliderWindow
          content={<TaskDetails task={clickedTask} projectName={props.name} />}
          isPaneOpen={isPaneOpen}
          closeDetailsSlide={closeDetailsSlide}
        />
      )}
      <div className="add-section">
        <PlusOutlined className="mr-2" />
        <p className="cursor-pointer" onClick={addSection}>
          Add Section
        </p>
      </div>
    </div>
  );
};

export default TaskTable;
