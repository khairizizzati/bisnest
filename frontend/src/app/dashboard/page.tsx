"use client"; //try

import React, { useEffect, useState } from "react";
import { Table, Button, Layout, Typography, Card, Tooltip } from "antd";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation"; // Ensure you're using the correct router
import { signOut } from "next-auth/react"; // Import signOut

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
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setApplications([
      {
        key: "1",
        companyName: "Tech Innovations",
        companyId: "TIN123",
        description: "Innovative tech solutions.",
        createdDate: "2024-10-01",
      },
      {
        key: "2",
        companyName: "Green Energy Corp",
        companyId: "GEC456",
        description: "Sustainable energy solutions.",
        createdDate: "2024-10-02",
      },
      {
        key: "3",
        companyName: "HealthCare Solutions",
        companyId: "HCS789",
        description: "Revolutionizing healthcare.",
        createdDate: "2024-10-03",
      },
      {
        key: "4",
        companyName: "EduTech Services",
        companyId: "ETS101",
        description: "Educational technology platforms.",
        createdDate: "2024-10-04",
      },
      {
        key: "5",
        companyName: "Financial Advisors Inc.",
        companyId: "FAI112",
        description: "Expert financial advice.",
        createdDate: "2024-10-05",
      },
      {
        key: "6",
        companyName: "Retail Solutions",
        companyId: "RS131",
        description: "E-commerce solutions for retailers.",
        createdDate: "2024-10-06",
      },
      {
        key: "7",
        companyName: "Travel Global",
        companyId: "TG415",
        description: "Global travel services.",
        createdDate: "2024-10-07",
      },
      {
        key: "8",
        companyName: "Foodie Delights",
        companyId: "FD161",
        description: "Gourmet food delivery services.",
        createdDate: "2024-10-08",
      },
      {
        key: "9",
        companyName: "Smart Home Solutions",
        companyId: "SHS718",
        description: "Home automation solutions.",
        createdDate: "2024-10-09",
      },
      {
        key: "10",
        companyName: "Cyber Security Experts",
        companyId: "CSE192",
        description: "Protecting your digital assets.",
        createdDate: "2024-10-10",
      },
    ]);
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
            } // Optional: Add custom class for alternating row colors
            onRow={(record) => ({
              onClick: () => {
                // Optional: Handle row click
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
