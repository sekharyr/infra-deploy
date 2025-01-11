"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  Collapse,
  Divider,
  Space,
  Table,
  Tag,
  Tabs,
  Input,
  message,
  Modal,
  Avatar,
  Segmented,
  Drawer,
} from "antd";
import Link from "next/link";
import "../../css/ProjectPage.css";
import TaskTable from "./TaskTable";
import Overview from "./Overview";
import projectOverviewDetails from "@/app/constants/TempPayloadsFolder/projectOverviewDetails";
import {
  BookOutlined,
  FileProtectOutlined,
  PlusOutlined,
  ExportOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ListIconSVG from "@/app/components/ListIconSVG";
import FileAttachmentSection from "@/app/components/FileAttachmentSection";
import FileAttachmentSectionV2 from "@/app/components/FileAttachmentSectionV2";
import FinalFileAttachmentSection from "@/app/components/FinalFileAttachmentSection";
import InventoryTable from "./inventoryTable";
import { useRouter } from "next/navigation";
import path from "path";
import ReviewCard from "@/app/components/ReviewCard";
import ExcelLikeCard from "@/app/forms/ExcelLikeCard";

interface Props {
  params: { id: any };
}

const SitePage = ({ params }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [site, setSite] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projectName, setProjectName] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState("Table"); // State to toggle between Table and ReviewCard
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  // Function to close the drawer
  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/sites/${site.id}`);
      message.success("Project deleted successfully.");
      router.push(`/projectView/${site.projectId}`);
    } catch (error) {
      message.error("Failed to delete the site.");
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const response = await axios.get(`/api/sites/${params.id}`);
        setSite(response.data);
        const resp = await axios.get(
          `/api/projects/${response.data.projectId}`
        );
        setProjectName(resp.data.name);
      } catch (error) {
        message.error("Failed to fetch site. Please try again.");
        setError("Failed to fetch site");
      } finally {
        setLoading(false);
      }
    };
    fetchSite();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleExport = async () => {
    try {
      const response = await axios.post(`/api/sites/${site.id}/export`, {
        site,
      });
      if (response.status === 200) {
        message.success(`Json saved successfully`);
      } else {
        message.error(`Failed to save json`);
      }
    } catch (error) {
      message.error("Failed to save json. Please try again.");
      setError("Failed to save json");
    } finally {
      setLoading(false);
    }

    // const fileUrl = "/uploads/site-data.json";
    // const link = document.createElement("a");
    // link.href = fileUrl;
    // link.download = "site-data.json";
    // link.click();
    const fileUrl = "/uploads/ajeel_tssr_report.xlsx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "ajeel_tssr_report.xlsx";
    link.click();
  };

  const value = {
    "IP Part Survey": [
      {
        taskName: "Capture Existing Equipment",
        assignee: "John Doe",
        reviewer: "Jane Smith",
        avatar: "SD",
        dueDate: "2024-05-03",
        priority: "Low",
        color: "#D1A500",
        status: "Open",
      },
      {
        taskName: "Capture New Equipment",
        assignee: "David Brown",
        reviewer: "Jane Smith",
        avatar: "SD",
        dueDate: "2024-05-03",
        priority: "Medium",
        color: "#cc5500",
        status: "Open",
      },
    ],
    "Wireless Part Survey": [
      {
        taskName: "Propose Information",
        assignee: "David Brown",
        reviewer: "Jane Smith",
        avatar: "SD",
        dueDate: "2024-05-03",
        priority: "High",
        color: "#c04000",
        status: "In Progress",
      },
      {
        taskName: "Auxiliary Materials",
        assignee: "David Brown",
        reviewer: "Jane Smith",
        avatar: "SD",
        dueDate: "2024-05-03",
        priority: "High",
        color: "#c04000",
        status: "In Progress",
      },
      {
        taskName: "Propose New Equipment",
        assignee: "David Brown",
        reviewer: "Jane Smith",
        avatar: "SD",
        dueDate: "2024-05-03",
        priority: "High",
        color: "#c04000",
        status: "In Progress",
      },
    ],
    "Microwave Part Survey": [
      {
        taskName: "Find the budget",
        assignee: "David Brown",
        reviewer: "Jane Smith",
        avatar: "SD",
        dueDate: "2024-04-03",
        priority: "Low",
        color: "#D1A500",
        status: "Completed",
      },
    ],
  };

  return (
    <div
      className="ProjectPageDetails"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div>
        <Link
          href={{
            pathname: `/projectView/${site.projectId}`,
            query: { name: site.projectId },
          }}
        >
          <Tag color="orange">{projectName}</Tag>
        </Link>
      </div>
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
          {site.siteName?.charAt(0).toUpperCase()}
        </Avatar>
        <div style={{ marginLeft: "10px" }}>
          <p style={{ fontSize: "12px" }}>SITE</p>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {decodeURI(site.siteName)}
          </p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Button
            icon={<DeleteOutlined />}
            onClick={showDeleteConfirm}
            danger
            style={{ marginLeft: "auto" }}
          ></Button>
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
              Are you sure you want to delete this site? This action cannot be
              undone.
            </p>
          </Modal>
        </div>
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
        <Tabs defaultActiveKey="2">
          <Tabs.TabPane
            tab={
              <p>
                <BookOutlined className="mr-1" /> Overview
              </p>
            }
            key="1"
          >
            <Overview site={site} />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <p>
                <UnorderedListOutlined className="mr-1" /> TSSR
              </p>
            }
            key="2"
          >
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Segmented
                options={["Tasks", "Review"]}
                value={viewMode}
                defaultValue="Tasks"
                onChange={setViewMode}
              />
            </div> */}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            > */}
            {/* <Segmented
              options={["Table", "Review"]}
              value={viewMode}
              onChange={setViewMode}
              style={{ marginBottom: "16px" }}
            /> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between", // Align elements to both ends
                marginBottom: "16px",
              }}
            >
              <Segmented
                options={["Table", "Review"]}
                value={viewMode}
                onChange={setViewMode}
                // style={{ flex: 1 }} // Take up available space
              />

              <div>
                <Input
                  placeholder="Enter assignee name"
                  prefix={
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                      }}
                    >
                      JD
                    </Avatar>
                  }
                  value="John Doe"
                  style={{
                    width: "200px",
                    marginRight: "8px",
                  }}
                />
                <Button
                  icon={<EyeOutlined />}
                  onClick={showDrawer}
                  style={{ marginLeft: 8 }}
                >
                  View
                </Button>
                <Button
                  icon={<ExportOutlined />}
                  onClick={handleExport}
                  style={{ marginLeft: 8 }}
                >
                  Export
                </Button>
              </div>
            </div>
            {/* </div> */}
            {viewMode === "Table" ? (
              <TaskTable value={value} projectName={projectName} />
            ) : (
              <ReviewCard />
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <p>
                <UnorderedListOutlined className="mr-1" /> Hardware
              </p>
            }
            key="3"
          >
            <div>Hardware</div>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <p>
                <FileProtectOutlined className="mr-1" /> Files
              </p>
            }
            key="4"
          >
            <FileAttachmentSectionV2 />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Inventory" key="5">
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
        <Drawer
          title="Report Details"
          placement="right"
          width={800}
          onClose={onCloseDrawer}
          visible={drawerVisible}
          closable={true}
        >
          <ExcelLikeCard /> {/* The Excel-like card component */}
        </Drawer>
      </div>
    </div>
  );
};

export default SitePage;
