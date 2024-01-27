"use client";
import React, { useState  } from 'react';
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
import callGPT from './server/openrouter';
import NewChat from './layout/new-chat';
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
  const [inputValue, setInputValue] = useState('')
  const [hold, setHold] = useState(false);
  

  const history: Array<string> = [
    "iterate, add it",
    "Data Pipeline",
    "Full Stack Developer Requirements"
  ]

  const [messages, setMessages] = useState([
    {
      "user": "Bot",
      "message": "Hi User!, Please Upload the doc that you want to summarize and ask questions on ;)"
    },
  ]);


const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {console.log(info?.source, value); 
  if(hold){
    return
  }
  setInputValue('');
  setHold(true);
  setMessages(prevMessages => [
  ...prevMessages,
  {
    user: "Riyan",
    message: value
  }
]);
  const result = await callGPT(value);
  setMessages(prevMessages => [
    ...prevMessages,
    {
      user: "Bot",
      message: result
    }
  ]);
  setHold(false);
};

  
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
        { messages.length == 1 ? (
        <div style={{
          overflow: 'auto',
          marginLeft: '20vw',
          marginRight: '20vw'
        }}>
          <NewChat />
        </div>) : (<div style={{
          overflow: 'auto',
          marginLeft: '20vw',
          marginRight: '20vw'
        }}>
          <ChatBox messages={messages} />
        </div>)}
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
            width: '100%',
          }}
          placeholder="input search text"
          enterButton="Search"
          size="large"
        value={inputValue}
        suffix={suffix}
          onSearch={onSearch}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </div>
    </Layout >
  );
};

export default App;