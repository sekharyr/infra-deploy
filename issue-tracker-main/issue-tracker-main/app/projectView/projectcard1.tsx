// "use client";
// import { Card, Input, List, Avatar, Pagination } from "antd";
// import { useState } from "react";
// import Link from "next/link";
// import ListIconSVG from "../components/ListIconSVG";
// import "../css/card.css";

// const ProjectCard = ({ projects }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   // Filter projects based on the search term in name or description
//   const filteredProjects = projects.filter(
//     (project) =>
//       project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (project.description &&
//         project.description.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   // Get current page's projects
//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Handle page change
//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page);
//     setPageSize(pageSize);
//   };

//   return (
//     <Card
//       title="Projects"
//       extra={
//         <Input
//           placeholder="Search projects"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1); // Reset to the first page on search
//           }}
//           style={{ width: 200 }}
//         />
//       }
//       bordered={false}
//       className="full-height-card"
//     >
//       <div className="list-container">
//         <List
//           dataSource={paginatedProjects}
//           renderItem={(project) => (
//             <List.Item key={project.id}>
//               <List.Item.Meta
//                 avatar={<Avatar src={<ListIconSVG />} />}
//                 title={
//                   <Link
//                     href={{
//                       pathname: `/projectView/${project.id}`,
//                       query: { name: project.id },
//                     }}
//                   >
//                     {project.name}
//                   </Link>
//                 }
//                 description={project.description || "No description available"}
//               />
//             </List.Item>
//           )}
//         />
//       </div>
//       <div className="pagination-container">
//         <Pagination
//           current={currentPage}
//           pageSize={pageSize}
//           total={filteredProjects.length}
//           onChange={handlePageChange}
//           showSizeChanger
//           pageSizeOptions={["5", "10", "15"]}
//         />
//       </div>
//     </Card>
//   );
// };

// export default ProjectCard;

// "use client";
// import { Table, Pagination, Space, Tag, Avatar } from "antd";
// import { useState } from "react";
// import Link from "next/link";
// import { Resizable } from "react-resizable";

// // Custom component for Resizable Header
// const ResizableTitle = (props) => {
//   const { onResize, width, ...restProps } = props;

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       handle={<span className="resizer" />}
//       onResize={onResize}
//       draggableOpts={{ enableUserSelectHack: false }}
//     >
//       <th {...restProps} />
//     </Resizable>
//   );
// };

// const ProjectTable = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   // Sample data for 100 projects
//   const filteredProjects = Array.from({ length: 100 }, (_, index) => ({
//     id: index + 1,
//     name: `Project ${String.fromCharCode(65 + (index % 26))}${
//       Math.floor(index / 26) + 1
//     }`,
//     status: ["In Progress", "Completed", "Not Started", "Delayed"][
//       Math.floor(Math.random() * 4)
//     ],
//     progress: Math.floor(Math.random() * 101),
//     dueDate: `2024-${String((index % 12) + 1).padStart(2, "0")}-${String(
//       (index % 28) + 1
//     ).padStart(2, "0")}`,
//     owner: `Owner ${index + 1}`,
//   }));

//   // Handle page change
//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page);
//     setPageSize(pageSize);
//   };

//   // Define columns for the table
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       sorter: (a, b) => a.name.localeCompare(b.name),
//       render: (text, record) => (
//         <div className="table-cell">
//           <Link
//             href={{
//               pathname: `/projectView/${record.id}`,
//               query: { name: record.id },
//             }}
//           >
//             <Space>
//               <Avatar>{text.charAt(0).toUpperCase()}</Avatar>
//               {text}
//             </Space>
//           </Link>
//         </div>
//       ),
//       width: 200, // Set initial width
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       filters: [
//         { text: "In Progress", value: "In Progress" },
//         { text: "Completed", value: "Completed" },
//         { text: "Not Started", value: "Not Started" },
//         { text: "Delayed", value: "Delayed" },
//       ],
//       onFilter: (value, record) => record.status.includes(value),
//       render: (status) => (
//         <div className="table-cell">
//           <Tag
//             color={
//               status === "Completed"
//                 ? "green"
//                 : status === "Delayed"
//                 ? "red"
//                 : "blue"
//             }
//           >
//             {status}
//           </Tag>
//         </div>
//       ),
//       width: 150, // Set initial width
//     },
//     {
//       title: "Progress",
//       dataIndex: "progress",
//       key: "progress",
//       sorter: (a, b) => a.progress - b.progress,
//       render: (progress) => <div className="table-cell">{progress}%</div>,
//       width: 100, // Set initial width
//     },
//     {
//       title: "Due Date",
//       dataIndex: "dueDate",
//       key: "dueDate",
//       sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
//       render: (dueDate) => <div className="table-cell">{dueDate}</div>,
//       width: 100, // Set initial width
//     },
//     {
//       title: "Owner",
//       dataIndex: "owner",
//       key: "owner",
//       render: (owner) => (
//         <div className="table-cell">
//           <Space>
//             <Avatar>{owner.charAt(0).toUpperCase()}</Avatar>
//             {owner}
//           </Space>
//         </div>
//       ),
//       width: 100, // Set initial width
//     },
//   ];

//   // Get current page's projects
//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   return (
//     <div className="table-container">
//       <div className="table-scroll-container">
//         <Resizable
//           components={{
//             header: {
//               cell: ResizableTitle,
//             },
//           }}
//           columns={columns}
//           dataSource={paginatedProjects}
//           rowKey="id"
//           pagination={false}
//           style={{ minHeight: "100%" }}
//           className="custom-table"
//           scroll={{ y: "calc(100vh - 200px)" }} // Adjust the height as necessaryscroll={{ y: 'calc(100vh - 200px)' }} // Adjust the height as necessary
//         />
//       </div>
//       <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         total={filteredProjects.length}
//         onChange={handlePageChange}
//         showSizeChanger
//         pageSizeOptions={["5", "10", "15"]}
//         style={{ marginTop: 16, textAlign: "right" }}
//       />
//     </div>
//   );
// };

// export default ProjectTable;

"use client";
import { Table, Pagination, Space, Tag, Avatar } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css"; // Import resizable styles

// Custom component for Resizable Header
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={<span className="resizer" />}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const ProjectTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Define columns with resize functionality
    const initialColumns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text, record) => (
          <div className="table-cell">
            <Link
              href={{
                pathname: `/projectView/${record.id}`,
                query: { name: record.id },
              }}
            >
              <Space>
                <Avatar>{text.charAt(0).toUpperCase()}</Avatar>
                {text}
              </Space>
            </Link>
          </div>
        ),
        width: 200,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          { text: "In Progress", value: "In Progress" },
          { text: "Completed", value: "Completed" },
          { text: "Not Started", value: "Not Started" },
          { text: "Delayed", value: "Delayed" },
        ],
        onFilter: (value, record) => record.status.includes(value),
        render: (status) => (
          <Tag
            color={
              status === "Completed"
                ? "green"
                : status === "Delayed"
                ? "red"
                : "blue"
            }
          >
            {status}
          </Tag>
        ),
        width: 150,
      },
      {
        title: "Progress",
        dataIndex: "progress",
        key: "progress",
        sorter: (a, b) => a.progress - b.progress,
        render: (progress) => `${progress}%`,
        width: 100,
      },
      {
        title: "Due Date",
        dataIndex: "dueDate",
        key: "dueDate",
        sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
        render: (dueDate) => dueDate,
        width: 150,
      },
      {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
        render: (owner) => (
          <Space>
            <Avatar>{owner.charAt(0).toUpperCase()}</Avatar>
            {owner}
          </Space>
        ),
        width: 200,
      },
    ];

    const resizableColumns = initialColumns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }));

    setColumns(resizableColumns);
  }, []);

  const handleResize =
    (index) =>
    (e, { size }) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return nextColumns;
      });
    };

  // Sample data for 100 projects
  const filteredProjects = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Project ${String.fromCharCode(65 + (index % 26))}${
      Math.floor(index / 26) + 1
    }`,
    status: ["In Progress", "Completed", "Not Started", "Delayed"][
      Math.floor(Math.random() * 4)
    ],
    progress: Math.floor(Math.random() * 101),
    dueDate: `2024-${String((index % 12) + 1).padStart(2, "0")}-${String(
      (index % 28) + 1
    ).padStart(2, "0")}`,
    owner: `Owner ${index + 1}`,
  }));

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Get current page's projects
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="table-container">
      <div>
        <Table
          components={{
            header: {
              cell: ResizableTitle,
            },
          }}
          columns={columns}
          dataSource={paginatedProjects}
          rowKey="id"
          pagination={false}
          className="custom-table"
          scroll={{ y: "calc(100vh - 200px)" }} // Adjust scroll height as needed
        />
      </div>
      <Pagination
        size="small"
        current={currentPage}
        pageSize={pageSize}
        total={filteredProjects.length}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["5", "10", "15"]}
        style={{ marginTop: 8, textAlign: "right" }}
      />
    </div>
  );
};

export default ProjectTable;
