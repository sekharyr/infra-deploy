// "use client";
// import {
//   Collapse,
//   Divider,
//   Input,
//   DatePicker,
//   Select,
//   Tag,
//   Tooltip,
//   message,
//   Avatar,
// } from "antd";
// import {
//   CheckCircleOutlined,
//   DeleteOutlined,
//   PlusOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
// import { useState, useEffect } from "react";
// import SliderWindow from "@/app/components/SliderWindow";
// import TaskDetails from "./TaskDetails";
// import dayjs from "dayjs";
// import "../../css/ProjectPage.css";

// const { Option } = Select;
// const dateFormat = "YYYY-MM-DD";

// const TaskTable = ({ value, name }) => {
//   const [isPaneOpen, setIsPaneOpen] = useState(false);
//   const [clickedTask, setClickedTask] = useState({});
//   const [collapsedItems, setCollapsedItems] = useState([]);
//   const [editSectionKey, setEditSectionKey] = useState(null);
//   const [newSectionLabel, setNewSectionLabel] = useState("");
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   const onClickDetailsSlide = (task) => {
//     setIsPaneOpen(true);
//     setClickedTask(task);
//   };

//   const closeDetailsSlide = () => {
//     setIsPaneOpen(false);
//     setClickedTask({});
//   };

//   // const onDateChange = (date, dateString, taskKey, sectionKey) => {
//   //   const updatedSections = collapsedItems.map((section) => {
//   //     if (section.key === sectionKey) {
//   //       return {
//   //         ...section,
//   //         children: section.children.map((task) =>
//   //           task.key === taskKey ? { ...task, dueDate: dateString } : task
//   //         ),
//   //       };
//   //     }
//   //     return section;
//   //   });
//   //   setCollapsedItems(updatedSections);
//   // };

//   const onTaskChange = (value, field, taskKey, sectionKey) => {
//     const updatedSections = collapsedItems.map((section) => {
//       if (section.key === sectionKey) {
//         return {
//           ...section,
//           children: section.children.map((task) =>
//             task.key === taskKey ? { ...task, [field]: value } : task
//           ),
//         };
//       }
//       return section;
//     });
//     setCollapsedItems(updatedSections);
//   };

//   const getTagColor = (status) => {
//     switch (status) {
//       case "open":
//         return "green";
//       case "in-progress":
//         return "blue";
//       case "in-review":
//         return "orange";
//       case "completed":
//         return "success";
//       case "blocked":
//         return "red";
//       default:
//         return "default"; // Fallback color
//     }
//   };
//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "High":
//         return "red"; // High priority color
//       case "Medium":
//         return "orange"; // Medium priority color
//       case "Normal":
//         return "yellow"; // Normal priority color
//       case "Low":
//       default:
//         return "green"; // Low priority color
//     }
//   };

//   const onAddTask = (sectionKey) => {
//     const newTask = {
//       key: `task-${Date.now()}`,
//       taskName: "New Task",
//       assignee: "",
//       reviewer: "",
//       status: "open",
//       priority: "Low",
//       dueDate: null,
//     };

//     const updatedSections = collapsedItems.map((section) => {
//       if (section.key === sectionKey) {
//         return {
//           ...section,
//           children: [...section.children, newTask],
//         };
//       }
//       return section;
//     });
//     setCollapsedItems(updatedSections);
//   };

//   const deleteTask = (taskKey, sectionKey) => {
//     const updatedSections = collapsedItems.map((section) => {
//       if (section.key === sectionKey) {
//         return {
//           ...section,
//           children: section.children.filter((task) => task.key !== taskKey),
//         };
//       }
//       return section;
//     });
//     setCollapsedItems(updatedSections);
//     message.success("Task deleted successfully");
//   };

//   const createTaskRow = (task, sectionKey) => (
//     <div
//       className={`task-row ${
//         editingTaskId === task.key ? "hover-highlight" : ""
//       }`} // Apply highlight class
//       key={task.key}
//       style={{ display: "table", width: "100%", borderSpacing: "0" }} // Display as table
//     >
//       {/* Task Row */}
//       <div style={{ display: "table-row" }}>
//         {/* Task Name Column */}
//         <div
//           style={{
//             display: "table-cell",
//             width: "20%",
//             padding: "4px 8px", // Small padding for compactness
//             fontSize: "13px",
//             verticalAlign: "middle", // Vertically center the content
//           }}
//         >
//           <CheckCircleOutlined
//             style={{
//               marginRight: "6px",
//               color: getTagColor(task.status),
//               fontSize: "16px", // Smaller icon
//             }}
//           />
//           {editingTaskId === task.key ? (
//             <Input
//               value={task.taskName}
//               onChange={(e) =>
//                 onTaskChange(e.target.value, "taskName", task.key, sectionKey)
//               }
//               onBlur={() => setEditingTaskId(null)}
//               style={{
//                 fontSize: "13px",
//                 padding: "4px",
//                 width: "100%",
//               }}
//             />
//           ) : (
//             <span>{task.taskName || "Enter a task name"}</span>
//           )}
//         </div>

//         {/* Assignee Column */}
//         <div
//           style={{
//             display: "table-cell",
//             width: "15%",
//             padding: "4px 8px",
//             fontSize: "13px",
//             verticalAlign: "middle",
//           }}
//         >
//           <Avatar
//             size="small"
//             style={{ marginRight: "6px", backgroundColor: "#375252" }}
//             src={task.assigneeAvatar}
//             alt={task.assignee || "Assignee"}
//           >
//             {task.assignee ? task.assignee.slice(0, 2).toUpperCase() : "AA"}
//           </Avatar>
//           {editingTaskId === task.key ? (
//             <Input
//               value={task.assignee}
//               onChange={(e) =>
//                 onTaskChange(e.target.value, "assignee", task.key, sectionKey)
//               }
//               onBlur={() => setEditingTaskId(null)}
//               style={{
//                 fontSize: "13px",
//                 padding: "4px",
//                 width: "100%",
//               }}
//             />
//           ) : (
//             <span>{task.assignee || "Assignee Name"}</span>
//           )}
//         </div>

//         {/* Reviewer Column */}
//         <div
//           style={{
//             display: "table-cell",
//             width: "15%",
//             padding: "4px 8px",
//             fontSize: "13px",
//             verticalAlign: "middle",
//           }}
//         >
//           <Avatar
//             size="small"
//             style={{ marginRight: "6px", backgroundColor: "#375252" }}
//             src={task.reviewerAvatar}
//             alt={task.reviewer || "Reviewer"}
//           >
//             {task.reviewer ? task.reviewer.slice(0, 2).toUpperCase() : "RR"}
//           </Avatar>
//           {editingTaskId === task.key ? (
//             <Input
//               value={task.reviewer}
//               onChange={(e) =>
//                 onTaskChange(e.target.value, "reviewer", task.key, sectionKey)
//               }
//               onBlur={() => setEditingTaskId(null)}
//               style={{
//                 fontSize: "13px",
//                 padding: "4px",
//                 width: "100%",
//               }}
//             />
//           ) : (
//             <span>{task.reviewer || "Reviewer Name"}</span>
//           )}
//         </div>

//         {/* Due Date Column */}
//         <div
//           style={{
//             display: "table-cell",
//             width: "10%",
//             padding: "4px 8px",
//             verticalAlign: "middle",
//           }}
//         >
//           <DatePicker
//             style={{ width: "100%", fontSize: "13px" }}
//             value={task.dueDate ? dayjs(task.dueDate, dateFormat) : null}
//             onChange={(date, dateString) =>
//               onTaskChange(dateString, "dueDate", task.key, sectionKey)
//             }
//             onBlur={() => setEditingTaskId(null)}
//             size="small" // Smaller date picker
//           />
//         </div>

//         {/* Status Column */}
//         <div
//           style={{
//             display: "table-cell",
//             width: "10%",
//             padding: "4px 8px",
//             verticalAlign: "middle",
//           }}
//         >
//           {editingTaskId === task.key ? (
//             <Select
//               value={task.status}
//               onChange={(val) =>
//                 onTaskChange(val, "status", task.key, sectionKey)
//               }
//               onBlur={() => setEditingTaskId(null)}
//               style={{
//                 width: "100%",
//                 fontSize: "13px",
//                 padding: "4px",
//               }}
//             >
//               <Option value="open">Open</Option>
//               <Option value="in-progress">In Progress</Option>
//               <Option value="in-review">In Review</Option>
//               <Option value="completed">Completed</Option>
//               <Option value="blocked">Blocked</Option>
//             </Select>
//           ) : (
//             <Tag
//               color={getTagColor(task.status)}
//               style={{
//                 display: "inline-block",
//                 width: "100%",
//                 textAlign: "center",
//                 fontSize: "13px",
//               }}
//             >
//               {task.status || "Open"}
//             </Tag>
//           )}
//         </div>

//         {/* Priority Column */}
//         <div
//           style={{
//             display: "table-cell",
//             width: "10%",
//             padding: "4px 8px",
//             verticalAlign: "middle",
//           }}
//         >
//           {editingTaskId === task.key ? (
//             <Select
//               value={task.priority}
//               onChange={(val) =>
//                 onTaskChange(val, "priority", task.key, sectionKey)
//               }
//               style={{
//                 width: "100%",
//                 fontSize: "13px",
//                 padding: "4px",
//               }}
//             >
//               <Option value="Low">Low</Option>
//               <Option value="Normal">Normal</Option>
//               <Option value="Medium">Medium</Option>
//               <Option value="High">High</Option>
//             </Select>
//           ) : (
//             <Tag
//               color={getPriorityColor(task.priority)}
//               style={{
//                 display: "inline-block",
//                 width: "100%",
//                 textAlign: "center",
//                 fontSize: "13px",
//               }}
//             >
//               {task.priority || "Low"}
//             </Tag>
//           )}
//         </div>

//         {/* Delete Icon */}
//         {editingTaskId === task.key && (
//           <div
//             style={{
//               display: "table-cell",
//               padding: "4px 8px",
//               verticalAlign: "middle",
//               textAlign: "center",
//             }}
//           >
//             <DeleteOutlined
//               onClick={() => deleteTask(task.key, sectionKey)}
//               style={{
//                 color: "red",
//                 fontSize: "16px",
//                 cursor: "pointer",
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const handleSectionLabelClick = (sectionKey) => {
//     setEditSectionKey(sectionKey);
//     const section = collapsedItems.find((item) => item.key === sectionKey);
//     if (section) {
//       setNewSectionLabel(section.label);
//     }
//   };

//   const handleSectionLabelChange = (e) => {
//     setNewSectionLabel(e.target.value);
//   };

//   const handleSectionLabelBlur = (sectionKey) => {
//     const sectionIndex = collapsedItems.findIndex(
//       (item) => item.key === sectionKey
//     );
//     if (sectionIndex === -1) return;

//     collapsedItems[sectionIndex].label = newSectionLabel;
//     setCollapsedItems([...collapsedItems]);
//     setEditSectionKey(null);
//   };

//   const addSection = () => {
//     const newSection = {
//       key: String(collapsedItems.length + 1),
//       label: "Section Name",
//       children: [],
//     };
//     setCollapsedItems([...collapsedItems, newSection]);
//   };

//   const TaskHeader = () => (
//     <div className="task-header">
//       <span style={{ width: "30%", display: "inline-block" }}>Task Name</span>
//       <span style={{ width: "10%", display: "inline-block" }}>Assignee</span>
//       <span style={{ width: "10%", display: "inline-block" }}>Reviewer</span>
//       <span style={{ width: "10%", display: "inline-block" }}>Due Date</span>
//       <span style={{ width: "10%", display: "inline-block" }}>Status</span>
//       <span style={{ width: "10%", display: "inline-block" }}>Priority</span>
//       <span style={{ width: "10%", display: "inline-block" }}></span>{" "}
//       {/* For delete icon */}
//     </div>
//   );

//   useEffect(() => {
//     const newItems = Object.keys(value).map((taskKey, index) => ({
//       key: String(index),
//       label: taskKey,
//       children: value[taskKey].map((task, i) => ({
//         ...task,
//         key: `${index}-${i}`,
//       })),
//     }));
//     setCollapsedItems(newItems);
//   }, [value]);

//   return (
//     <div>
//       <div className="task-header">
//         <span style={{ width: "30%", display: "inline-block" }}>Task Name</span>
//         <span style={{ width: "15%", display: "inline-block" }}>Assignee</span>
//         <span style={{ width: "20%", display: "inline-block" }}>Reviewer</span>
//         <span style={{ width: "12%", display: "inline-block" }}>Due Date</span>
//         <span style={{ width: "10%", display: "inline-block" }}>Status</span>
//         <span style={{ width: "10%", display: "inline-block" }}>Priority</span>
//         <span style={{ width: "2%", display: "inline-block" }}></span>{" "}
//       </div>

//       <Collapse defaultActiveKey={Object.keys(value).map((_, i) => String(i))}>
//         {collapsedItems.map((item) => (
//           <Collapse.Panel
//             header={
//               editSectionKey === item.key ? (
//                 <Input
//                   value={newSectionLabel}
//                   onChange={handleSectionLabelChange}
//                   onBlur={() => handleSectionLabelBlur(item.key)}
//                   autoFocus
//                   style={{ width: "150px", marginBottom: "8px" }}
//                 />
//               ) : (
//                 <div className="collapseHead">
//                   <span
//                     // style={{
//                     //   display: "inline-block",
//                     //   width: "150px",
//                     //   cursor: "pointer",
//                     // }}
//                     onClick={() => handleSectionLabelClick(item.key)}
//                   >
//                     {item.label}
//                   </span>
//                   <div className="section-delete-icon">
//                     <DeleteOutlined
//                       // Add this class
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         /* Add delete section logic here */
//                       }}
//                     />
//                   </div>
//                 </div>
//               )
//             }
//             key={item.key}
//           >
//             {/* <TaskHeader /> */}
//             {item.children.map((task) => createTaskRow(task, item.key))}
//             <div className="task-row" onClick={() => onAddTask(item.key)}>
//               <PlusOutlined /> Add Task...
//             </div>
//           </Collapse.Panel>
//         ))}
//       </Collapse>
//       {isPaneOpen && (
//         <SliderWindow
//           content={<TaskDetails task={clickedTask} projectName={name} />}
//           isPaneOpen={isPaneOpen}
//           closeDetailsSlide={closeDetailsSlide}
//         />
//       )}
//       <div className="add-section">
//         <PlusOutlined className="mr-2" />
//         <p className="cursor-pointer" onClick={addSection}>
//           Add Section
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TaskTable;

"use client";
import {
  Collapse,
  Input,
  Select,
  Tag,
  Tooltip,
  message,
  Avatar,
  Table,
  Button,
  DatePicker,
  Drawer,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import SliderWindow from "@/app/components/SliderWindow";
import TaskDetails from "./TaskDetails";
import dayjs from "dayjs";
import "../../css/ProjectPage.css";

const { Option } = Select;
const dateFormat = "YYYY-MM-DD";

const TaskTable = ({ value, name }) => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [clickedTask, setClickedTask] = useState({});
  const [collapsedItems, setCollapsedItems] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const onClickDetailsSlide = (task) => {
    setIsPaneOpen(true);
    setClickedTask(task);
  };

  const closeDetailsSlide = () => {
    setIsPaneOpen(false);
    setClickedTask(false);
  };

  const onTaskChange = (value, field, taskKey, sectionKey) => {
    const updatedSections = collapsedItems.map((section) => {
      if (section.key === sectionKey) {
        return {
          ...section,
          children: section.children.map((task) =>
            task.key === taskKey ? { ...task, [field]: value } : task
          ),
        };
      }
      return section;
    });
    setCollapsedItems(updatedSections);
  };

  const getTagColor = (status) => {
    switch (status) {
      case "open":
        return "green";
      case "in-progress":
        return "blue";
      case "in-review":
        return "orange";
      case "completed":
        return "success";
      case "blocked":
        return "red";
      default:
        return "default"; // Fallback color
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red"; // High priority color
      case "Medium":
        return "orange"; // Medium priority color
      case "Normal":
        return "yellow"; // Normal priority color
      case "Low":
      default:
        return "green"; // Low priority color
    }
  };

  const onAddTask = (sectionKey) => {
    const newTask = {
      key: `task-${Date.now()}`,
      taskName: "New Task",
      assignee: "",
      reviewer: "",
      status: "open",
      priority: "Low",
      dueDate: null,
    };

    const updatedSections = collapsedItems.map((section) => {
      if (section.key === sectionKey) {
        return {
          ...section,
          children: [...section.children, newTask],
        };
      }
      return section;
    });
    setCollapsedItems(updatedSections);
  };
  const deleteTask = (taskKey, sectionKey) => {
    const updatedSections = collapsedItems.map((section) => {
      if (section.key === sectionKey) {
        // Only update the section where the task is found
        return {
          ...section,
          children: section.children.filter((task) => task.key !== taskKey), // Filter out the task by taskKey
        };
      }
      return section; // Return the other sections unmodified
    });

    // Update the state with the new list of sections
    setCollapsedItems(updatedSections);

    // Show the success message after updating the state
    message.success("Task deleted successfully");
  };

  const getTagStyle = () => ({
    minWidth: "80px", // Set a minimum width to ensure all tags are the same size
    textAlign: "center", // Center the text inside the tag
    display: "inline-block", // Ensures tag takes the min-width regardless of content length
  });

  const columns = [
    {
      title: <span style={{ fontWeight: "bold" }}>Task Name</span>,
      dataIndex: "taskName",
      key: "taskName",
      width: "30%", // Largest column for readability
      render: (text, task) => (
        <span>
          {editingTaskId === task.key ? (
            <Input value={text} /* other props */ />
          ) : (
            text
          )}
        </span>
      ),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Assignee</span>,
      dataIndex: "assignee",
      key: "assignee",
      width: "15%", // Moderate width for names
      render: (text, task) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar
            style={{
              width: "30px", // Reduced width for smaller size
              height: "30px", // Reduced height to match width
              fontSize: "14px", // Smaller font size for the initials
              backgroundColor: "#708090", // Background color for the avatar
              color: "white", // White text color
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Centering the text inside the avatar
            }}
          >
            {text ? text[0] : "A"} {/* Display the first letter of the name */}
          </Avatar>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#708090",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {text || "Assignee Name"}
          </span>
        </div>
      ),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Reviewer</span>,
      dataIndex: "reviewer",
      key: "reviewer",
      width: "15%", // Similar width as Assignee
      render: (text, task) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar
            style={{
              width: "30px", // Reduced width for smaller size
              height: "30px", // Reduced height to match width
              fontSize: "14px", // Smaller font size for the initials
              backgroundColor: "#708090", // Background color for the avatar
              color: "white", // White text color
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Centering the text inside the avatar
            }}
          >
            {text ? text[0] : "A"} {/* Display the first letter of the name */}
          </Avatar>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#708090",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {text || "Reviewer Name"}
          </span>
        </div>
      ),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Due Date</span>,
      dataIndex: "dueDate",
      key: "dueDate",
      width: "12%", // Adjusted width for more spacing
      render: (date, task) => (
        <DatePicker
          value={date ? dayjs(date, dateFormat) : null} /* other props */
        />
      ),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Status</span>,
      dataIndex: "status",
      key: "status",
      width: "12%", // Same width as Priority
      render: (status) => (
        <Tag style={getTagStyle()} color={getTagColor(status)}>
          {status || "Open"}
        </Tag>
      ),
    },
    {
      title: <span style={{ fontWeight: "bold" }}>Priority</span>,
      dataIndex: "priority",
      key: "priority",
      width: "12%", // Same width as Status
      render: (priority) => (
        <Tag style={getTagStyle()} color={getPriorityColor(priority)}>
          {priority || "Low"}
        </Tag>
      ),
    },
    {
      title: "", // Empty column for actions
      key: "actions",
      width: "5%",
      render: (_, task) => (
        <DeleteOutlined
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.key, task.sectionKey);
          }} // Correct mapping to deleteTask function
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  useEffect(() => {
    const newItems = Object.keys(value).map((section, index) => ({
      key: String(index),
      sectionKey: `section-${index}`,
      label: section,
      children: value[section].map((task, i) => ({
        ...task,
        key: `${index}-${i}`,
      })),
    }));
    setCollapsedItems(newItems);
  }, [value]);

  const addSection = () => {
    const newSection = {
      key: String(collapsedItems.length + 1),
      label: "Section Name",
      children: [],
    };
    setCollapsedItems([...collapsedItems, newSection]);
  };

  return (
    <div>
      <Collapse defaultActiveKey={Object.keys(value).map((_, i) => String(i))}>
        {collapsedItems.map((item, index) => (
          <Collapse.Panel header={item.label} key={item.key}>
            <Table
              // columns={columns}
              columns={
                index === 0
                  ? columns
                  : columns.map((col) => ({ ...col, title: "" }))
              }
              dataSource={item.children}
              rowKey="key"
              pagination={false}
              className="custom-table"
              onRow={(record) => ({
                onClick: () => onClickDetailsSlide(record),
              })}
              showHeader={index === 0}
            />
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => onAddTask(item.key)}
              style={{ marginTop: 10 }}
            >
              Add Task
            </Button>
          </Collapse.Panel>
        ))}
      </Collapse>
      {/* {isPaneOpen && (
        <SliderWindow
          content={<TaskDetails task={clickedTask} projectName={name} />}
          isPaneOpen={isPaneOpen}
          closeDetailsSlide={closeDetailsSlide}
        />
      )} */}
      <Drawer
        title={clickedTask.taskName}
        visible={isPaneOpen}
        onClose={closeDetailsSlide}
        width={1200}
      >
        {/* <p>
          <strong>Assignee:</strong> {clickedTask.assignee}
        </p>
        <p>
          <strong>Due Date:</strong> {clickedTask.dueDate}
        </p>
        <p>
          <strong>Status:</strong> {clickedTask.status}
        </p>
        <p>
          <strong>Priority:</strong> {clickedTask.priority}
        </p> */}
        {clickedTask && <TaskDetails task={clickedTask} projectName={name} />}
      </Drawer>
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={addSection}
        style={{ marginTop: 20 }}
      >
        Add Section
      </Button>
    </div>
  );
};

export default TaskTable;
