// "use client";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import {
//   Button,
//   Collapse,
//   Divider,
//   Space,
//   Table,
//   Tag,
//   Tabs,
//   message,
//   Modal,
// } from "antd";
// import "../../css/ProjectPage.css";
// import TaskTable from "./TaskTable";
// import Overview from "./Overview";
// import projectOverviewDetails from "@/app/constants/TempPayloadsFolder/projectOverviewDetails";
// import {
//   BookOutlined,
//   FileProtectOutlined,
//   PlusOutlined,
//   UnorderedListOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import ListIconSVG from "@/app/components/ListIconSVG";
// import FileAttachmentSection from "@/app/components/FileAttachmentSection";
// import FileAttachmentSectionV2 from "@/app/components/FileAttachmentSectionV2";
// import FinalFileAttachmentSection from "@/app/components/FinalFileAttachmentSection";
// import InventoryTable from "./inventoryTable";
// import { useRouter } from "next/navigation";
// interface Props {
//   params: { id: any };
// }

// const ProjectPage = ({ params }: Props) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [project, setProject] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const showDeleteConfirm = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = async () => {
//     setLoading(true);
//     try {
//       await axios.delete(`/api/projects/${project.id}`); // Call the backend delete endpoint
//       message.success("Project deleted successfully.");
//       router.push("/projectView"); // Redirect to another page after deletion
//     } catch (error) {
//       message.error("Failed to delete the project.");
//     } finally {
//       setLoading(false);
//       setIsModalVisible(false);
//     }
//   };
//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await axios.get(`/api/projects/${params.id}`); // Replace with your API endpoint
//         setProject(response.data); // Assuming response.data.projects is an array
//       } catch (error) {
//         message.error("Failed to fetch projects. Please try again.");
//         setError("Failed to fetch projects");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProject();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }
//   let files = [
//     "jhk.jpg",
//     "hhui.jpg",
//     "yt.jpg",
//     "freak.jpg",
//     "freak2.jpg",
//     "speak.jpg",
//     "spe.jpg",
//   ];
//   const value = {
//     "Site Survey": [
//       {
//         taskName: "Site materials check",
//         assignee: "Satyabrata Dash",
//         avatar: "SD",
//         dueDate: "2024-05-03",
//         priority: "Low",
//         color: "#D1A500 ",
//         status: "Open",
//       },
//       {
//         taskName: "Site availability check",
//         assignee: "Satyabrata Dash",
//         avatar: "SD",
//         dueDate: "2024-05-03",
//         priority: "Medium",
//         color: "#cc5500",
//         status: "Open",
//       },
//     ],
//     "Lease Agreement": [
//       {
//         taskName: "Check the agreement",
//         assignee: "Satyabrata Dash",
//         avatar: "SD",
//         dueDate: "2024-05-03",
//         priority: "High",
//         color: "#c04000",
//         status: "In Progress",
//       },
//     ],
//     "Tower Installation": [
//       {
//         taskName: "Find the budget",
//         assignee: "Satyabrata Dash",
//         avatar: "SD",
//         dueDate: "2024-04-03",
//         priority: "Low",
//         color: "#D1A500 ",
//         status: "Completed",
//       },
//     ],
//   };
//   return (
//     <div className="ProjectPageDetails">
//       <div>
//         <ListIconSVG />
//       </div>
//       <div style={{ width: "100%" }} className="ml-5">
//         <p>{decodeURI(project.name)}</p>
//         <Tabs
//           className="-ml-7"
//           defaultActiveKey="2"
//           items={[
//             {
//               label: (
//                 <p>
//                   <BookOutlined className="mr-1" />
//                   Overview
//                 </p>
//               ),
//               key: "1",
//               children: (
//                 <div>
//                   <Overview project={project} />
//                 </div>
//               ),
//             },
//             {
//               label: (
//                 <p>
//                   <UnorderedListOutlined className="mr-1" />
//                   Tasks
//                 </p>
//               ),
//               key: "2",
//               children: (
//                 <div className="project-page">
//                   <Divider></Divider>
//                   <div className="tableSpace">
//                     <p style={{ width: "40%" }}>Task Name</p>
//                     <Divider type="vertical"></Divider>
//                     <p style={{ width: "10%" }}>Assignee</p>
//                     <Divider type="vertical"></Divider>
//                     <p style={{ width: "13%" }}>Due Date</p>
//                     <Divider type="vertical"></Divider>
//                     <p style={{ width: "10%" }}>Status</p>
//                     <Divider type="vertical"></Divider>
//                     <p style={{ width: "10%" }}>Priority</p>
//                     <Divider type="vertical"></Divider>
//                   </div>
//                   <TaskTable value={value} projectName={params.name} />
//                 </div>
//               ),
//               disabled: false,
//             },
//             {
//               label: (
//                 <p>
//                   <FileProtectOutlined className="mr-1" />
//                   Files
//                 </p>
//               ),
//               key: "3",
//               children: <div>{<FileAttachmentSectionV2 />}</div>,
//             },
//             {
//               label: "Inventory",
//               key: "4",
//               children: <InventoryTable />,
//             },
//           ]}
//         />
//       </div>
//       <div>
//         <Button
//           // type="primary"
//           icon={<DeleteOutlined />}
//           onClick={showDeleteConfirm}
//           danger
//         ></Button>
//         <Modal
//           title="Confirm Deletion"
//           visible={isModalVisible}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           confirmLoading={loading}
//           footer={[
//             <Button key="cancel" onClick={handleCancel}>
//               Cancel
//             </Button>,
//             <Button key="ok" type="primary" danger onClick={handleOk}>
//               Delete
//             </Button>,
//           ]}
//         >
//           <p>
//             Are you sure you want to delete this project? This action cannot be
//             undone.
//           </p>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default ProjectPage;

// "use client";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Button, Divider, Tabs, message, Modal, Avatar } from "antd";
// import "../../css/ProjectPage.css";
// import TaskTable from "./TaskTable";
// import Overview from "./Overview";
// import {
//   BookOutlined,
//   FileProtectOutlined,
//   UnorderedListOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import FileAttachmentSectionV2 from "@/app/components/FileAttachmentSectionV2";
// import InventoryTable from "./inventoryTable";
// import { useRouter } from "next/navigation";
// import Sites from "../../siteView/SiteCard";

// interface Props {
//   params: { id: any };
// }

// const ProjectPage = ({ params }: Props) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [project, setProject] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const showDeleteConfirm = () => {
//     setIsModalVisible(true);
//   };
//   const value = {
//     "Site Survey": [
//       {
//         taskName: "Site materials check",
//         assignee: "Satyabrata Dash",
//         avatar: "SD",
//         dueDate: "2024-05-03",
//         priority: "Low",
//         color: "#D1A500 ",
//         status: "Open",
//       },
//       {
//         taskName: "Site availability check",
//         assignee: "Satyabrata Dash",
//         avatar: "SD",
//         dueDate: "2024-05-03",
//         priority: "Medium",
//         color: "#cc5500",
//         status: "Open",
//       },
//     ],
//     "Lease Agreement": [
//       {
//         taskName: "Check the agreement",
//         assignee: "Satyabrata Dash",
//         avatar: "SD",
//         dueDate: "2024-05-03",
//         priority: "High",
//         color: "#c04000",
//         status: "In Progress",
//       },
//     ],
//     "Tower Installation": [
//       {
//         taskName: "Find the budget",
//         assignee: "Satyabrata Dash",
//         avatar: "SD",
//         dueDate: "2024-04-03",
//         priority: "Low",
//         color: "#D1A500 ",
//         status: "Completed",
//       },
//     ],
//   };

//   const handleOk = async () => {
//     setLoading(true);
//     try {
//       await axios.delete(`/api/projects/${project.id}`);
//       message.success("Project deleted successfully.");
//       router.push("/projectView");
//     } catch (error) {
//       message.error("Failed to delete the project.");
//     } finally {
//       setLoading(false);
//       setIsModalVisible(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await axios.get(`/api/projects/${params.id}`);
//         setProject(response.data);
//       } catch (error) {
//         message.error("Failed to fetch projects. Please try again.");
//         setError("Failed to fetch projects");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProject();
//   }, [params.id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div
//       className="ProjectPageDetails"
//       style={{ display: "flex", flexDirection: "column" }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           padding: "10px",
//           backgroundColor: "#f5f5f5",
//         }}
//       >
//         <Avatar
//           className="letter-avatar"
//           shape="square"
//           size={48}
//           style={{ backgroundColor: "#375252" }}
//         >
//           {project.name?.charAt(0).toUpperCase()}
//         </Avatar>
//         <div style={{ marginLeft: "10px" }}>
//           <p style={{ fontSize: "12px" }}>PROJECT</p>
//           <p style={{ fontSize: "18px", fontWeight: "bold" }}>
//             {decodeURI(project.name)}
//           </p>
//         </div>
//         <Button
//           icon={<DeleteOutlined />}
//           onClick={showDeleteConfirm}
//           danger
//           style={{ marginLeft: "auto" }}
//         />
//       </div>

//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           // overflow: "hidden",
//         }}
//       >
//         <Tabs
//           className="full-height-card"
//           defaultActiveKey="1"
//           // style={{ flex: 1, overflow: "hidden" }}
//           items={[
//             {
//               label: (
//                 <p>
//                   <BookOutlined className="mr-1" />
//                   Overview
//                 </p>
//               ),
//               key: "1",
//               children: (
//                 <div
//                 // style={{
//                 //   // height: "100%",
//                 //   overflowY: "auto",
//                 //   paddingRight: "8px",
//                 // }}
//                 >
//                   <Overview project={project} />
//                 </div>
//               ),
//             },
//             {
//               label: (
//                 <p>
//                   <UnorderedListOutlined className="mr-1" />
//                   Sites
//                 </p>
//               ),
//               key: "2",
//               children: (
//                 <div
//                 // style={{
//                 //   // height: "100%",
//                 //   overflowY: "auto",
//                 //   paddingRight: "8px",
//                 // }}
//                 >
//                   {/* <Overview project={project} /> */}
//                   <Sites projectId={project.id} />
//                   {/* <Divider />
//                   <div className="tableSpace">
//                     <p style={{ width: "40%" }}>Task Name</p>
//                     <Divider type="vertical" />
//                     <p style={{ width: "10%" }}>Assignee</p>
//                     <Divider type="vertical" />
//                     <p style={{ width: "13%" }}>Due Date</p>
//                     <Divider type="vertical" />
//                     <p style={{ width: "10%" }}>Status</p>
//                     <Divider type="vertical" />
//                     <p style={{ width: "10%" }}>Priority</p>
//                     <Divider type="vertical" />
//                   </div>
//                   <TaskTable value={value} projectName={params.name} /> */}
//                 </div>
//               ),
//             },
//             {
//               label: (
//                 <p>
//                   <FileProtectOutlined className="mr-1" />
//                   Files
//                 </p>
//               ),
//               key: "3",
//               children: (
//                 <div
//                 // style={{
//                 //   // height: "100%",
//                 //   overflowY: "auto",
//                 //   paddingRight: "8px",
//                 // }}
//                 >
//                   <FileAttachmentSectionV2 />
//                 </div>
//               ),
//             },
//             {
//               label: "Inventory",
//               key: "4",
//               children: (
//                 <div
//                 // style={{
//                 //   // height: "100%",
//                 //   overflowY: "auto",
//                 //   paddingRight: "8px",
//                 // }}
//                 >
//                   <InventoryTable />
//                 </div>
//               ),
//             },
//           ]}
//         />
//       </div>

//       <Modal
//         title="Confirm Deletion"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         confirmLoading={loading}
//         footer={[
//           <Button key="cancel" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button key="ok" type="primary" danger onClick={handleOk}>
//             Delete
//           </Button>,
//         ]}
//       >
//         <p>
//           Are you sure you want to delete this project? This action cannot be
//           undone.
//         </p>
//       </Modal>
//     </div>
//   );
// };

// export default ProjectPage;

"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Divider, Tabs, message, Modal, Avatar } from "antd";
import "../../css/ProjectPage.css";
import TaskTable from "./TaskTable";
import Overview from "./Overview";
import {
  BookOutlined,
  FileProtectOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import FileAttachmentSectionV2 from "@/app/components/FileAttachmentSectionV2";
import InventoryTable from "./inventoryTable";
import { useRouter } from "next/navigation";
import Sites from "../../siteView/SiteCard";

interface Props {
  params: { id: any };
}

const ProjectPage = ({ params }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/projects/${project.id}`);
      message.success("Project deleted successfully.");
      router.push("/projectView");
    } catch (error) {
      message.error("Failed to delete the project.");
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${params.id}`);
        setProject(response.data);
      } catch (error) {
        message.error("Failed to fetch projects. Please try again.");
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="ProjectPageDetails"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Avatar
          className="letter-avatar"
          shape="square"
          size={48}
          style={{ backgroundColor: "#773777" }}
        >
          {project.name?.charAt(0).toUpperCase()}
        </Avatar>
        <div style={{ marginLeft: "10px" }}>
          <p style={{ fontSize: "12px" }}>PROJECT</p>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {decodeURI(project.name)}
          </p>
        </div>
        <Button
          icon={<DeleteOutlined />}
          onClick={showDeleteConfirm}
          danger
          style={{ marginLeft: "auto" }}
        />
      </div>

      <div
        style={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          // style={{ flex: 1 }}
        >
          <Tabs.TabPane
            tab={
              <p>
                <BookOutlined className="mr-1" />
                Overview
              </p>
            }
            key="1"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ flex: 1, overflowY: "auto" }}>
                <Overview project={project} />
              </div>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <p>
                <UnorderedListOutlined className="mr-1" />
                Sites
              </p>
            }
            key="2"
          >
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            > */}
            {/* <div style={{ flex: 1, overflowY: "auto" }}> */}
            <Sites projectId={project.id} />
            {/* </div> */}
            {/* </div> */}
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <p>
                <FileProtectOutlined className="mr-1" />
                Files
              </p>
            }
            key="3"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ flex: 1, overflowY: "auto" }}>
                <FileAttachmentSectionV2 />
              </div>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Inventory" key="4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ flex: 1, overflowY: "auto" }}>
                <InventoryTable />
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" danger onClick={handleOk}>
            Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
};

export default ProjectPage;
