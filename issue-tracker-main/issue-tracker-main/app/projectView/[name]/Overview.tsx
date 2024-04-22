import React from "react";
import { Input, Button, Tag } from "antd";
import "../../css/overview.css";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import PlusCircleOutlined from "../../icons/PlusCircleOutlined";
import FileAttachmentSection from "../../components/FileAttachmentSection";
import { Avatar } from "@radix-ui/themes";
import ProjectContributor from "./ProjectContributors";

const { TextArea } = Input;

const Overview = () => {
  let files = [
    "jhk.jpg",
    "hhui.jpg",
    "yt.jpg",
    "freak.jpg",
    "freak2.jpg",
    "speak.jpg",
    "spe.jpg",
  ];
  let contributors = [
    { name: "Satyabrata Dash", role: "Senior Developer", avatar: "SD" },
    { name: "Mahesh Gowda", role: "Manager", avatar: "MG" },
    { name: "Sekhar Yadavalli", role: "Manager", avatar: "SY" },
  ];
  return (
    <div className="overview-section">
      <div className="overview-left-section w-2/3">
        <p className="text-xl mb-5 font-medium">Description</p>
        <textarea
          className="border rounded-lg mb-5"
          rows="7"
          cols="110"
          placeholder="What's this project about.?"
        ></textarea>
        <br />
        <p className="text-xl mb-5 mt-3 font-medium">Project roles</p>
        <ProjectContributor contributors={contributors} />
        <p className="text-xl mb-5 mt-3 font-medium">Attachments</p>
        <div>
          {<FileAttachmentSection showFooter={true} attachedFiles={files} />}
        </div>
      </div>
      <div className="overview-right-section w-1/3">
        <div className="m-5">
          <p className="text-xl mb-5 font-medium">What's the status?</p>
          <Button color="red">On Track</Button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
