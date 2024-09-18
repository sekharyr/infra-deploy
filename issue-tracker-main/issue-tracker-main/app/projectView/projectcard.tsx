"use client";
import { Button, Card, Row, Col, Input, message } from "antd";
import { useState, useEffect } from "react";
import { Avatar, Dialog } from "@radix-ui/themes";
import Link from "next/link";
import ListIconSVG from "../components/ListIconSVG";
import "../css/card.css";
import CustomDropdown from "../components/CustomDropdown";
import PlusCircleOutlined from "../icons/PlusCircleOutlined";
import { union, filter, orderBy } from "lodash";
import axios from "axios";
const ProjectCard = ({ projects }) => {
  // const [projects, setProjects] = useState([]);
  // const [inputData, setInputData] = useState("");
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("Recent");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // Fetch projects on component mount
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await axios.get("/api/projects"); // Replace with your API endpoint
  //       setProjects(response.data); // Assuming response.data.projects is an array
  //     } catch (error) {
  //       message.error("Failed to fetch projects. Please try again.");
  //       setError("Failed to fetch projects");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProjects();
  // }, []);
  const filteredProjects =
    filterValue === "All" ? projects : projects.slice(0, 5);

  // const onInputChange = (e) => {
  //   setInputData(e.target.value);
  // };

  // const onAddProject = (e) => {
  //   projectNames.splice(0, 0, inputData);
  //   if (filterValue == "Recents") {
  //     setProjectNames(projectNames.slice(0, 5));
  //   } else {
  //     setProjectNames(projectNames);
  //   }
  //   setOpen(false);
  // };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  // if (error) return <p>{error}</p>;

  const projectElements = filteredProjects.map((project) => (
    <Col className="cardLine" span={12} key={project.id}>
      <ListIconSVG />
      <Link
        href={{
          pathname: `/projectView/${project.id}`,
          query: { name: project.id },
        }}
      >
        <p className="projectName">{project.name}</p>
      </Link>
      {/* Optionally render sites if needed */}
      {/* {project.sites.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          <h4>Sites:</h4>
          <ul>
            {project.sites.map((site) => (
              <li key={site.id}>
                <p>Site Name: {site.siteName}</p>
                <p>Region: {site.region}</p>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </Col>
  ));

  return (
    <div style={{ flexBasis: "97%", margin: "20px", height: "350px" }}>
      <Card
        title="Projects"
        extra={
          <CustomDropdown
            defaultValue="Recent"
            constName="projectShowOptions"
            onSelect={(val: any) => {
              setFilterValue(val);
            }}
          />
        }
        bordered={false}
        style={{ height: "100%" }}
      >
        <Row gutter={[16, 24]}>{projectElements}</Row>
      </Card>
    </div>
  );
};

export default ProjectCard;
