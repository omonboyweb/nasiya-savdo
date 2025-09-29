import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useCreateStore } from "../../config/useCreateStore";

type FieldType = {
  fullName?: string;
  password?: string;
  phoneNumber: string;
  role?: string;
  email?: string;
  wallet: number;
};

const CreateStore: React.FC = () => {
  const { mutate } = useCreateStore();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    const data = {
      fullName: values.fullName || "",
      password: values.password || "",
      phoneNumber: `+998${values.phoneNumber}` || "",
      role: "STORE",
      email: values.email || "",
      wallet: 0,
    };
    mutate(data, {
      onSuccess: () => {
        console.log("succed");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(data);
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
        name="fullName"
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
        label="Phone number"
        name="phoneNumber"
        rules={[
          { required: true, message: "Enter phone number" },
          { pattern: /^\d{9}$/, message: "9 xonali raqam kiriting" },
        ]}
      >
        <Input addonBefore="+998" maxLength={9} placeholder="901234567" />
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

export default CreateStore;

// {
//     "id": "9670e0f7-50d1-4718-91cc-aabe876e2dd4",
//     "createdAt": "2025-09-22T10:40:21.965Z",
//     "updatedAt": "2025-09-22T10:40:21.965Z",
//     "password": "$2b$07$P8sx0.Frl1EUAjJ9tKmIwOOZuSx3T8CoQpB9FU3BBH3DMRcYUBZde",  ////////////
//     "fullName": "sotuvchi sotucvchiyev",   ////
//     "wallet": "0",
//     "isActive": true,  //////
//     "phoneNumber": "+998901234567", ////////////
//     "isDeleted": false,
//     "role": "STORE", ////////////////
//     "email": "ssuhrobabdurazzoqov@gmail.com",  ////////////
//     "otpCode": null,
//     "otpExpiresAt": null
// },
