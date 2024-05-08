import ProjectCard from "./projectcard";
import ContributorCard from "./contributorcard";
import TaskCard from "./TaskCard";
import { Button, Dropdown } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "../css/ProjectView.css";
import NewCirleOutlined from "../icons/NewCircleOutlined";
import CreateButton from "./CreateButton";
const ProjectView = () => {
  return (
    <div className="ProjectView">
      <CreateButton/>
      <TaskCard />
      <div className="CardView">
        <ProjectCard />
        {/*<ContributorCard />*/}
      </div>
    </div>
  );
};

export default ProjectView;
