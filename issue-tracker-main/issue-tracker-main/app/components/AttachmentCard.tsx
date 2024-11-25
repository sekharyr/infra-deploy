"use client";

import {
  Divider,
  Col,
  Row,
  Input,
  Card,
  Button,
  Image,
  notification,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

// Define the type for the uploaded files
type FileAttachmentSectionProps = {
  attachedFiles: string[]; // This can be an array of file names or paths
  showFooter: boolean;
  submitFiles: (allFiles: File[], modifiedFiles: string[]) => void;
};

const AttachmentCard = (props: FileAttachmentSectionProps) => {
  const { attachedFiles } = props;
  const [files, setFiles] = useState<string[]>(attachedFiles || []); // State for the already attached files
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // State for newly uploaded files
  const [fileLabels, setFileLabels] = useState<string[]>([]); // State for labels associated with files
  const [modifiedFiles, setModifiedFiles] = useState<string[]>([]); // State for files that are deleted

  // Handle file deletion
  const deleteFile = (fileName: string) => {
    const updatedFiles = files.filter((file) => file !== fileName);
    setFiles(updatedFiles);

    // Update modified files list (files that are deleted)
    setModifiedFiles((prevState) => [...prevState, fileName]);
  };

  // Handle file selection from file input
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      // Convert FileList to an array and merge with previous uploaded files
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(selectedFiles), // This should work now as File[]
      ]);
      // Add empty labels for each new uploaded file
      setFileLabels((prevLabels) => [
        ...prevLabels,
        ...Array.from(selectedFiles).map(() => ""), // Initialize with empty labels
      ]);
    }
  };

  // Handle label change for a specific file
  const handleLabelChange = (index: number, value: string) => {
    const updatedLabels = [...fileLabels];
    updatedLabels[index] = value; // Update the label at the specified index
    setFileLabels(updatedLabels);
  };

  // Handle file submission (send all files)
  const submitFiles = () => {
    const allFiles = [...files, ...uploadedFiles.map((file) => file.name)]; // Combine old files and new ones (using file names)
    props.submitFiles(uploadedFiles, modifiedFiles); // Submit all files to parent
  };

  // Preview images or file names (for non-image files)
  const renderFilePreview = (file: File, index: number) => {
    if (file.type.startsWith("image/")) {
      return (
        <Image src={URL.createObjectURL(file)} width={100} alt={file.name} />
      );
    } else {
      return <span>{file.name}</span>;
    }
  };

  return (
    <Card
      title="Attachments"
      className="w-full min-h-32 cardLine mb-5 attachments-card scrollable"
    >
      <div className="flex-1 flex-row mb-5">
        {/* File input field */}
        <Input
          type="file"
          className="mb-5"
          multiple
          onChange={handleFileSelected}
        />

        {/* Display existing files with delete option */}
        <div className="existingFileSection">
          <Row gutter={[16, 24]}>
            {files.map((fileName, index) => (
              <Col className="gutter-row" span={8} key={index}>
                <div
                  style={{
                    background: "#f9f8f8",
                    padding: "8px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="ml-3">{fileName}</span>
                  <span
                    className="mr-2 cursor-pointer"
                    onClick={() => deleteFile(fileName)}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Display newly uploaded files with editable labels and previews */}
        <div className="uploadedFileSection">
          <Row gutter={[16, 24]}>
            {uploadedFiles.map((file, index) => (
              <Col className="gutter-row" span={8} key={index}>
                <div
                  style={{
                    background: "#f9f8f8",
                    padding: "8px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center", // Align label and file properly
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {renderFilePreview(file, index)}
                    <Input
                      value={fileLabels[index]} // Bind value to the corresponding label
                      onChange={(e) => handleLabelChange(index, e.target.value)} // Update label
                      style={{ width: "150px", marginLeft: "8px" }} // Adjust width of label input
                      placeholder="Enter label"
                    />
                  </div>
                  <span
                    className="mr-2 cursor-pointer"
                    onClick={() => {
                      const updatedFiles = [...uploadedFiles];
                      updatedFiles.splice(index, 1); // Remove the file from uploaded files
                      setUploadedFiles(updatedFiles);
                      setModifiedFiles((prevState) => [
                        ...prevState,
                        file.name,
                      ]); // Track the deleted file
                    }}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Submit files section */}
        {props.showFooter && (files.length > 0 || uploadedFiles.length > 0) && (
          <div className="float-right mt-5">
            <Button onClick={() => setFiles(attachedFiles)}>Cancel</Button>
            <Button
              type="primary"
              style={{ background: "#1677ff" }}
              onClick={submitFiles}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AttachmentCard;
