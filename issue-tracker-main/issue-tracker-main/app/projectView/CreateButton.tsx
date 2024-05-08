"use client";
import { Button, Dropdown, Input, Modal } from "antd";
import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "../css/ProjectView.css";
import NewCirleOutlined from "../icons/NewCircleOutlined";
import { Dialog, SelectItem } from "@radix-ui/themes";
import { useState } from "react";
import projectOverviewDetails from "../constants/TempPayloadsFolder/projectOverviewDetails";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import CustomDropdown from "../components/CustomDropdown";
import type { MenuProps } from 'antd';

const CreateButton = () => {
  const [projectNames, setProjectNames] = useState(
    projectOverviewDetails.projectNames.slice(0, 5)
  );
  const [inputData, setInputData] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [currentDropdownValue, setCurrentDropdownValue] = useState("Main")

  const onInputChange = (e) => {
    setInputData(e.target.value);
  };

  const onAddProject = (e) => {
    projectNames.splice(0, 0, inputData);
    /*if (filterValue == "Recents") {
          setProjectNames(projectNames.slice(0, 5));
        } else {
          setProjectNames(projectNames);
        }*/
    setProjectNames(projectNames);
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
    setShowAddProject(false);
  };

  const showProjectModal = () => {
    setOpen(true);
    setShowAddProject(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const items =[
    {
      key: "2",
      label: (
        <>
          <div className="cardLine cursor-pointer" onClick={showProjectModal}>
            <CheckCircleOutlined />
            <p className="text-sm p-2 font-medium">Project</p>
          </div>
        </>
      ),
    },
    {
      key: "1",
      label: (
        <div className="cardLine cursor-pointer" onClick={showModal}>
          <ProfileOutlined />
          <p className="text-sm p-2 font-medium">Task</p>
        </div>
      ),
    },
  ];
  const contributors: MenuProps['items']  = [
    {
      key: "1",
      label: "Satyabrata Dash",
    },
    {
      key: "2",
      label: "Mahesh Gowda",
    },
  ];
  const project_Names: MenuProps['items']  = [
    {
      key: "1",
      label: "Demo Project1",
    },
    {
      key: "2",
      label: "Demo Project2",
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button className="OmnibuttonButtonCard">
          <span style={{ color: "red", marginRight: "2px" }}>
            <NewCirleOutlined />
          </span>
          <span className="typo">Create</span>
        </Button>
      </Dropdown>
      <Modal
        open={open}
        title={showAddProject ? "Add Project" : "Add Task"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onAddProject}
          >
            Submit
          </Button>,
        ]}
      >
        {showAddProject ? (
          <>
            <p>Invite with email or by name</p>
            <div className="inviteModal mb-4">
              <Input
                placeholder="Add project by name.."
                onInput={onInputChange}
                style={{ width: "95%" }}
              />
            </div>
          </>
        ) : (
          <div>
            <Input className="mb-5" />
            {/*<Select.Root>
              <Select.Trigger className="SelectTrigger" aria-label="Food">
                <Select.Value placeholder="Select a fruit…" />
                <Select.Icon className="SelectIcon">
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="SelectContent">
                  <Select.ScrollUpButton className="SelectScrollButton">
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="SelectViewport">
                    <Select.Group>
                      <Select.Label className="SelectLabel">
                        Fruits
                      </Select.Label>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="SelectScrollButton">
                    <ChevronDownIcon />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
        </Select.Root>*/}
        <div className="dropdownGroup mb-5">
        <select name="cars" id="cars">
        <option value="volvo">Contributor Name</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <select name="cars" id="cars">
          <option value="volvo">Project Name</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
    </div>
    {/*<Dropdown menu={{ contributors }} placement="bottomLeft">
        <Button>bottomLeft</Button>
</Dropdown>*/}
            <textarea
              className="border rounded-lg mb-5"
              rows="7"
              cols="70"
              placeholder="Description"
        ></textarea>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CreateButton;
