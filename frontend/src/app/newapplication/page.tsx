"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Form, Input, Button, Select, message, Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios"; // Make sure to install axios if you haven't already

const { Option } = Select;

interface FormValues {
  companyName: string;
  companyId: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  country: string;
  state: string;
  city: string;
  postcode: string;
  description: string;
}

const ApplicationForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter(); // Inisialisasi useRouter

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);
    try {
      await axios.post("http://localhost:5000/api/submit", values); // Hantar ke backend
      message.success("Application submitted successfully!");
      form.resetFields(); // Reset borang selepas berjaya
    } catch (error) {
      console.error("Submission error:", error);
      message.error("Failed to submit application.");
    }
  };

  // Fungsi untuk menangani klik butang Batal
  const handleCancel = () => {
    // Navigasi kembali ke halaman utama atau halaman lain
    router.push("/"); // Ganti '/' dengan path yang diinginkan
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: "center" }}>Application Form</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[
                { required: true, message: "Please enter your company name!" },
              ]}
            >
              <Input
                prefix={<InfoCircleOutlined />}
                placeholder="Enter company name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="companyId"
              label="Company ID"
              rules={[
                { required: true, message: "Please enter your company ID!" },
              ]}
            >
              <Input
                prefix={<InfoCircleOutlined />}
                placeholder="Enter company ID"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="addressLine1"
          label="Address Line 1"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter address line 1" />
        </Form.Item>

        <Form.Item name="addressLine2" label="Address Line 2">
          <Input placeholder="Enter address line 2" />
        </Form.Item>

        <Form.Item name="addressLine3" label="Address Line 3">
          <Input placeholder="Enter address line 3" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="country"
              label="Country"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select placeholder="Select your country">
                <Option value="MALAYSIA">MALAYSIA</Option>
                {/* Add more countries as needed */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Please enter your state!" }]}
            >
              <Input placeholder="Enter state" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please enter your city!" }]}
            >
              <Input placeholder="Enter city" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="postcode"
              label="Postcode"
              rules={[
                { required: true, message: "Please enter your postcode!" },
              ]}
            >
              <Input placeholder="Enter postcode" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "48%", marginRight: "4%" }}
          >
            Submit
          </Button>
          <Button
            type="default"
            onClick={handleCancel}
            style={{ width: "48%" }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Styles
const formStyle: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#f0f2f5", // Light gray background
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px", // Set a maximum width
  margin: "0 auto", // Center the form
};

export default ApplicationForm;
