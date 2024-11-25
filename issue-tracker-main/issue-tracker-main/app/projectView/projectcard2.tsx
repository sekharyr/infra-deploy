"use client";
import { Table, Pagination, Space, Tag, Avatar } from "antd";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Resizable } from "react-resizable";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MenuOutlined } from "@ant-design/icons";
import update from "immutability-helper";

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

// Row component for drag-and-drop functionality
const DraggableRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef();
  const [{ isOver }, drop] = useDrop({
    accept: "row",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item) => {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  const [, drag] = useDrag({
    type: "row",
    item: { index },
  });

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      className={className}
      style={{
        ...style,
        backgroundColor: isOver ? "#e6f7ff" : "transparent",
        cursor: "move",
      }}
      {...restProps}
    />
  );
};

const ProjectTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [data, setData] = useState(
    Array.from({ length: 100 }, (_, index) => ({
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
    }))
  );

  // Handle page change
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Handle row reordering
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedRow = data[dragIndex];
      const updatedData = update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedRow],
        ],
      });
      setData(updatedData);
    },
    [data]
  );

  // Handle resizing of columns
  const handleResize =
    (index) =>
    (e, { size }) => {
      setColumns((prevColumns) =>
        prevColumns.map((col, colIndex) =>
          colIndex === index ? { ...col, width: size.width } : col
        )
      );
    };

  // Define columns for the table
  const [columns, setColumns] = useState([
    {
      title: "",
      dataIndex: "drag",
      key: "drag",
      width: 30,
      render: (_, record) =>
        record.id === hoveredRowId ? (
          <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
        ) : null,
    },
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
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(
          columns.findIndex((col) => col.key === column.key)
        ),
      }),
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
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(
          columns.findIndex((col) => col.key === column.key)
        ),
      }),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      sorter: (a, b) => a.progress - b.progress,
      render: (progress) => <div>{progress}%</div>,
      width: 100,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(
          columns.findIndex((col) => col.key === column.key)
        ),
      }),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      render: (dueDate) => <div>{dueDate}</div>,
      width: 120,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(
          columns.findIndex((col) => col.key === column.key)
        ),
      }),
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
      width: 150,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(
          columns.findIndex((col) => col.key === column.key)
        ),
      }),
    },
  ]);

  // Get current page's projects
  const paginatedProjects = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="table-container">
        <Table
          components={{
            header: {
              cell: ResizableTitle,
            },
            body: {
              row: DraggableRow,
            },
          }}
          columns={columns}
          dataSource={paginatedProjects}
          rowKey="id"
          pagination={false}
          className="custom-table"
          onRow={(record) => ({
            index: data.indexOf(record),
            moveRow,
            onMouseEnter: () => setHoveredRowId(record.id),
            onMouseLeave: () => setHoveredRowId(null),
          })}
          scroll={{ y: "calc(100vh - 300px)" }}
        />
        <Pagination
          size={"small"}
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["5", "10", "15"]}
          style={{ marginTop: 16, textAlign: "right" }}
        />
      </div>
    </DndProvider>
  );
};

export default ProjectTable;
