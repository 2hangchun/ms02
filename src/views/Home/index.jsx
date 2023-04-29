import { Layout, theme } from "antd";
import { useState } from "react";
import SideMenu from "@/Components/SideMenu";
import TopMenu from "@/Components/TopMenu";
import { Outlet, useMatch } from "react-router-dom";
import "./index.scss";

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const match = useMatch("/*").params["*"];
  const [current, setCurrent] = useState(match);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            lineHeight: "32px",
            color: "#ccc",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          {collapsed ? <h2>Hotel</h2> : <h2>H o t e l</h2>}
        </div>
        <SideMenu />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <TopMenu />
        </Header>
        <Content
          style={{
            margin: "16px 16px 0",
            padding: " 16px",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
