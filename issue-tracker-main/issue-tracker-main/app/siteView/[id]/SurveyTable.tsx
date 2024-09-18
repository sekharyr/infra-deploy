import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  message,
  Collapse,
  Space,
  Col,
  Row,
} from "antd";
import axios from "axios";
import moment from "moment";

const { Panel } = Collapse;

interface Survey {
  surveyId: string;
  surveyorName?: string;
  surveyorType?: string;
  date?: string;
  phoneNo?: string;
  remark?: string;
}

interface SiteProps {
  site: {
    id: string;
    surveys: Survey[];
  };
}

const EditableSurveyTable: React.FC<SiteProps> = ({ site }) => {
  const [dataSource, setDataSource] = useState<Survey[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`/api/sites/${site.id}`);
        console.log(response.data.surveys);
        setDataSource(response.data.surveys);
      } catch (error) {
        message.error("Failed to load surveys");
        console.error(error);
      }
    };

    fetchSurveys();
  }, []);

  const getSurveys = async () => {
    try {
      const response = await axios.get(`/api/sites/${site.id}`);
      console.log(response.data.surveys);
      setDataSource(response.data.surveys);
    } catch (error) {
      message.error("Failed to load surveys");
      console.error(error);
    }
  };

  const showModal = (survey = null) => {
    if (survey) {
      form.setFieldsValue({
        ...survey,
        // Parse the date to the appropriate format for display in the date picker/input
        date: survey.date ? moment(survey.date) : null,
      });
    } else {
      form.resetFields();
    }
    setCurrentSurvey(survey);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Format the date if it exists
      const formattedDate = values.date
        ? values.date.format("YYYY-MM-DD") // Format the date to 'YYYY-MM-DD'
        : null;

      if (currentSurvey) {
        const newSurvey = {
          ...values,
          date: formattedDate,
          surveyId: currentSurvey.surveyId,
        };
        const response = await axios.patch(`/api/sites/${site.id}`, {
          survey: newSurvey,
        });
        if (response.status === 200 || response.status === 201) {
          message.success("Survey saved successfully");
          getSurveys(); // Re-fetch updated surveys
          setIsModalVisible(false);
        } else {
          message.error("Failed to save survey");
        }
      } else {
        const newSurvey = {
          ...values,
          date: formattedDate,
        };
        const response = await axios.patch(`/api/sites/${site.id}`, {
          survey: newSurvey,
        });
        if (response.status === 200 || response.status === 201) {
          message.success("Survey saved successfully");
          getSurveys(); // Re-fetch updated surveys
          setIsModalVisible(false);
        } else {
          message.error("Failed to save survey");
        }
      }
    } catch (error) {
      message.error("Failed to save survey");
      console.error(error);
    }
  };

  const handleDelete = async (survey: Survey | null = null) => {
    try {
      const newSurvey = {
        ...survey,
        delete: true,
      };
      const response = await axios.patch(`/api/sites/${site.id}`, {
        survey: newSurvey,
      });
      if (response.status === 200 || response.status === 201) {
        message.success("Survey deleted successfully");
        setDataSource((prevDataSource) =>
          prevDataSource.filter(
            (survey) => survey.surveyId !== newSurvey.surveyId
          )
        );
        setIsModalVisible(false);
      } else {
        message.error("Failed to delete survey");
      }
    } catch (error) {
      message.error("Failed to delete survey");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "surveyorName",
      width: "20%",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "surveyorType",
      width: "20%",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "20%",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phoneNo",
      width: "20%",
      editable: true,
    },
    {
      title: "Remarks",
      dataIndex: "remark",
      width: "20%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record: Survey) => (
        <div>
          {/* Edit button with icon */}
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            type="link"
          />
          {/* Delete button with confirmation and icon */}
          <Popconfirm
            title="Are you sure to delete this survey?"
            onConfirm={() => handleDelete(record)}
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          <Collapse defaultActiveKey={[]}>
            <Panel header="Survey Table" key="1">
              <Button
                onClick={() => showModal()}
                type="primary"
                style={{ marginBottom: 16 }}
              >
                Add Survey
              </Button>
              <Table
                bordered
                dataSource={dataSource}
                columns={columns}
                rowKey="key"
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <Modal
        title={currentSurvey ? "Edit Survey" : "Add Survey"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="surveyorName"
            label="Name"
            rules={[
              { required: true, message: "Please input the surveyor's name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="surveyorType"
            label="Type"
            rules={[
              { required: true, message: "Please input the surveyor's type!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please input the date!" }]}
          >
            {/* Use DatePicker for better date input */}
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="phoneNo"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="remark" label="Remark">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditableSurveyTable;
