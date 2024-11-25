"use client";
import { Card, Input, Table, Avatar, Pagination } from "antd";
import { useState } from "react";
import Link from "next/link";
import "../css/card.css";

const ProjectCard = ({ projects, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filter projects based on the search term in name or description
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get current page's projects
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      render: (text, project) => (
        <Link href={`/projectView/${project.id}`}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              className="letter-avatar"
              size="small"
              style={{ marginRight: 8 }}
            >
              {project.name.charAt(0).toUpperCase()}
            </Avatar>
            {text}
          </div>
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "No description available",
    },
  ];

  return (
    <Card
      title="Projects"
      loading={loading}
      extra={
        <Input
          placeholder="Search projects"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to the first page on search
          }}
          style={{ width: 200 }}
        />
      }
      bordered={false}
      className="full-height-card"
    >
      <Table
        dataSource={paginatedProjects}
        columns={columns}
        pagination={false}
        rowKey="id"
        size="small" // Makes the table more compact
      />
      <div className="pagination-container" style={{ marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProjects.length}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["5", "10", "15"]}
        />
      </div>
    </Card>
  );
};

export default ProjectCard;
