"use client"; //try

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Layout,
  Typography,
  Card,
  Tooltip,
  message,
} from "antd";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios"; // Ensure axios is imported

const { Header, Content } = Layout;
const { Title } = Typography;

interface Application {
  key: string;
  companyName: string;
  companyId: string;
  description: string;
  createdDate: string;
}

const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the token in localStorage
            },
          }
        );
        const applicationsWithKeys = response.data.map(
          (app: Application, index: number) => ({
            ...app,
            key: index + 1, // Adding a key based on the index for the table
          })
        );
        setApplications(applicationsWithKeys);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        message.error("Failed to load applications.");
      }
    };

    fetchApplications();
  }, []);

  const columns = [
    { title: "No.", dataIndex: "key", key: "key" },
    { title: "Company Name", dataIndex: "companyName", key: "companyName" },
    { title: "Company ID", dataIndex: "companyId", key: "companyId" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Created Date", dataIndex: "createdDate", key: "createdDate" },
  ];

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#001529",
          padding: "0 20px",
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          BizNest
        </Title>
        <Tooltip title="Logout">
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={() => {
              signOut(); // Log out the user
              router.push("/login"); // Navigate to the login page
            }}
          >
            Logout
          </Button>
        </Tooltip>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Tooltip title="Create a new application">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: "20px" }}
            onClick={() => router.push("/newapplication")}
          >
            New Application Form
          </Button>
        </Tooltip>

        <Card title="Application List" bordered={false}>
          <Table
            columns={columns}
            dataSource={applications}
            pagination={{ pageSize: 5 }}
            bordered
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            onRow={(record) => ({
              onClick: () => {
                console.log("Row clicked:", record);
              },
            })}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;
