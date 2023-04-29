import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Space,
} from "antd";
import { useDispatch } from "react-redux";
import { fetchUsers, fetchUserById, updateUserById } from "@/store/usersSlice";
import { useEffect } from "react";

const { Option } = Select;

function EditUser({ open, setOpen, id }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // 发送更新user请求
    const { type } = await dispatch(
      updateUserById({ id, params: { data: values } })
    );
    messageApi.open({
      key: "addUser",
      type: "loading",
      content: "Loading...",
    });
    // 失败回调
    if (type.includes("rejected")) {
      messageApi.open({
        key: "addUser",
        type: "error",
        content: "This is an error message",
      });
    }
    // 成功回调
    else if (type.includes("fulfilled")) {
      messageApi
        .open({
          key: "addUser",
          type: "success",
          content: "This is a success message",
        })
        .then(() => {
          // 更新列表
          dispatch(fetchUsers());
        });
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const {
        payload: { data },
        type,
      } = await dispatch(fetchUserById(id));
      if (type.includes("fulfilled")) {
        form.setFieldsValue(data.attributes);
      }
    }
    fetchUser();
  }, []);

  return (
    <Drawer
      title="Edit"
      placement="right"
      closable={false}
      onClose={() => {
        form.resetFields();
        setOpen(false);
      }}
      open={open}
    >
      {contextHolder}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: false, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Race"
          name="race"
          rules={[{ required: false, message: "Please input your race!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditUser;
