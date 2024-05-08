"use client";
import { Button, Card, Row, Col, Input } from "antd";
import { Avatar, Dialog } from "@radix-ui/themes";
import Link from "next/link";
import ListIconSVG from "../components/ListIconSVG";
import "../css/card.css";
import CustomDropdown from "../components/CustomDropdown";
import { useState } from "react";
import projectOverviewDetails from "../constants/TempPayloadsFolder/projectOverviewDetails";
import PlusCircleOutlined from "../icons/PlusCircleOutlined";
import { union, filter, orderBy } from "lodash";

const ProjectCard = (props) => {
  const [projectNames, setProjectNames] = useState(
    projectOverviewDetails.projectNames.slice(0, 5)
  );
  const [inputData, setInputData] = useState("");
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const onInputChange = (e) => {
    setInputData(e.target.value);
  };

  const onAddProject = (e) => {
    projectNames.splice(0, 0, inputData);
    if (filterValue == "Recents") {
      setProjectNames(projectNames.slice(0, 5));
    } else {
      setProjectNames(projectNames);
    }
    setOpen(false);
  };

  const projects = [];
  for (let i = 0; i < projectNames.length; i++) {
    /*if (i == 0) {
      projects.push(
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger>
            <div className="cardLine cursor-pointer">
              <PlusCircleOutlined />
              <p className="text-sm p-2 font-medium">Add Project</p>
            </div>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Add Project</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Invite with email or by name
            </Dialog.Description>
            <div className="inviteModal mb-4">
              <Input
                placeholder="Add project by name.."
                onInput={onInputChange}
                style={{ width: "80%" }}
              />
              <Button onClick={onAddProject}>Add</Button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      );
    }*/

    projects.push(
      <Col className="cardLine" span={12}>
        <ListIconSVG />
        <Link
          href={{
            pathname: `/projectView/${projectNames[i]}`,
            query: {
              name: projectNames[i],
            },
          }}
        >
          <p className="projectName">{projectNames[i]}</p>
        </Link>
      </Col>
    );
  }
  return (
    <div style={{ flexBasis: "97%", margin: "20px", height: "350px" }}>
      <Card
        title="Projects"
        extra={
          <CustomDropdown
            defaultValue="Recents"
            constName="projectShowOptions"
            onSelect={(val) => {
              if (val == "All") {
                let tempprojectNames = union(
                  projectNames,
                  projectOverviewDetails.projectNames
                );
                console.log(tempprojectNames);
                setProjectNames(tempprojectNames);
              } else {
                setProjectNames(projectNames.slice(0, 5));
              }
              setFilterValue(val);
            }}
          />
        }
        bordered={false}
        style={{ height: "100%" }}
      >
        <Row gutter={[16, 24]}>{projects}</Row>
      </Card>
    </div>
  );
};

export default ProjectCard;
