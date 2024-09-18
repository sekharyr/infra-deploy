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
import { useState, useEffect, useRef } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
// import moment from "moment";

const { Panel } = Collapse;
const { TextArea } = Input;

interface SiteAccess {
  is24hrs?: boolean;
  contactPerson?: string;
  siteRegion?: string;
  phoneNo?: string;
  siteOwnership?: string;
  liftAvailability?: boolean;
  needKey?: boolean;
  accessRoad?: string;
  stairWidth?: number;
  doorSize?: number;
  possibleDifficulties?: string;
}

interface SiteProps {
  site: {
    id: string;
    siteAccessInfo: SiteAccess;
  };
}

const SiteAccessCard: React.FC<SiteProps> = ({ site }) => {
  const [siteAccess, setSiteAccess] = useState<SiteAccess | null>(null);
  const [siteAccessEditing, setSiteAccessEditing] = useState(false);
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const [formSiteAccess] = Form.useForm();

  // Set initial state from site prop
  useEffect(() => {
    if (site.siteAccessInfo) {
      setSiteAccess(site.siteAccessInfo);
      formSiteAccess.setFieldsValue(site.siteAccessInfo); // Initialize form fields
    }
  }, [site, formSiteAccess]);

  const saveChanges = async (section: string) => {
    try {
      const response = await axios.patch(`/api/sites/${site.id}`, {
        siteAccessInfo: siteAccess,
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
    if (siteAccessEditing) {
      formSiteAccess.submit();
    }
    setSiteAccessEditing((prev) => !prev);
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
              header="Site Access"
              key="siteAccess"
              extra={
                activeKey.includes("siteAccess") && (
                  <Button onClick={(e) => handleEditClick(e)}>
                    {siteAccessEditing ? "Save" : "Edit"}
                  </Button>
                )
              }
            >
              <Form
                layout="vertical"
                onFinish={() => saveChanges("Site Access")}
                form={formSiteAccess}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="24/7 Access">
                      <Checkbox
                        checked={siteAccess?.is24hrs}
                        disabled={!siteAccessEditing}
                        onChange={(e) =>
                          setSiteAccess({
                            ...siteAccess,
                            is24hrs: e.target.checked,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Contact Person">
                      <Input
                        value={siteAccess?.contactPerson}
                        disabled={!siteAccessEditing}
                        onChange={(e) =>
                          setSiteAccess({
                            ...siteAccess,
                            contactPerson: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Phone Number">
                      <Input
                        value={siteAccess?.phoneNo}
                        disabled={!siteAccessEditing}
                        onChange={(e) =>
                          setSiteAccess({
                            ...siteAccess,
                            phoneNo: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Site Ownership">
                      <Input
                        value={siteAccess?.siteOwnership}
                        disabled={!siteAccessEditing}
                        onChange={(e) =>
                          setSiteAccess({
                            ...siteAccess,
                            siteOwnership: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Lift Availability">
                      <Checkbox
                        checked={siteAccess?.liftAvailability}
                        disabled={!siteAccessEditing}
                        onChange={(e) =>
                          setSiteAccess({
                            ...siteAccess,
                            liftAvailability: e.target.checked,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Need Key">
                      <Checkbox
                        checked={siteAccess?.needKey}
                        disabled={!siteAccessEditing}
                        onChange={(e) =>
                          setSiteAccess({
                            ...siteAccess,
                            needKey: e.target.checked,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Access Road">
                      <Input
                        value={siteAccess?.accessRoad}
                        disabled={!siteAccessEditing}
                        onChange={(e) =>
                          setSiteAccess({
                            ...siteAccess,
                            accessRoad: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Stair Width (m)">
                      <InputNumber
                        value={siteAccess?.stairWidth}
                        disabled={!siteAccessEditing}
                        onChange={(value) =>
                          setSiteAccess({ ...siteAccess, stairWidth: value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Door Size (m)">
                      <InputNumber
                        value={siteAccess?.doorSize}
                        disabled={!siteAccessEditing}
                        onChange={(value) =>
                          setSiteAccess({ ...siteAccess, doorSize: value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Possible Difficulties">
                      <Input
                        value={siteAccess?.possibleDifficulties}
                        disabled={!siteAccessEditing}
                        onChange={(e) =>
                          setSiteAccess({
                            ...siteAccess,
                            possibleDifficulties: e.target.value,
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
export default SiteAccessCard;
