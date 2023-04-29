import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Menu } from "antd";
import { useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("客户管理", "user", <UserOutlined />),
  getItem("客房管理", "sub", <TeamOutlined />, [
    getItem("Team 1", "sub/page1"),
    getItem("Team 2", "sub/page2"),
  ]),
  getItem("客户统计", "statistics", <PieChartOutlined />),
];

function SideMenu() {
  const match = useMatch("/*").params["*"];
  const [selectKey, setSelectKey] = useState(match);
  const [openKey, setOpenKey] = useState(match.split("/")[0]);
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e.key);
    setSelectKey(e.key);
  };

  const handleOpenChange = (arr) => {
    setOpenKey(arr.at(-1));
  };

  useEffect(() => {
    if (match === "" || match === "info") {
      setSelectKey("");
      setOpenKey("");
    }
  }, [match]);
  return (
    <Menu
      theme="dark"
      mode="inline"
      items={items}
      selectedKeys={[selectKey]}
      openKeys={[openKey]}
      onClick={handleClick}
      onOpenChange={handleOpenChange}
    />
  );
}

export default SideMenu;
