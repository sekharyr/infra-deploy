import React from "react";
import { Input, Button, Tag } from "antd";
import "../../css/overview.css";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import PlusCircleOutlined from "../../icons/PlusCircleOutlined";
import FileAttachmentSection from "../../components/FileAttachmentSection";
import { Avatar } from "@radix-ui/themes";
import ProjectContributor from "./ProjectContributors";
import GoogleMapComponent from "@/app/components/GoogleMap";

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

  const invitePerson = (name) => {
    //This is a temporary method
    let temp = {};
    let splitName = name.split(" ");
    temp.avatar = splitName[0][0] + splitName[1][0];
    temp.name = name;
    temp.role = "Developer";
    contributors.push(temp);
  };

  const googleApiKey = process.env.GOOGLE_API_KEY;
  const initialCenter = { lat: 19.817743, lng: 85.828629 };
  const zoom = 10;

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
        <ProjectContributor
          contributors={contributors}
          //invitePerson={invitePerson}
        />
        <p className="text-xl mb-5 mt-3 font-medium">Attachments</p>
        <div>
          {<FileAttachmentSection showFooter={true} attachedFiles={files} />}
        </div>
      </div>
      <div className="overview-right-section w-1/3">
        <div className="m-5">
          <p className="text-xl mb-5 font-medium">Location</p>
          <GoogleMapComponent
            apiKey={googleApiKey}
            location={initialCenter}
            zoom={zoom}
          />
          <p className="text-xl mb-5 font-medium mt-5">What's the status?</p>
          <Button color="red">On Track</Button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
