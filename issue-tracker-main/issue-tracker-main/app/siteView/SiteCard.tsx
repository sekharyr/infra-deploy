"use client";
import { Card, Input, Table, Button, Pagination, Modal, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import "../css/ProjectView.css";

const SiteCard = ({ projectId }) => {
  const [siteId, setSiteId] = useState("");
  const [siteName, setSiteName] = useState("");
  const [region, setRegion] = useState("");
  const [open, setOpen] = useState(false); // Controls the visibility of the modal
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState<any[]>([]); // Store fetched sites
  const [searchText, setSearchText] = useState(""); // State for search text
  const [filteredSites, setFilteredSites] = useState<any[]>([]); // State for filtered sites
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Fetch all sites on component mount
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(`/api/sites?projectId=${projectId}`); // Adjust the API endpoint if necessary
        setSites(response.data || []); // Set sites from API response
      } catch (error) {
        message.error("Failed to load sites.");
      }
    };

    fetchSites();
  }, [projectId]);

  useEffect(() => {
    setFilteredSites(
      sites.filter((site) =>
        site.siteName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, sites]);

  // Handle input change for Site Id
  const onSiteIdChange = (e: any) => {
    setSiteId(e.target.value);
  };

  // Handle input change for Site Name
  const onSiteNameChange = (e: any) => {
    setSiteName(e.target.value);
  };

  // Handle input change for Site Region
  const onRegionChange = (e: any) => {
    setRegion(e.target.value);
  };

  // Function to add site
  const onAddSite = async () => {
    if (!siteId || !siteName || !region) {
      message.error("Please fill in all fields!");
      return;
    }

    setLoading(true); // Show loading spinner
    try {
      // API POST request to add the site
      const response = await axios.post("/api/sites", {
        siteId: siteId,
        siteName: siteName,
        region: region,
        projectId: projectId, // Assuming params.id is the projectId
      });

      if (response.status === 201) {
        message.success("Site added successfully!");
        setSites([{ siteId, siteName, region }, ...sites]); // Add the new site to the list
        setFilteredSites([{ siteId, siteName, region }, ...sites]);
        setOpen(false); // Close the modal
        setSiteId(""); // Reset form fields
        setSiteName("");
        setRegion("");
      } else {
        message.error("Failed to add site");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Function to show modal
  const showModal = () => {
    setOpen(true); // Open the modal
  };

  // Function to close modal
  const handleCancel = () => {
    setOpen(false); // Close the modal
  };

  // Get current page's sites
  const paginatedSites = filteredSites.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Define columns for the table
  const columns = [
    {
      title: "Site Name",
      dataIndex: "siteName",
      key: "siteName",
      render: (text, site) => (
        <Link
          href={{
            pathname: `/siteView/${site.id}`,
            query: { name: site.siteName },
          }}
        >
          {site.siteName}
        </Link>
      ),
    },
    {
      title: "Site Id",
      dataIndex: "siteId",
      key: "siteId",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
  ];

  return (
    <Card
      title={
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusCircleOutlined />}
        >
          Add Site
        </Button>
      }
      loading={loading}
      extra={
        <Input
          placeholder="Search sites"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      }
      bordered={false}
      className="full-height-card"
    >
      <Table
        dataSource={paginatedSites}
        columns={columns}
        pagination={false}
        rowKey="siteId"
        size="small"
      />
      <div className="pagination-container" style={{ marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredSites.length}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["5", "10", "15"]}
        />
      </div>
      <Modal
        open={open}
        title="Add Site"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onAddSite}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="inviteModal mb-4">
          <Input
            placeholder="Site Id"
            value={siteId}
            onChange={onSiteIdChange}
            style={{ width: "95%" }}
          />
        </div>
        <div className="inviteModal mb-4">
          <Input
            placeholder="Site Name"
            value={siteName}
            onChange={onSiteNameChange}
            style={{ width: "95%" }}
          />
        </div>
        <div className="inviteModal mb-4">
          <Input
            placeholder="Site Region"
            value={region}
            onChange={onRegionChange}
            style={{ width: "95%" }}
          />
        </div>
      </Modal>
    </Card>
  );
};

export default SiteCard;
