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
            Basement
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

        {/* Right Carousel Section */}
        <div
          style={{
            flex: 1,
            padding: "100px",
            background:
              "linear-gradient(18deg, #c299ff, #c299ff,#c299ff, #ffffff, #ff69b4,  #c299ff,#c299ff, #ffffff, #ff69b4,#c299ff, #c299ff, #ffffff)",

            borderRadius: "8px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            position: "initial",
          }}
        >
          <Carousel
            autoplay
            autoplaySpeed={2000}
            dotPosition="right"
            slidesToShow={1} // Ensure only one slide is visible
            slidesToScroll={1}
            infinite
            adaptiveHeight // Adjusts height to fit the content
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #e0c3fc, #8ec5fc)", // Background gradient for page
              }}
            >
              <div
                style={{
                  padding: "20px",
                  textAlign: "left",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "10px",
                  maxWidth: "180px", // Consistent size
                  width: "100%",
                  maxHeight: "250px",
                  minHeight: "250px",
                  margin: "10px 100px", // Add subtle shadow
                }}
              >
                <p
                  style={{
                    color: "#000",
                    fontWeight: "30px",
                    fontSize: "14px",
                    marginBottom: "6px",
                    marginTop: "0",
                  }}
                >
                  ENGAGEMENT
                </p>
                <h1
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    margin: "0",
                    fontSize: "27px",
                  }}
                >
                  +78,12%{" "}
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    last month
                  </span>
                </h1>
                <p
                  style={{
                    color: "#000",
                    fontSize: "10px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    lineHeight: "1.2",
                  }}
                >
                  This significant increase in engagement rate highlights the
                  effectiveness of our recent strategies and content approach.
                </p>
                <div style={engagementChartStyle}>
                  <div style={engagementBarStyle(20, false)}></div>
                  <div style={engagementBarStyle(40, false)}></div>
                  <div style={engagementBarStyle(30, false)}></div>
                  <div style={engagementBarStyle(80, false)}></div>
                  <div style={engagementBarStyle(60, false)}></div>
                  <div style={engagementBarStyle(100, true)}></div>{" "}
                  {/* Tallest bar with different color */}
                </div>
              </div>
            </div>

            {/* Total Sales Card */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  textAlign: "left",
                  backgroundColor: "#C0C0C0",
                  borderRadius: "10px",
                  maxWidth: "180px", // Consistent size
                  width: "100%",
                  maxHeight: "250px",
                  minHeight: "250px",
                  margin: "10px 100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Ensure all content is evenly spaced
                }}
              >
                <p
                  style={{
                    color: "#000",
                    fontWeight: "30px",
                    fontSize: "14px",
                    marginBottom: "6px",
                    marginTop: "0",
                  }}
                >
                  TOTAL SALE
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Title
                    level={1}
                    style={{
                      color: "#000",
                      fontSize: "28px",
                      fontWeight: "bold",
                      margin: "0",
                    }}
                  >
                    $527.8K
                  </Title>

                  <div style={{ marginLeft: "3px", textAlign: "center" }}>
                    <div
                      style={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                        fontSize: "9px",
                        fontWeight: "bold",
                      }}
                    >
                      +32%
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#000",
                        marginTop: "2px",
                        padding: "0px",
                      }}
                    >
                      last month
                    </div>
                  </div>
                </div>

                <Paragraph
                  style={{
                    color: "#000",
                    fontSize: "10px",
                    marginTop: "1px",
                    marginBottom: "5px",
                    lineHeight: "1.2",
                  }}
                >
                  This amount of total sales highlights the effectiveness of our
                  recent strategies and content approach.
                </Paragraph>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "100px",
                    margin: "0 1px",
                    gap: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      ...barStyle(90, "60%"),
                      backgroundColor: "#f4f4f4",
                      borderRadius: "5px",
                    }}
                  ></div>
                  <div
                    style={{
                      ...barStyle(90, "20%"),
                      backgroundColor: "#f0fa2d", // Deep yellow version
                      borderRadius: "5px",
                    }}
                  ></div>
                  <div
                    style={{
                      ...barStyle(90, "20%"),
                      backgroundColor: "#a0d1f7",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>

                {/* Legend Section */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0", // Remove extra margins
                    padding: "0", // Remove padding for tighter alignment
                    color: "#000",
                    fontSize: "7px",
                  }}
                >
                  <div>
                    <span style={dotStyle("#f4f4f4")}></span>
                    <span>Social Media</span>
                  </div>
                  <div>
                    <span style={dotStyle("#f0fa2d")}></span>
                    <span>TV & Radio</span>
                  </div>
                  <div>
                    <span style={dotStyle("#a0d1f7")}></span>
                    <span>Billboards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  textAlign: "left",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "10px",
                  maxWidth: "180px", // Consistent size
                  width: "100%",
                  maxHeight: "250px",
                  minHeight: "250px",
                  margin: "10px 100px",
                }}
              >
                <Title
                  level={4}
                  style={{
                    color: "#000",
                    margin: "0 0 10px 0", // Remove extra space at the top
                    lineHeight: "1.4",
                    fontSize: "24px",
                  }}
                >
                  "Basement is surprisingly handy for keeping all my business
                  stuff in one place."
                </Title>
                <footer style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="https://via.placeholder.com/40"
                    alt="David Miller"
                    style={{ borderRadius: "50%", marginRight: "10px" }}
                  />
                  <div>
                    <Paragraph style={{ color: "#000", margin: "0" }}>
                      {" "}
                      {/* Set margin to 0 */}
                      <strong>David Miller</strong>
                    </Paragraph>
                    <Paragraph
                      style={{
                        color: "#000",
                        margin: "0",
                        whiteSpace: "nowrap", // Ensure text stays on one line
                        fontSize: "10px",
                      }}
                    >
                      E-commerce Specialist
                    </Paragraph>
                  </div>
                </footer>
              </div>
            </div>

            {/* Growth Card */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  textAlign: "left",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "10px",
                  maxWidth: "180px", // Consistent size
                  width: "100%",
                  maxHeight: "250px",
                  minHeight: "250px",
                  margin: "10px 100px",
                }}
              >
                <p
                  style={{
                    color: "#000",
                    fontWeight: "40px",
                    fontSize: "14px",
                    marginBottom: "6px",
                    marginTop: "0",
                  }}
                >
                  GROWTH
                </p>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <Title
                    level={1}
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      margin: "0",
                      color: "#000",
                    }}
                  >
                    +21,35%
                  </Title>
                  <span
                    style={{
                      fontSize: "9px",
                      marginLeft: "8px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    last month
                  </span>
                </div>
                <Paragraph
                  style={{
                    color: "#000",
                    fontSize: "10px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    lineHeight: "1.2",
                  }}
                >
                  This significant increase in growth highlights the
                  effectiveness of our recent strategies and content approach.
                </Paragraph>
                <div style={lineChartStyle}>
                  <svg width="100%" height="100%" viewBox="0 0 200 100">
                    <path
                      d="M0,80 C30,20 70,30 100,60 C130,90 170,70 200,20"
                      stroke="#000"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="200" cy="20" r="5" fill="#000" />{" "}
                    {/* Circle at the end of the path */}
                  </svg>
                </div>
              </div>
            </div>
          </Carousel>
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
