"use client";
import { Row, Card, Col, Button, Input, Modal, message } from "antd";
import { Avatar } from "@radix-ui/themes";
import { PlusCircleOutlined } from "@ant-design/icons";
import "../css/ProjectView.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // Assuming you are using Next.js for navigation
const { TextArea } = Input;

const SiteCard = ({ projectId }) => {
  const [siteId, setSiteId] = useState("");
  const [siteName, setSiteName] = useState("");
  const [region, setRegion] = useState("");
  const [open, setOpen] = useState(false); // Controls the visibility of the modal
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState<any[]>([]); // Store fetched sites
  const [searchText, setSearchText] = useState(""); // State for search text
  const [filteredSites, setFilteredSites] = useState<any[]>([]); // State for filtered sites

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

  return (
    <div>
      <Card
        title={<p className="text-xl mb-5 mt-3 font-medium">Sites</p>}
        extra={
          <Button
            type="primary"
            onClick={showModal}
            icon={<PlusCircleOutlined />}
          >
            Add Site
          </Button>
        }
        style={{ width: "100%", maxWidth: 800 }}
      >
        <Input
          placeholder="Search sites"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <div className="card-content">
          <Row gutter={[16, 24]}>
            {filteredSites.length ? (
              filteredSites.map((site) => (
                <Col className="gutter-row" span={8} key={site.siteId}>
                  <Link
                    href={{
                      pathname: `/siteView/${site.id}`,
                      query: { name: site.siteName },
                    }}
                  >
                    {/* <Link href={`/siteView/${site.id} pathHref`} > */}
                    <div className="project-roles">
                      <Avatar
                        radius="full"
                        fallback={site.siteName.substring(0, 2)}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "2px",
                        }}
                      >
                        <p className="text-sm font-medium">{site.siteName}</p>
                        <p className="text-xs font-light">{site.siteId}</p>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <p>No sites found</p>
              </Col>
            )}
          </Row>
        </div>
      </Card>

      {/* Modal for Adding Site */}
      <Modal
        open={open} // Controls visibility of modal
        title="Add Site"
        onCancel={handleCancel} // Cancel button handler
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
            value={siteId} // Controlled input
            onChange={onSiteIdChange}
            style={{ width: "95%" }}
          />
        </div>
        <div className="inviteModal mb-4">
          <Input
            placeholder="Site Name"
            value={siteName} // Controlled input
            onChange={onSiteNameChange}
            style={{ width: "95%" }}
          />
        </div>
        <div className="inviteModal mb-4">
          <Input
            placeholder="Site Region"
            value={region} // Controlled input
            onChange={onRegionChange}
            style={{ width: "95%" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SiteCard;
