import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, selector as userSelector } from "@/store/userSlice";

import "./index.css"; // 可以自定义的登录页面样式
import encipher from "@/utils/encipher";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { status, error } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // 事件处理
  const onFinish = (values) => {
    dispatch(
      login({
        identifier: values.username,
        password: encipher(values.password),
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };
  // Effects
  useEffect(() => {
    if (status === "succeeded") {
      messageApi
        .open({
          key: "login",
          type: "success",
          content: "Loaded!",
          duration: 2,
        })
        .then((res) => navigate("/", { replace: true }));
    } else if (status === "loading") {
      messageApi.open({
        key: "login",
        type: "loading",
        content: "Action in progress..",
      });
    } else if (status === "failed") {
      messageApi.open({
        key: "login",
        type: "error",
        content: error.message,
        duration: 2,
      });
    }
  }, [status, error]);
  return (
    <div className="login-container">
      {contextHolder}
      <Card title="Welcome" className="login-card">
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
