"use client";
import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import Menu from './layout/sidebar'
import ChatBox from './layout/chatbox';
const { Header, Content, Footer, Sider } = Layout;
import { Info } from './interface/chat-interface';
import {
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';
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
    <Layout>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
      </Header>

      <Layout style={{ marginTop: '4rem', minHeight: '100vh' }}>
        <Sider
          style={{ overflow: 'auto', width: '200px', height: '100vh', position: 'fixed' }}
          hidden={collapsed}>
          {/* <div className="demo-logo-vertical" /> */}
          <Menu history={history} />
          {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
        </Sider>
        {collapsed ? <RightOutlined style={{
          color: 'black',
          position: 'fixed',
          top: '50%',
          marginLeft: collapsed ? '10px' : '210px'
        }} onClick={() => { setCollapsed(false) }} /> : <LeftOutlined style={{
          color: 'black',
          position: 'fixed',
          top: '50%',
          marginLeft: collapsed ? '80px' : '210px'
        }} onClick={() => { setCollapsed(true) }} />}
        <div style={{
          overflow: 'visible',
          marginLeft: '15vw',
          marginRight: '15vw'
        }}>
          <ChatBox messages={messages} />
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </div>
      </Layout>
    </Layout >
  );
};

export default App;