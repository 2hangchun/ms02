import { Space, Table, Button, Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchUsers,
  selector as usersSelector,
  deleteUserById,
} from "@/store/usersSlice";
import AddUser from "@/Components/AddUser";
import EditUser from "@/Components/EditUser";
const { confirm } = Modal;

const handleData = (arr) => {
  return arr.map(({ id, attributes: { name, address, age, gender, race } }) => {
    return {
      key: id,
      id,
      name,
      address,
      age,
      gender,
      race,
    };
  });
};
const User = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  // 当前请求状态、请求获得的数据
  const { status, userList } = useSelector(usersSelector);

  const [selectId, setSelectId] = useState(null);
  // 控制添加用户的抽屉
  const [openAddPage, setOpenAddPage] = useState(false);
  // 控制编辑用户的抽屉
  const [openEditPage, setOpenEditPage] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Race",
      dataIndex: "race",
      key: "race",
    },
    {
      title: "Action",
      key: "action",
      render: (_, { id }) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectId(id);
              setOpenEditPage(true);
            }}
          >
            编辑
          </Button>
          <Button danger onClick={() => handleDelete(id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  let data;
  if (status === "succeeded") {
    data = handleData(userList);
  }

  const handleDelete = (id) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      okText: "确认",
      cancelText: "再考虑考虑",
      onOk: async () => {
        const { type } = await dispatch(deleteUserById(id));
        if (type.includes("rejected")) {
          messageApi.open({
            key: "addUser",
            type: "error",
            content: "Have an error message.",
          });
        } else if (type.includes("fulfilled")) {
          dispatch(fetchUsers());
        }
      },
      onCancel() {},
    });
  };

  const addUser = () => {
    setOpenAddPage(true);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <Button onClick={addUser}>添加</Button>
      <Table
        size="middle"
        columns={columns}
        dataSource={data}
        loading={status === "succeeded" ? false : true}
      />
      {openAddPage && <AddUser open={openAddPage} setOpen={setOpenAddPage} />}
      {openEditPage && (
        <EditUser open={openEditPage} setOpen={setOpenEditPage} id={selectId} />
      )}
    </>
  );
};
export default User;
