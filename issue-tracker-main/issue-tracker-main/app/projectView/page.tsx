import ProjectCard from "./projectcard";
import ContributorCard from "./contributorcard";
import TaskCard from "./TaskCard";
import "../css/ProjectView.css";

const ProjectView = () => {
  return (
    <div className="ProjectView">
      <TaskCard />
      <div className="CardView">
        <ProjectCard />
        <ContributorCard />
      </div>
    </div>
  );
};

export default ProjectView;
