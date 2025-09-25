import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Layout, Typography, message } from "antd";
import logo from "../assets/logo.png";
import { client } from "../config/request";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { useAuth } from "../context/AuthProvider";

const { Title } = Typography;
type Values = { username: string; password: string };
const Login: React.FC = () => {
  const [form] = Form.useForm<Values>();
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccessRedirect = (role?: string) => {
    switch (role) {
      case "SUPER ADMIN":
        navigate("/super-admin", { replace: true });
        break;
      case "ADMIN":
        navigate("/admin", { replace: true });
        break;
      case "STORE":
        navigate("/store", { replace: true });
        break;
      default:
        navigate("/", { replace: true }); // fallback
    }
  };
  const onFinish = async (values: Values) => {
    setLoading(true);
    form.setFields([
      { name: "username", errors: [] },
      { name: "password", errors: [] },
    ]);
    try {
      const res = await client.post("/admin/signin", values);
      const token = res?.data?.data?.token;
      const user = res?.data?.data;
      if (!token) {
        message.error("Token topilmadi — server javobi notoʻgʻri.");
        setLoading(false);
        return;
      }
      console.log(res.data);

      login(token, user);
      message.success("Tizimga muvaffaqiyatli kirildi");
      handleSuccessRedirect(user?.role);
    } catch (err) {
      const error = err as AxiosError<any>;
      const status = error.response?.status;
      const data = error.response?.data;
      if (status === 422 && data.errors) {
        const fields = Object.entries(data.errors).map(([name, msgs]: any) => ({
          name,
          errors: Array.isArray(msgs) ? msgs : [String(msgs)],
        }));
        form.setFields(fields);
        message.error("Iltimos xatoliklarni toʻgʻirlang.");
      } else if (status === 401 || status === 403) {
        form.setFields([
          { name: "username", errors: ["Login yoki parol noto‘g‘ri"] },
          { name: "password", errors: ["Login yoki parol noto‘g‘ri"] },
        ]);
        message.error("Login yoki parol noto'g'ri");
      } else {
        const msg =
          data?.message || "Server bilan aloqa vaqtida xatolik yuz berdi";
        message.error(msg);
      }
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
        form={form}
        name="login"
        style={{ maxWidth: 600, minWidth: 390 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username kiritilishi shart" }]}
        >
          <Input
            prefix={<UserOutlined />}
            autoComplete="username"
            placeholder="Username"
            style={{ padding: "10px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            autoComplete="current-password"
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

export default Login;
