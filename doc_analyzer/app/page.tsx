"use client";
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, theme } from 'antd';
import Menu from './layout/sidebar'
import ChatBox from './layout/chatbox';
const { Header, Content, Footer, Sider } = Layout;
import { Info } from './interface/chat-interface';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);


  const history: Array<string> = [
    "iterate, add it",
    "Data Pipeline",
    "Full Stack Developer Requirements"
  ]

  const messages: Array<Info> = [
    {
      "user": "Riyan",
      "message": "Hi"
    },
    {
      "user": "Bot",
      "message": "How I can help you?"
    },
    {
      "user": "Riyan",
      "message": "I have a question about programming."
    },
    {
      "user": "Bot",
      "message": "Sure, feel free to ask your question!"
    },
    {
      "user": "Riyan",
      "message": "What is the difference between JavaScript and Java?"
    },
    {
      "user": "Bot",
      "message": "JavaScript and Java are different programming languages. JavaScript is a scripting language used for web development, while Java is a general-purpose programming language. They have different use cases and syntax."
    },
  ]


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          overflow: 'scroll',
        }}
      >
        <Sider style={{
          position: 'fixed',
          height: '100vh',
          width: '10vw'
        }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu history={history} />
          {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
        </Sider>
        <Layout style={{
          overflow: 'visible',
          marginLeft: collapsed? '80px' : '200px'
        }}>
          <ChatBox messages={messages} />
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </div>
    </Layout>
  );
};

export default App;