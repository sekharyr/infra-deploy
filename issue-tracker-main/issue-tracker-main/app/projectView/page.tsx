"use client";
import ProjectCard from "./ProjectCard"; // Ensure correct casing for import
import { useState, useEffect } from "react";
import { Button, message, Spin, Space } from "antd";
import CreateButton from "./CreateButton";
import axios from "axios";
import "../css/ProjectView.css";

const ProjectView = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/projects"); // Replace with your API endpoint
      setProjects(response.data); // Assuming response.data is an array of projects
    } catch (error) {
      message.error("Failed to fetch projects. Please try again.");
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const updateProjects = async () => {
    setLoading(true);
    await fetchProjects();
  };

  // if (loading) {
  //   return (
  //     <div className="loading-container">
  //       <Spin size="large" tip="Loading projects..." />
  //     </div>
  //   );
  // }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    // <div className="ProjectView">
    //   {projects.length > 0 ? (
    <ProjectCard projects={projects} loading={loading} />
    // ) : (
    //   <div className="empty-state">
    //     <p>
    //       No projects available. Click the button above to create a new
    //       project.
    //     </p>
    //   </div>
    // )}
    // {/* </div> */}
    // </div>
  );
};

export default ProjectView;
