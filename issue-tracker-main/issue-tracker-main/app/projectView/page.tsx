"use client";
import ProjectCard from "./projectcard";
import { useState, useEffect } from "react";
import ContributorCard from "./contributorcard";
import TaskCard from "./TaskCard";
import { Button, Dropdown, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "../css/ProjectView.css";
import NewCirleOutlined from "../icons/NewCircleOutlined";
import CreateButton from "./CreateButton";
import axios from "axios";
import { update } from "lodash";

const ProjectView = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects"); // Replace with your API endpoint
        setProjects(response.data); // Assuming response.data.projects is an array
      } catch (error) {
        message.error("Failed to fetch projects. Please try again.");
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const updateProjects = async () => {
    try {
      const response = await axios.get("/api/projects"); // Replace with your API endpoint
      setProjects(response.data); // Assuming response.data.projects is an array
    } catch (error) {
      message.error("Failed to fetch projects. Please try again.");
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="ProjectView">
      <CreateButton onProjectAdded={updateProjects} />
      {/* <TaskCard /> */}
      <div className="CardView">
        <ProjectCard projects={projects} />
        {/*<ContributorCard />*/}
      </div>
    </div>
  );
};

export default ProjectView;
