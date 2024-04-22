import { Avatar } from "@radix-ui/themes";
import "../../css/overview.css";
import PlusCircleOutlined from "../../icons/PlusCircleOutlined";
import { Row, Col } from "antd";

const ProjectContributor = (props) => {
  const { contributors } = props;

  const contributorList = [];
  for (let i = 0; i <= contributors.length; i++) {
    if (i == 0) {
      contributorList.push(
        <Col className="gutter-row" span={8}>
          <div className="project-roles">
            <PlusCircleOutlined />
            <p className="text-sm p-2 font-medium">Add member</p>
          </div>
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
