import ProjectCard from "./projectcard";
import ContributorCard from "./contributorcard";
import "../css/ProjectView.css";

const ProjectView = () => {
  return (
    <div className="CardView">
      <ProjectCard />
      <ContributorCard />
    </div>
  );
};

export default ProjectView;
