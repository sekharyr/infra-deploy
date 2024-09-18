"use client";
import { Button, Dropdown, Input, Modal, message } from "antd";
import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
  PartitionOutlined,
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
import type { MenuProps } from "antd";
import axios from "axios";
const { TextArea } = Input;

const CreateButton = ({ onProjectAdded }) => {
  const [projectNames, setProjectNames] = useState<string[]>(
    []
    // projectOverviewDetails.projectNames.slice(0, 5)
  );
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [currentDropdownValue, setCurrentDropdownValue] = useState("Main");

  const onProjectNameChange = (e: any) => {
    setProjectName(e.target.value);
  };
  const onProjectDescriptionChange = (e: any) => {
    setProjectDescription(e.target.value);
  };

  const onAddProject = async () => {
    if (!projectName || !projectDescription) {
      message.error("Please fill in all fields!");
      return;
    }

    setLoading(true); // Show loading spinner
    try {
      // API POST request to add the project
      const response = await axios.post("/api/projects", {
        name: projectName,
        description: projectDescription,
      });
      onProjectAdded();

      if (response.status === 201) {
        message.success("Project added successfully!");
        setProjectNames([projectName, ...projectNames]); // Add the new project to the list
        setOpen(false); // Close the modal
        setProjectName(""); // Reset form fields
        setProjectDescription("");
      } else {
        message.error("Failed to add project");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // const onAddProject = (e) => {
  //   projectNames.splice(0, 0, projectName);
  //   /*if (filterValue == "Recents") {
  //         setProjectNames(projectNames.slice(0, 5));
  //       } else {
  //         setProjectNames(projectNames);
  //       }*/
  //   setProjectNames(projectNames);
  //   setOpen(false);
  // };

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
  const items = [
    {
      key: "3",
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
      key: "2",
      label: (
        <div className="cardLine cursor-pointer" onClick={showModal}>
          <PartitionOutlined />
          <p className="text-sm p-2 font-medium">Site</p>
        </div>
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
  const contributors: MenuProps["items"] = [
    {
      key: "1",
      label: "Satyabrata Dash",
    },
    {
      key: "2",
      label: "Mahesh Gowda",
    },
  ];
  const project_Names: MenuProps["items"] = [
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
        // onOk={handleOk}
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
            {/* <p>Project Name</p> */}
            <div className="inviteModal mb-4">
              <Input
                placeholder="Project Name"
                onInput={onProjectNameChange}
                style={{ width: "95%" }}
              />
            </div>
            {/* <p>Brief Description</p> */}
            <div className="inviteModal mb-4">
              <TextArea
                className="border rounded-lg mb-5"
                rows={7}
                placeholder="Description"
                onInput={onProjectDescriptionChange}
                style={{ width: "95%" }}
              ></TextArea>
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
              rows={7}
              cols={70}
              placeholder="Description"
            ></textarea>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CreateButton;
