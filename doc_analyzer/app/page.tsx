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
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  

  const history: Array<string> = [
    "iterate, add it",
    "Data Pipeline",
    "Full Stack Developer Requirements"
  ]

  const [messages, setMessages] = useState([
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
  ]);

const onSearch: SearchProps['onSearch'] = (value, _e, info) => {console.log(info?.source, value); messages.push( {
  "user": "Riyan",
  "message": value
}); setMessages(messages);};

  
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

      <Layout style={{ marginTop: '4rem' }}>
        <Sider
          style={{ overflow: 'auto', width: '200px', height: '100vh', position: 'fixed' }}
          hidden={collapsed}>
          <Menu history={history} />
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
          marginLeft: '20vw',
          marginRight: '20vw'
        }}>
          <ChatBox messages={messages} />
        </div>
      </Layout>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          zIndex: 1,
          paddingLeft: '20vw',
          width: '100%',
          paddingRight: '20vw',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Search
          style={{
            width: '90%',
          }}
          placeholder="input search text"
          enterButton="Search"
          size="large"
          suffix={suffix}
          onSearch={onSearch}
        />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </div>
    </Layout >
  );
};

export default App;