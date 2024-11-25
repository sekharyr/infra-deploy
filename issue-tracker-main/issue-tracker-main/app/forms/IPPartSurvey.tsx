import React, { useState } from "react";
import { Table, Input, InputNumber, Select, Popconfirm, Modal } from "antd";
import {
  DeleteOutlined,
  CloseOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const IPPartSurvey = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = dataSource.filter((item) =>
      Object.keys(item).some((key) =>
        item[key]?.toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
    } else {
      newData.push(row);
    }
    setDataSource(newData);
    setFilteredData(newData);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    setFilteredData(newData);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const renderEditableCell = (text, record, field) => {
    if (field === "qty") {
      return (
        <InputNumber
          min={0}
          defaultValue={text}
          onChange={(value) => handleSave({ ...record, [field]: value })}
        />
      );
    }
    if (field === "indoorOutdoor") {
      return (
        <Select
          defaultValue={text}
          onChange={(value) => handleSave({ ...record, [field]: value })}
          style={{ width: "100%" }}
        >
          <Option value="Indoor">Indoor</Option>
          <Option value="Outdoor">Outdoor</Option>
        </Select>
      );
    }
    return (
      <Input
        defaultValue={text}
        onChange={(e) => handleSave({ ...record, [field]: e.target.value })}
      />
    );
  };

  const columns = [
    {
      title: "Item No.",
      dataIndex: "itemNo",
      key: "itemNo",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Interface Type",
      dataIndex: "interfaceType",
      key: "interfaceType",
      render: (text, record) =>
        renderEditableCell(text, record, "interfaceType"),
    },
    {
      title: "Speed",
      dataIndex: "speed",
      key: "speed",
      render: (text, record) => renderEditableCell(text, record, "speed"),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (text, record) => renderEditableCell(text, record, "qty"),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (text, record) => renderEditableCell(text, record, "size"),
    },
    {
      title: "Indoor/Outdoor",
      dataIndex: "indoorOutdoor",
      key: "indoorOutdoor",
      render: (text, record) =>
        renderEditableCell(text, record, "indoorOutdoor"),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text, record) => renderEditableCell(text, record, "remarks"),
    },
    {
      title: "",
      key: "delete",
      width: 50,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <DeleteOutlined className="delete-icon" />
        </Popconfirm>
      ),
    },
  ];

  const handleAddNewRow = () => {
    const newRow = {
      key: count,
      itemNo: count,
      interfaceType: "",
      speed: "",
      qty: 0,
      size: "",
      indoorOutdoor: "",
      remarks: "",
    };
    setCount(count + 1);
    handleSave(newRow);
  };

  return (
    <div>
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: "bold", paddingLeft: 10 }}>
              IP Part Equipment Information
            </div>
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
              style={{ width: 200 }}
            />
            <ZoomInOutlined
              onClick={showModal}
              style={{ fontSize: 16, cursor: "pointer" }}
            />
          </div>
        )}
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowClassName="editable-row"
        bordered
        size="small"
        footer={() => (
          <div
            style={{
              cursor: "pointer",
              color: "blue",
              textAlign: "center",
              padding: 10,
            }}
            onClick={handleAddNewRow}
          >
            + Add New Item
          </div>
        )}
      />

      {/* Modal for Zoomed Table */}
      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width="80%"
        closeIcon={<CloseOutlined />}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ fontWeight: "bold" }}>Development Form</div>
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200 }}
          />
          <div
            style={{
              cursor: "pointer",
              color: "blue",
              textAlign: "center",
              padding: 10,
            }}
            onClick={handleAddNewRow}
          >
            + Add New Item
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowClassName="editable-row"
            bordered
            size="small"
            scroll={{ x: "100%" }}
          />
        </div>
      </Modal>

      {/* CSS for row hover effect and delete icon style */}
      <style>{`
        .editable-row:hover {
          background-color: #f5f5f5; /* Slightly highlight row on hover */
        }
        .delete-icon {
          color: red;
          font-size: 14px; /* Smaller delete icon size */
          display: none;
          cursor: pointer;
        }
        .editable-row:hover .delete-icon {
          display: inline;
        }
      `}</style>
    </div>
  );
};

export default IPPartSurvey;
