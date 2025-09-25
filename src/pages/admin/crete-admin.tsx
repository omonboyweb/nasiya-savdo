import React from "react";
import type { FormProps } from "antd";
import { Button, Switch, Form, Input, Select } from "antd";
import { useCreateAdmin } from "../../config/useCreate";

type FieldType = {
  username?: string;
  password?: string;
  isActive?: boolean;
  role?: any;
  email?: string;
};

const CreateAdmin: React.FC = () => {
  const { mutate } = useCreateAdmin();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    const data = {
      username: values.username || "",
      password: values.password || "",
      isActive: values.isActive || false,
      role: values.role?.value,
      email: values.email || "",
    };
    mutate(data, {
      onSuccess: () => {
        console.log("succed");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input autoComplete="password" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Switch"
        valuePropName="checked"
        name="isActive"
        initialValue={false}
      >
        <Switch />
      </Form.Item>
      <Form.Item<FieldType>
        label="Select role"
        name="role"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Select<FieldType>
          labelInValue
          style={{ width: "100%" }}
          options={[
            {
              value: "ADMIN",
              label: "Admin",
            },
            {
              value: "STORE",
              label: "Store",
            },
            {
              value: "SUPER ADMIN",
              label: "Super admin",
            },
          ]}
        />
      </Form.Item>
      <Form.Item<FieldType>
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAdmin;
