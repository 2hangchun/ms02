import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { useState } from "react";
import { logout } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const items = [
  {
    label: "首页",
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "个人中心",
    key: "personal",
    icon: <UserOutlined />,
    children: [
      {
        label: "个人信息",
        key: "info",
      },
      {
        label: "修改密码",
        key: "modify",
      },
      {
        label: "登出",
        key: "logout",
      },
    ],
  },
];

function TopMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = (e) => {
    if (e.key === "logout") {
      setIsModalOpen(true);
    } else if (e.key === "home") {
      navigate("/");
    } else if (e.key === "info") {
      navigate("info");
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(logout());
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Menu
        style={{ justifyContent: "end" }}
        onClick={onClick}
        mode="horizontal"
        items={items}
        // triggerSubMenuAction={"click"}
        selectedKeys={[""]}
      />
      <Modal
        title="确定退出吗？"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

export default TopMenu;
