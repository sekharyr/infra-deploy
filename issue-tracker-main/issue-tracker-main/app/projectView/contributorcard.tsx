import { Button, Card, Avatar } from "antd";
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
      <div className="cardLine">
        <Avatar src={val[i].src} size={40} />
        <p>{val[i].name}</p>
      </div>
    );
  }
  return (
    <div style={{ flexBasis: "40%", margin: "20px", height: "350px" }}>
      <Card title="Contributors" bordered={false} style={{ height: "100%" }}>
        {contributors}
      </Card>
    </div>
  );
};

export default ContributorCard;
