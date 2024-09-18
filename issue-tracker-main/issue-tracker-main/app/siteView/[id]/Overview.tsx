"use client";

import {
  Card,
  Col,
  Row,
  Button,
  Form,
  Input,
  Upload,
  message,
  Collapse,
  Image,
} from "antd";
import { useState, useEffect } from "react";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import SiteInfoCard from "./SiteInfoCard";
import SiteBasicCard from "./SiteBasicCard";
import SiteAccessCard from "./SiteAccessCard";
import EditableSurveyTable from "./SurveyTable";
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";

const { Panel } = Collapse;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Photos {
  siteCoordinates?: string;
  siteLocation?: string;
  buildingFloor?: string;
}

const Overview = ({ site }) => {
  const [photos, setPhotos] = useState<Photos>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`/api/sites/${site.id}`);
        console.log(response.data.sitePhotos);
        setFileList(response.data.sitePhotos);
      } catch (error) {
        message.error("Failed to load surveys");
        console.error(error);
      }
    };

    fetchPhotos();
  }, []);

  const handleUpload = (info: any, field: keyof Photos) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
      setPhotos({ ...photos, [field]: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Handle file removal (delete)
  const handleRemove = async (file: UploadFile) => {
    try {
      console.log("I am here");
      const fileToDelete = fileList.find((f) => f.name === file.name);

      if (fileToDelete?.id) {
        // Call API to delete the file using its ID
        const response = await axios.patch(`/api/sites/${site.id}`, {
          sitePhoto: {
            id: fileToDelete.id,
            name: fileToDelete.name, // Pass the file ID to be deleted
            delete: true,
          },
        });
        if (response.status === 200 || response.status === 201) {
          message.success("File deleted successfully");
        } else {
          message.error("Failed to delete file");
        }
      } else {
        message.error("File ID not found");
      }
    } catch (error) {
      message.error(`Failed to delete file. ${error}`);
      console.log(`Failed to delete file. ${error}`);
    }
  };

  const handleChange = async ({
    file,
    fileList,
  }: {
    file: any;
    fileList: any[];
  }) => {
    setFileList(fileList);

    if (file.status === "done") {
      // File uploaded successfully
      message.success(`${file.name} file uploaded successfullyyy`);

      // Store metadata
      try {
        console.log("I am here");
        const response = await axios.patch(`/api/sites/${site.id}`, {
          sitePhoto: {
            name: file.name,
            label: "site coordinates",
            url: file.response.url,
          },
        });
        if (response.status === 200 || response.status === 201) {
          message.success("File metadata stored successfully");
        } else {
          message.error("Failed to store file metadata.");
        }
      } catch (error) {
        message.error(`Failed to store file metadata. ${error}`);
        console.log(`Failed to store file metadata. ${error}`);
      }
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // const uploadUrl = `/sites/${site.id}/upload`; // Dynamic URL based on site ID

  return (
    <div>
      <Row gutter={24}>
        {/* Left Column - 75% */}
        <Col span={18}>
          <SiteInfoCard site={site} />
          <SiteBasicCard site={site} />
          <SiteAccessCard site={site} />
          <EditableSurveyTable site={site} />
        </Col>

        {/* Right Column - 25% */}
        <Col span={6}>
          <Collapse defaultActiveKey={["photos"]}>
            <Panel header="Photos" key="photos">
              {/* <Form layout="vertical">
                <Form.Item label="Site Coordinates">
                  <Upload
                    accept=".jpg,.png"
                    action={uploadUrl}
                    onChange={(info) => handleUpload(info, "siteCoordinates")}
                    showUploadList={false} // Optional: hide the default upload list
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item label="Site Location">
                  <Upload
                    accept=".jpg,.png"
                    action={uploadUrl}
                    onChange={(info) => handleUpload(info, "siteLocation")}
                    showUploadList={false} // Optional: hide the default upload list
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item label="Building Floor">
                  <Upload
                    accept=".jpg,.png"
                    action={uploadUrl}
                    onChange={(info) => handleUpload(info, "buildingFloor")}
                    showUploadList={false} // Optional: hide the default upload list
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Form> */}
              <Upload
                action={`http://localhost:3000/api/sites/${site.id}/upload`}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
