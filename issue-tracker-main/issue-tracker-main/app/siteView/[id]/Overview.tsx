"use client";

import { Button, Upload, message, Collapse, Image } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
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

  const handleRemove = async (file: UploadFile) => {
    try {
      const fileToDelete = fileList.find((f) => f.name === file.name);

      if (fileToDelete?.id) {
        const response = await axios.patch(`/api/sites/${site.id}`, {
          sitePhoto: {
            id: fileToDelete.id,
            name: fileToDelete.name,
            delete: true,
          },
        });
        if (response.status === 200 || response.status === 201) {
          message.success("File deleted successfully");
          setFileList(fileList.filter((f) => f.name !== file.name));
        } else {
          message.error("Failed to delete file");
        }
      } else {
        message.error("File ID not found");
      }
    } catch (error) {
      message.error(`Failed to delete file. ${error}`);
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
      message.success(`${file.name} file uploaded successfully`);

      try {
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

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Left Column - Main Content */}
      <div
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <SiteInfoCard site={site} />
        <SiteBasicCard site={site} />
        <SiteAccessCard site={site} />
        <EditableSurveyTable site={site} />
      </div>

      {/* Right Column - Photos */}
      <div style={{ flex: 1 }}>
        <Collapse defaultActiveKey={["photos"]}>
          <Panel header="Photos" key="photos">
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
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default Overview;
