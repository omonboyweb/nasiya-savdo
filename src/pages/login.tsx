import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Layout, Typography, message } from "antd";
import logo from "../assets/logo.png";
import { client } from "../config/request";
import { setStorage } from "../store/local-storage";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate(); // ✅

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await client.post("/admin/signin", {
        username: values.username,
        password: values.password,
      });
      console.log(response.data);

      setStorage("access_token", response.data.data.token);
      message.success("Mufaqqiyatli qo'shildi");
      navigate("/admin", { replace: true });
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Login yoki parol noto‘g‘ri ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex justify="start" align="start" vertical>
        <img src={logo} alt="Logo" style={{ width: "60px" }} />
        <Title level={2}>Dasturga kirish</Title>
        <Typography className="login-description">
          Iltimos, tizimga kirish uchun login va parolingizni kiriting.
        </Typography>
      </Flex>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 600, minWidth: 390 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            style={{ padding: "10px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            style={{ padding: "10px" }}
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="end" align="center">
            <a href="#">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default App;
