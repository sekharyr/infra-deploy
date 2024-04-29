import { Collapse, Divider, Space, Table, Tag, Tabs } from "antd";
import "../../css/ProjectPage.css";
import TaskTable from "./TaskTable";
import Overview from "./Overview";
import projectOverviewDetails from "@/app/constants/TempPayloadsFolder/projectOverviewDetails"; 

interface Props {
  params: { name: string };
}

const ProjectPage = ({ params }: Props) => {
  const value = {
    toDo: [
      {
        taskName: "Verify The Goods",
        assignee: "Satyabrata Dash",
        avatar: "SD",
        dueDate: "12/05/2024",
        priority: "low",
      },
      {
        taskName: "Verify The Goods",
        assignee: "Satyabrata Dash",
        avatar: "SD",
        dueDate: "12/05/2024",
        priority: "Medium",
      },
    ],
    Doing: [
      {
        taskName: "Collect The Goods",
        assignee: "Satyabrata Dash",
        avatar: "SD",
        dueDate: "12/05/2024",
        priority: "High",
      },
    ],
    Done: [
      {
        taskName: "Check The Goods",
        assignee: "Satyabrata Dash",
        avatar: "SD",
        dueDate: "12/05/2024",
        priority: "low",
      },
    ],
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="2"
        items={[
          {
            label: "Overview",
            key: "1",
            children: (
              <div>
                <Overview />
              </div>
            ),
          },
          {
            label: "List",
            key: "2",
            children: (
              <div className="project-page">
                <Divider></Divider>
                <div className="tableSpace">
                  <p style={{ width: "40%" }}>Task Name</p>
                  <Divider
                    type="vertical"
                  ></Divider>
                  <p style={{ width: "10%" }}>Assignee</p>
                  <Divider type="vertical"></Divider>
                  <p style={{ width: "10%" }}>Due Date</p>
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
            label: "Dashboard",
            key: "4",
            children: "Dashboard",
          },
          {
            label: "Map",
            key: "3",
            children: "Tab 3",
          },
        ]}
      />
    </div>
  );
};

export default ProjectPage;
