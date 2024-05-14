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
import { useState, useEffect } from "react";
import TaskDetails from "./TaskDetails";
import DragAndDropIcon from "../../components/DragAndDropIcon";
import CustomDropdown from "@/app/components/CustomDropdown";

const TaskTable = (props) => {
  const value = props.value;
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState({});
  const [collapsedItems, setCollapsedItems] = useState([]);
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

  const onDelete = (key: string) => {
    const temp = []
    console.log("collapsed items is::",collapsedItems);
    console.log("key is::",key);
    for(let i=0;i<collapsedItems.length;i++){
        if(collapsedItems[i]["key"] != key){
            temp.push(collapsedItems[i])
        }
    }
    console.log("temp is::",temp);
    setCollapsedItems([...temp]);
  }

  const onAddTask = (key:string) => {
    console.log("key is::",key);
    let temp = []
    let index = 0
    console.log("collapsedItems is::",collapsedItems);
    for(let i=0;i<collapsedItems.length;i++){
        console.log("item is:::",collapsedItems[i])
        if(collapsedItems[i]["key"] == key){
            console.log("item is::",collapsedItems[i]);
            temp = collapsedItems[i]["children"]
            index = i
        }
    }
    console.log("temp 2 is::",temp);
    let addIndex = temp.length - 1;
    temp.splice(addIndex,0,<div>
        <div className="tableSpace">
        <p
            style={{ width: "40%", display: "flex", alignItems: "center" }}
          >
            {/*<DragAndDropIcon/>*/}
            <CheckCircleOutlined style={{ marginRight: "2px" }} />
            <Input defaultValue={"Enter a task name"} />
            <span
              onClick={(e) => {
                return onClickDetailsSlide({});
              }}
            >
              <RightOutlined />
            </span>
          </p>
          <Divider type="vertical" style={{ borderWidth: "1px" }}></Divider>
          <Tooltip placement="bottom" title={"Satyabrata Dash"}>
            <p style={{ width: "10%" }}>
              <Input
                defaultValue={"Satyabrata Dash"}
                spellCheck="false"
              />
            </p>
          </Tooltip>

          <Divider type="vertical"></Divider>
          <p style={{ width: "10%" }}>{"12/04/24"}</p>
          <Divider type="vertical"></Divider>
          <p style={{ width: "10%" }}>
            <CustomDropdown
              defaultValue={"open"}
              constName="status"
              onSelect={(val) => {
                console.log("val is::", val);
              }}
            />
          </p>
          <Divider type="vertical"></Divider>
          <p style={{ width: "10%" }}>
            <Tag color={"#D1A500"}>{"Low"}</Tag>
          </p>
          <Divider type="vertical"></Divider>
        </div>
        <Divider style={{ borderWidth: "1px" }}></Divider>
    </div>)
    console.log("temp is::",temp);
    collapsedItems[index]["children"] = temp;
    setCollapsedItems([...collapsedItems]);
  }

  const addSection = () => {
    const temp = {
        key: collapsedItems.length+1+"",
        label: (
          <div className="collapseHead">
            <Input defaultValue={"Enter a section name.."} />
            <DeleteOutlined />
          </div>
        ),
        children: ([<div>
            <div className="tableSpace">
            <p
                style={{ width: "40%", display: "flex", alignItems: "center" }}
              >
                {/*<DragAndDropIcon/>*/}
                <CheckCircleOutlined style={{ marginRight: "2px" }} />
                <Input defaultValue={"Enter a task name"} />
                <span
                  onClick={(e) => {
                    return onClickDetailsSlide({});
                  }}
                >
                  <RightOutlined />
                </span>
              </p>
              <Divider type="vertical" style={{ borderWidth: "1px" }}></Divider>
              <Tooltip placement="bottom" title={"Satyabrata Dash"}>
                <p style={{ width: "10%" }}>
                  <Input
                    defaultValue={"Satyabrata Dash"}
                    spellCheck="false"
                  />
                </p>
              </Tooltip>

              <Divider type="vertical"></Divider>
              <p style={{ width: "10%" }}>{"12/04/24"}</p>
              <Divider type="vertical"></Divider>
              <p style={{ width: "10%" }}>
                <CustomDropdown
                  defaultValue={"open"}
                  constName="status"
                  onSelect={(val) => {
                    console.log("val is::", val);
                  }}
                />
              </p>
              <Divider type="vertical"></Divider>
              <p style={{ width: "10%" }}>
                <Tag color={"#D1A500"}>{"Low"}</Tag>
              </p>
              <Divider type="vertical"></Divider>
            </div>
            <Divider style={{ borderWidth: "1px" }}></Divider>
        </div>,<p className="ml-11 mt-2 cursor-pointer">Add Task...</p>]),
      }
      collapsedItems.push(temp);
      console.log(collapsedItems);
      setCollapsedItems([...collapsedItems]);
  };

  useEffect(() => {
    for (let i = 0; i < taskList.length; i++) {
      let valList = value[taskList[i]];
      let tempList = [];
      console.log("valList is::", valList);
      for (let j = 0; j < valList.length; j++) {
        tempList.push(
          <div>
            <div className="tableSpace">
              <p
                style={{ width: "40%", display: "flex", alignItems: "center" }}
              >
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
                  <Input
                    defaultValue={valList[j].assignee}
                    spellCheck="false"
                  />
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
        label: (
          <div className="collapseHead">
            <Input defaultValue={taskList[i]} />
            <DeleteOutlined onClick={()=>{console.log("collapsed items is::",collapsedItems);onDelete(""+i)}}/>
          </div>
        ),
        children: tempList,
      });
      console.log("items2 is::",items2);
      setCollapsedItems([...items2]);
      console.log("collapsed items is::",collapsedItems);
    }
  },[]);

  console.log("collapsed itemsv2 is::",collapsedItems);
  return (
    <div>
      <Collapse items={collapsedItems} defaultActiveKey={keyList} />
      {isPaneOpen ? (
        <SliderWindow
          content={<TaskDetails task={clickedTask} projectName={props.name} />}
          isPaneOpen={isPaneOpen}
          closeDetailsSlide={closeDetailsSlide}
        />
      ) : null}
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
