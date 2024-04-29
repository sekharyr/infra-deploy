import { Button, Card, Avatar, Row, Col } from "antd";
import ListIconSVG from "../components/ListIconSVG";
import "../css/card.css";

const ContributorCard = () => {
  const val = [
    {
      name: "Satyabrata Dash",
      src: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    },
    {
      name: "Mahesh Gowda",
      src: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    },
    {
      name: "P K Raju",
      src: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    },
  ];
  const contributors = [];
  for (let i = 0; i < val.length; i++) {
    contributors.push(
      <Col className="cardLine" span={12}>
        <Avatar src={val[i].src} size={40} />
        <p>{val[i].name}</p>
      </Col>
    );
  }
  return (
    <div style={{ flexBasis: "47%", margin: "20px", height: "350px" }}>
      <Card title="Contributors" bordered={false} style={{ height: "100%" }}>
        <Row gutter={[16, 24]}>{contributors}</Row>
      </Card>
    </div>
  );
};

export default ContributorCard;
