// "use server";
import { Card, Table, Tag, Divider, Row, Col } from "antd";
import { Avatar } from "@radix-ui/themes";
import "../css/card.css";
import { PlusOutlined } from "@ant-design/icons";

const TaskCard = () => {
  return (
    <div
      className="mb-5"
      style={{ flexBasis: "90%", padding: "20px", height: "350px" }}
    >
      <Card
        style={{ width: "100%", height: "350px", float: "left" }}
        title={
          <div
            className="items-center font-left"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Avatar radius="full" fallback="SD" />
            <p className="ml-3 text-xl font-medium">My Tasks</p>
          </div>
        }
      >
        {/*<div className="cardLine cursor-pointer items-center">
          <PlusOutlined />
          <p className="text-sm p-2 font-small">Create Task</p>
        </div>
        <Divider></Divider>*/}
        <div>
          <Row gutter={[16, 24]}>
            <Col span={20}>Need wiring at Shanghai</Col>
            <Col span={4}>
              <Tag color="purple" className="rounded-lg">
                Demo Project 1
              </Tag>
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={[16, 24]}>
            <Col span={20}>Need wiring at China</Col>
            <Col span={4}>
              <Tag color="purple" className="rounded-lg">
                Demo Project 2
              </Tag>
            </Col>
          </Row>
          <Divider></Divider>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
