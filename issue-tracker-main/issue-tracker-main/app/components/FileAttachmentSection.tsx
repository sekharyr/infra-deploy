"use client";

import { Divider, Col, Row, Input, Card, Button, Flex } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const FileAttachmentSection = (props) => {
  const { attachedFiles } = props;
  const [files, setFiles] = useState(attachedFiles);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [modifiedFiles, setModifiedFiles] = useState([]);

  const elem = [];
  const deleteFile = (fileName) => {
    delete files[files.indexOf(fileName)];
    let filesModified = files.filter((val) => val != undefined);
    console.log("files modified is::", filesModified);
    setFiles(filesModified);
    modifiedFiles.push(fileName);
    setModifiedFiles(modifiedFiles);
  };

  const handleFileSelected = (e) => {
    setUploadedFiles(e.target && e.target.files);
  };

  const submitFiles = () => {
    props.submitFiles();
  };

  for (let i = 0; i < files.length; i++) {
    elem.push(
      <Col className="gutter-row" span={8}>
        <div
          style={{
            background: "#f9f8f8",
            padding: "8px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span className="ml-3">{files[i]}</span>
          <span
            className="mr-2 cursor-pointer"
            onClick={() => {
              deleteFile(files[i]);
            }}
          >
            <CloseOutlined />
          </span>
        </div>
      </Col>
    );
  }
  return (
    <Card className="w-full min-h-32 cardLine mb-5">
      <div className="flex-1 flex-row mb-5">
        <Input
          type="file"
          className="mb-5"
          multiple
          onChange={handleFileSelected}
        />
        <div className="existingFileSection">
          <Row gutter={[16, 24]}>{elem}</Row>
        </div>
        {props.showFooter && modifiedFiles.length ? (
          <Flex wrap="wrap" gap="small" className="float-right mt-5">
            <Button>Cancel</Button>
            <Button
              type="primary"
              style={{ background: "#1677ff" }}
              onClick={submitFiles}
            >
              Submit
            </Button>
          </Flex>
        ) : null}
      </div>
    </Card>
  );
};

export default FileAttachmentSection;
