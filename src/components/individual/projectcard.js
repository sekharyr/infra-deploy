import { Button, Card } from 'antd';
import ListIconSVG from '../../constants/ListIconSVG';
import "./card.css";
import ProjectPage from '../../containers/ProjectPage';
import { useState } from 'react';

const ProjectCard = (props) => {
    const [showPage, setShowPage] = useState(false)
    const [clickedProj, setClickedProj] = useState("")
    const projectNames = ["Demo Project1","Demo Project2","Demo Project3"]
    const projects = [];
    for(let i=0;i<projectNames.length;i++){
        projects.push(
            <div className='cardLine'>
                <ListIconSVG/>
                <p className="projectName">{projectNames[i]}</p>
            </div>
        )
    }
    const GoToProjectPage = (e) => {
        console.log("e is::",e);
        setShowPage(true);
        props.history.push("/project")
    }
    return(
        <div style={{flexBasis: "40%",margin:"20px",height:"350px"}}>
            <Card title="Projects" bordered={false} style={{height:"100%"}}>
                {projects}
            </Card>
        </div>
    )
}

export default ProjectCard;