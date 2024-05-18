import { Collapse, Divider, Space, Table, Tag, Tabs } from "antd";
import "../../css/ProjectPage.css";
import TaskTable from "./TaskTable";
import Overview from "./Overview";
import projectOverviewDetails from "@/app/constants/TempPayloadsFolder/projectOverviewDetails";
import {
  BookOutlined,
  FileProtectOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import ListIconSVG from "@/app/components/ListIconSVG";
import FileAttachmentSection from "@/app/components/FileAttachmentSection";
import FileAttachmentSectionV2 from "@/app/components/FileAttachmentSectionV2";
import FinalFileAttachmentSection from "@/app/components/FinalFileAttachmentSection";
import InventoryTable from "./inventoryTable";

interface Props {
  params: { name: string };
}

const ProjectPage = ({ params }: Props) => {
  let files = [
    "jhk.jpg",
    "hhui.jpg",
    "yt.jpg",
    "freak.jpg",
    "freak2.jpg",
    "speak.jpg",
    "spe.jpg",
  ];
  const value = {
    "Site Survey": [
      {
        taskName: "Site materials check",
        assignee: "Satyabrata Dash",
        avatar: "SD",
        dueDate: "2024-05-03",
        priority: "Low",
        color: "#D1A500 ",
        status: "Open",
      },
      {
        taskName: "Site availability check",
        assignee: "Satyabrata Dash",
        avatar: "SD",
        dueDate: "2024-05-03",
        priority: "Medium",
        color: "#cc5500",
        status: "Open",
      },
    ],
    "Lease Agreement": [
      {
        taskName: "Check the agreement",
        assignee: "Satyabrata Dash",
        avatar: "SD",
        dueDate: "2024-05-03",
        priority: "High",
        color: "#c04000",
        status: "In Progress",
      },
    ],
    "Tower Installation": [
      {
        taskName: "Find the budget",
        assignee: "Satyabrata Dash",
        avatar: "SD",
        dueDate: "2024-04-03",
        priority: "Low",
        color: "#D1A500 ",
        status: "Completed",
      },
    ],
  };
  return (
    <div className="ProjectPageDetails">
      <div>
        <ListIconSVG />
      </div>
      <div style={{ width: "100%" }} className="ml-5">
        <p>{decodeURI(params.name)}</p>
        <Tabs
          className="-ml-7"
          defaultActiveKey="2"
          items={[
            {
              label: (
                <p>
                  <BookOutlined className="mr-1" />
                  Overview
                </p>
              ),
              key: "1",
              children: (
                <div>
                  <Overview />
                </div>
              ),
            },
            {
              label: (
                <p>
                  <UnorderedListOutlined className="mr-1" />
                  Tasks
                </p>
              ),
              key: "2",
              children: (
                <div className="project-page">
                  <Divider></Divider>
                  <div className="tableSpace">
                    <p style={{ width: "40%" }}>Task Name</p>
                    <Divider type="vertical"></Divider>
                    <p style={{ width: "10%" }}>Assignee</p>
                    <Divider type="vertical"></Divider>
                    <p style={{ width: "13%" }}>Due Date</p>
                    <Divider type="vertical"></Divider>
                    <p style={{ width: "10%" }}>Status</p>
                    <Divider type="vertical"></Divider>
                    <p style={{ width: "10%" }}>Priority</p>
                    <Divider type="vertical"></Divider>
                  </div>
                  <TaskTable value={value} projectName={params.name} />
                </div>
              ),
              disabled: false,
            },
            {
              label: (
                <p>
                  <FileProtectOutlined className="mr-1" />
                  Files
                </p>
              ),
              key: "3",
              children: <div>{<FileAttachmentSectionV2 />}</div>,
            },
            {
              label: "Inventory",
              key: "4",
              children: <InventoryTable/>,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProjectPage;
