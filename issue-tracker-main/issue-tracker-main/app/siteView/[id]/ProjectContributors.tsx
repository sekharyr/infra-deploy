"use client";

import { Avatar, Dialog, Button, TextField } from "@radix-ui/themes";
import "../../css/overview.css";
import { UserOutlined } from "@ant-design/icons";
import PlusCircleOutlined from "../../icons/PlusCircleOutlined";
import { Row, Col, Input } from "antd";
import { useState } from "react";

const ProjectContributor = (props) => {
  const [inputData, setInputData] = useState("");
  const { contributors } = props;

  const onInputChange = (e) => {
    setInputData(e.target.value);
  };

  const onInvite = () => {
    props.invitePerson(inputData);
  };

  const contributorList = [];
  for (let i = 0; i <= contributors.length; i++) {
    if (i == 0) {
      contributorList.push(
        <Col className="gutter-row" span={8}>
          <Dialog.Root>
            <Dialog.Trigger>
              <div className="project-roles cursor-pointer">
                <PlusCircleOutlined />
                <p className="text-sm p-2 font-medium">Add Member</p>
              </div>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Add Contributor</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Invite with email or by name
              </Dialog.Description>
              <div className="inviteModal mb-4">
                <Input
                  placeholder="Add members by name or email.."
                  onInput={onInputChange}
                  prefix={<UserOutlined />}
                  style={{ width: "80%" }}
                />
                <Button onClick={onInvite}>Invite</Button>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        </Col>
      );
    } else {
      contributorList.push(
        <Col className="gutter-row" span={8}>
          <div className="project-roles">
            <Avatar radius="full" fallback={contributors[i - 1].avatar} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "2px",
              }}
            >
              <p className="text-sm font-medium">{contributors[i - 1].name}</p>
              <p className="text-xs font-light">{contributors[i - 1].role}</p>
            </div>
          </div>
        </Col>
      );
    }
  }
  return (
    <div className="mb-5">
      <Row gutter={[16, 24]}>{contributorList}</Row>
    </div>
  );
};

export default ProjectContributor;
