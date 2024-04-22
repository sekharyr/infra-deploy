import { Button, Card } from "antd";
import Link from "next/link";
import ListIconSVG from "../components/ListIconSVG";
import "../css/card.css";

const ProjectCard = (props) => {
  const projectNames = ["Demo Project1", "Demo Project2", "Demo Project3"];
  const projects = [];
  for (let i = 0; i < projectNames.length; i++) {
    projects.push(
      <div className="cardLine">
        <ListIconSVG />
        <Link href={`/projectView/${projectNames[i]}`}>
          <p className="projectName">{projectNames[i]}</p>
        </Link>
      </div>
    );
  }
  return (
    <div style={{ flexBasis: "40%", margin: "20px", height: "350px" }}>
      <Card title="Projects" bordered={false} style={{ height: "100%" }}>
        {projects}
      </Card>
    </div>
  );
};

export default ProjectCard;
