// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Input, message, Card } from "antd";
// import { EditOutlined } from "@ant-design/icons";
// import { Flex } from "@radix-ui/themes";
// import "../../css/overview.css";
// import Sites from "../../siteView/SiteCard";
// import axios from "axios";

// const { TextArea } = Input;

// const Overview = ({ project }) => {
//   const [description, setDescription] = useState(project.description || "");
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const textAreaRef = useRef(null); // Ref to track TextArea

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const response = await axios.get(`/api/projects/${project.id}`);
//         setDescription(response.data.description);
//       } catch (error) {
//         message.error("Failed to load project description.");
//       }
//     };

//     fetchProjectDetails();
//   }, [project.id]);

//   // Function to save the description
//   const saveDescription = async () => {
//     setLoading(true);
//     try {
//       await axios.patch(`/api/projects/${project.id}`, {
//         name: project.name,
//         description: description,
//       });
//       message.success("Description updated successfully.");
//     } catch (error) {
//       message.error("Failed to save the description.");
//     } finally {
//       setIsEditing(false); // Exit edit mode
//       setLoading(false);
//     }
//   };

//   // Detect clicks outside of the TextArea to save
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         textAreaRef.current &&
//         !textAreaRef.current.resizableTextArea.textArea.contains(event.target)
//       ) {
//         if (isEditing) {
//           saveDescription(); // Save when clicking outside
//         }
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isEditing, description]);

//   return (
//     <div className="overview-section">
//       <Flex direction="row" align="start" gap="20px" style={{ width: "100%" }}>
//         <Flex
//           direction="row"
//           style={{ flex: 1 }} // 3/4 width
//         >
//           {/* <Card
//             title={<p className="text-xl mb-5 mt-3 font-medium">Description</p>}
//             style={{ flex: 0.25, maxWidth: 400 }} // 1/4 width
//           >
//             <div
//               className="text-area-container"
//               style={{ position: "relative" }}
//             >
//               <TextArea
//                 ref={textAreaRef} // Attach ref to TextArea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={2}
//                 placeholder="What's this project about?"
//                 onClick={() => setIsEditing(true)} // Enter edit mode on click
//                 disabled={loading} // Prevent editing when saving
//                 style={{
//                   backgroundColor: isEditing ? "#fff" : "#f5f5f5", // Visual cue when editing
//                   cursor: isEditing ? "text" : "pointer",
//                   paddingRight: "30px",
//                 }}
//               />
//             </div>
//           </Card> */}
//           <Sites projectId={project.id} />
//         </Flex>
//       </Flex>
//     </div>
//   );
// };

// export default Overview;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input, message, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Flex } from "@radix-ui/themes";
import "../../css/overview.css";
import Sites from "../../siteView/SiteCard";
import axios from "axios";

const { TextArea } = Input;

const Overview = ({ project }) => {
  const [description, setDescription] = useState(project.description || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/api/projects/${project.id}`);
        setDescription(response.data.description);
      } catch (error) {
        message.error("Failed to load project description.");
      }
    };

    fetchProjectDetails();
  }, [project.id]);

  const saveDescription = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/projects/${project.id}`, {
        name: project.name,
        description: description,
      });
      message.success("Description updated successfully.");
    } catch (error) {
      message.error("Failed to save the description.");
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        textAreaRef.current &&
        !textAreaRef.current.resizableTextArea.textArea.contains(event.target)
      ) {
        if (isEditing) {
          saveDescription();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, description]);

  return (
    <div
      // className="overview-section"
      style={{
        flex: 1,
        overflowY: "auto",
        // maxHeight: "calc(100vh - 150px)", // Adjust height to account for header and footer space
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* <Flex> */}
      {/* <Flex direction="row" style={{ flex: 1 }}> */}
      <Card
        title={<p className="text-xl mb-5 mt-3 font-medium">Description</p>}
        style={{ flex: 0.25, maxWidth: 400 }} // 1/4 width
      >
        <div className="text-area-container" style={{ position: "relative" }}>
          <TextArea
            ref={textAreaRef} // Attach ref to TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="What's this project about?"
            onClick={() => setIsEditing(true)} // Enter edit mode on click
            disabled={loading} // Prevent editing when saving
            style={{
              backgroundColor: isEditing ? "#fff" : "#f5f5f5", // Visual cue when editing
              cursor: isEditing ? "text" : "pointer",
              paddingRight: "30px",
            }}
          />
        </div>
      </Card>
      {/* <Sites projectId={project.id} /> */}
      {/* </Flex> */}
      {/* </Flex> */}
    </div>
  );
};

export default Overview;
