"use client"; // Enables client-side rendering
import React from "react";
import {
  GoogleOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Typography, Carousel, message } from "antd";
import { useRouter } from "next/navigation"; // Use Next.js router

const { Title } = Typography;

const LoginForm: React.FC = () => {
  const router = useRouter(); // Replace useNavigate with useRouter
  const { Title, Paragraph } = Typography;
  const onFinish = (values: any) => {
    console.log("Login values: ", values);
    message.success("Logged in successfully!");

    // Navigate to dashboard or homepage after login
    router.push("/dashboard"); // Replace with desired route
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
    message.error("Please check the form for errors.");
  };
  const barStyle = (height: number, width: string): React.CSSProperties => ({
    height: `${height}px`,
    width: width,
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Ensure full page height to fix spacing
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          maxHeight: "700px",
          width: "100%",
        }}
      >
        {/* Left Form Section */}
        <div
          style={{
            flex: 1,
            padding: "70px", // Adjusted padding to align content
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            BizNest
          </div>
          <div style={{ textAlign: "left" }}>
            <Title level={1} style={{ marginBottom: "10px" }}>
              Keep your online business organized
            </Title>
          </div>
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#000",
              border: "1px solid #d9d9d9",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "45px",
              fontWeight: 500,
            }}
            block
            onClick={() => message.info("Google Sign-In not implemented yet.")}
          >
            <img
              src="/google.ico"
              style={{
                width: "20px", // Adjust width as needed
                height: "20px", // Adjust height as needed
                marginRight: "10px",
              }}
            />
            Login with Google
          </Button>

          <div style={{ display: "flex", alignItems: "center", margin: " 0" }}>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#ccc",
                marginRight: "10px",
              }}
            ></div>
            <span style={{ color: "#999", whiteSpace: "nowrap" }}>or</span>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#ccc",
                marginLeft: "10px",
              }}
            ></div>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  height: "45px",
                  backgroundColor: "#000",
                  borderRadius: "5px",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "left" }}>
            Don't have an account?{" "}
            <a onClick={() => router.push("/signup")}>
              <b>Sign up here</b>
            </a>{" "}
            {/* Navigate to signup */}
          </div>
        </div>
      </div>
    </div>
  );
};

const engagementChartStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  height: "110px",
  margin: "25px 0", // Adds spacing above and below the chart
  gap: "10px", // Controls the space between bars
  width: "100%", // Full width inside the container
  maxWidth: "300px", // Increased max width for a wider chart
};

const engagementBarStyle = (
  height: number,
  isTallest: boolean
): React.CSSProperties => ({
  width: "50px", // Wider bars
  height: `${height}%`,
  backgroundColor: isTallest ? "#7C4DFF" : "#C7A4FF", // Different color for tallest bar
  borderRadius: "5px",
});

const chartStyle = {
  display: "flex",
  alignItems: "flex-end",
  height: "125px",
  margin: "0 1px",
  gap: "10px",
};

const barStyle = (height: number, width: string) => ({
  height: `${height}px`,
  width: width,
});

// Define types for dotStyle function parameters
const dotStyle = (color: string) => ({
  height: "8px",
  width: "8px",
  backgroundColor: color,
  borderRadius: "50%",
  display: "inline-block",
  marginRight: "4px",
});

// Inline style for the line chart
const lineChartStyle = {
  marginTop: "20px",
  height: "80px", // Chart height
};

export default LoginForm;
