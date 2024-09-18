"use client";

import {
  Card,
  Col,
  Row,
  Button,
  Form,
  Input,
  Checkbox,
  InputNumber,
  Upload,
  Table,
  message,
  Collapse,
  Modal,
  DatePicker,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const { Panel } = Collapse;
const { TextArea } = Input;

interface BasicInfo {
  sharingSite?: boolean;
  siteOwner?: string;
  siteType?: string;
  latitude?: number;
  longitude?: number;
  towerType?: string;
  towerHeight?: number;
  city?: string;
  buildingHeight?: number;
  village?: string;
  siteArea?: number;
  typeOfPremises?: string;
  detailedAddress?: string;
}

interface SiteProps {
  site: {
    id: string;
    basicInfo: BasicInfo;
  };
}

const SiteBasicCard: React.FC<SiteProps> = ({ site }) => {
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [basicInfoEditing, setBasicInfoEditing] = useState(false);
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const [formBasicInfo] = Form.useForm();

  // Set initial state from site prop
  useEffect(() => {
    if (site.basicInfo) {
      setBasicInfo(site.basicInfo);
      formBasicInfo.setFieldsValue(site.basicInfo); // Initialize form fields
    }
  }, [site, formBasicInfo]);

  const saveChanges = async (section: string) => {
    try {
      const response = await axios.patch(`/api/sites/${site.id}`, {
        basicInfo: basicInfo,
      });
      if (response.status === 200) {
        message.success(`${section} updated successfully`);
      } else {
        message.error(`Failed to update ${section}`);
      }
    } catch (error) {
      message.error(`Failed to update ${section}.`);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (basicInfoEditing) {
      formBasicInfo.submit();
    }
    setBasicInfoEditing((prev) => !prev);
  };

  const handleCollapseChange = (key: string | string[]) => {
    setActiveKey(Array.isArray(key) ? key : [key]); // Update active panels
  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          <Collapse activeKey={activeKey} onChange={handleCollapseChange}>
            <Panel
              header="Basic Info"
              key="basicInfo"
              extra={
                activeKey.includes("basicInfo") && (
                  <Button onClick={(e) => handleEditClick(e)}>
                    {basicInfoEditing ? "Save" : "Edit"}
                  </Button>
                )
              }
            >
              <Form
                layout="vertical"
                onFinish={() => saveChanges("Basic Info")}
                form={formBasicInfo}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Sharing Site" name="sharingSite">
                      <Checkbox
                        checked={basicInfo?.sharingSite}
                        disabled={!basicInfoEditing}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            sharingSite: e.target.checked,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Site Owner" name="siteOwner">
                      <Input
                        value={basicInfo?.siteOwner}
                        disabled={!basicInfoEditing}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            siteOwner: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Site Type" name="siteType">
                      <Input
                        value={basicInfo?.siteType}
                        disabled={!basicInfoEditing}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            siteType: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Latitude" name="latitude">
                      <InputNumber
                        value={basicInfo?.latitude}
                        disabled={!basicInfoEditing}
                        onChange={(value) =>
                          setBasicInfo({ ...basicInfo, latitude: value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Longitude" name="longitude">
                      <InputNumber
                        value={basicInfo?.longitude}
                        disabled={!basicInfoEditing}
                        onChange={(value) =>
                          setBasicInfo({ ...basicInfo, longitude: value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Tower Type" name="towerType">
                      <Input
                        value={basicInfo?.towerType}
                        disabled={!basicInfoEditing}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            towerType: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Tower Height" name="towerHeight">
                      <InputNumber
                        value={basicInfo?.towerHeight}
                        disabled={!basicInfoEditing}
                        onChange={(value) =>
                          setBasicInfo({ ...basicInfo, towerHeight: value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="City" name="city">
                      <Input
                        value={basicInfo?.city}
                        disabled={!basicInfoEditing}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            city: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Building Height" name="buildingHeight">
                      <InputNumber
                        value={basicInfo?.buildingHeight}
                        disabled={!basicInfoEditing}
                        onChange={(value) =>
                          setBasicInfo({
                            ...basicInfo,
                            buildingHeight: value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Village" name="village">
                      <Input
                        value={basicInfo?.village}
                        disabled={!basicInfoEditing}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            village: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Site Area" name="siteArea">
                      <InputNumber
                        value={basicInfo?.siteArea}
                        disabled={!basicInfoEditing}
                        onChange={(value) =>
                          setBasicInfo({ ...basicInfo, siteArea: value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Type Of Premises" name="typeOfPremises">
                      <Input
                        value={basicInfo?.typeOfPremises}
                        disabled={!basicInfoEditing}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            typeOfPremises: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Detailed Address" name="detailedAddress">
                      <Input
                        value={basicInfo?.detailedAddress}
                        disabled={!basicInfoEditing}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            detailedAddress: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default SiteBasicCard;
