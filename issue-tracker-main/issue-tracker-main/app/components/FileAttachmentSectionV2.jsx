"use client";

import React from "react";
import Files from "react-files";
import { useState, useEffect } from "react";
import "../css/FileSection.css";
import { Row, Col } from "antd";

const FileAttachmentSectionV2 = () => {
  const [files, setFiles] = useState([]);
  const [elem, setElem] = useState([]);
  const handleChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileRemove = (fileId) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.id !== fileId)
    );
  };

  const handleClearFiles = () => {
    setFiles([]);
  };
  useEffect(() => {
    console.log("files is::", files);
    setElem([]);
    const temp = [];
    for (let i = 0; i < files.length; i++) {
      temp.push(
        <Col className="gutter-row" span={8}>
            <div className="displayFiles">
            <div className="files-list-item-preview">
            {files[i].preview.type === "image" ? (
              <img
                className="files-list-item-preview-image"
                src={files[i].preview.url}
              />
            ) : (
              <div className="files-list-item-preview-extension">
                {files[i].extension}
              </div>
            )}
          </div>
          <div>
          <div className="files-list-item-content">
            <div className="files-list-item-content-item files-list-item-content-item-1">
              {files[i].name}
            </div>
            <div className="files-list-item-content-item files-list-item-content-item-2">
              {files[i].sizeReadable}
            </div>
          </div>
          <div
            className="files-list-item-remove"
            onClick={() => handleFileRemove(files[i].id)}
          />
          </div>
            </div>
        </Col>
      );
    }
    setElem([...temp]);
  }, [files]);

  return (
    <div className="files">
      <Files
        className="files-dropzone-list"
        dragActiveClassName="files-dropzone-active"
        style={{ height: "100px" }}
        onChange={handleChange}
        multiple
        maxFiles={5}
        maxFileSize={10000000}
        minFileSize={0}
        clickable
      >
        Drop files here or click to upload
      </Files>
      {/*<button onClick={handleUploadFiles}>Upload</button>*/}
      {files.length > 0 && (
        <div className="files-list mt-5">
          <Row gutter={[16, 24]}>{elem}</Row>
        </div>
      )}
    </div>
  );
};

export default FileAttachmentSectionV2;
