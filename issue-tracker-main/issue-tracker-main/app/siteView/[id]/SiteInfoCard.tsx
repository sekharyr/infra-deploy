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

interface SiteInfo {
  siteName?: string;
  siteId?: string;
  region?: string;
}

interface SiteProps {
  site: {
    id: string;
    siteName?: string;
    siteId?: string;
    region?: string;
  };
}

const SiteInfoCard: React.FC<SiteProps> = ({ site }) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [siteInfoEditing, setSiteInfoEditing] = useState(false);
  const [activeKey, setActiveKey] = useState<string[]>(["siteInfo"]);
  const [formSiteInfo] = Form.useForm();

  // Set initial state from site prop
  useEffect(() => {
    if (site.siteName || site.siteId || site.region) {
      setSiteInfo({
        siteName: site.siteName,
        siteId: site.siteId,
        region: site.region,
      });
      formSiteInfo.setFieldsValue(siteInfo); // Initialize form fields
    }
  }, [site, formSiteInfo]);

  const saveChanges = async (section: string) => {
    try {
      const response = await axios.patch(`/api/sites/${site.id}`, {
        siteId: siteInfo?.siteId,
        siteName: siteInfo?.siteName,
        region: siteInfo?.region,
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
    if (siteInfoEditing) {
      formSiteInfo.submit();
    }
    setSiteInfoEditing((prev) => !prev);
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
              header="Site Info"
              key="siteInfo"
              extra={
                activeKey.includes("siteInfo") && (
                  <Button onClick={(e) => handleEditClick(e)}>
                    {siteInfoEditing ? "Save" : "Edit"}
                  </Button>
                )
              }
            >
              <Form
                layout="vertical"
                onFinish={() => saveChanges("Site Info")}
                form={formSiteInfo}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Site Name">
                      <Input
                        value={siteInfo?.siteName}
                        disabled={!siteInfoEditing}
                        onChange={(e) =>
                          setSiteInfo({
                            ...siteInfo,
                            siteName: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Site ID">
                      <Input
                        value={siteInfo?.siteId}
                        disabled={!siteInfoEditing}
                        onChange={(e) =>
                          setSiteInfo({ ...siteInfo, siteId: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Region">
                      <Input
                        value={siteInfo?.region}
                        disabled={!siteInfoEditing}
                        onChange={(e) =>
                          setSiteInfo({ ...siteInfo, region: e.target.value })
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

export default SiteInfoCard;
