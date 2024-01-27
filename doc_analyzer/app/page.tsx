"use client";
import React, { useState  } from 'react';
import { Breadcrumb, Layout, message, theme } from 'antd';  
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

  const [messages, setMessages] = useState<Array<Info>>([
    {
      "user": "Bot",
      "hide": false,
      "message": "Hi User!, Thanks for uploading the doc. You can ask questions on the doc now ;)"
    },
  ]);
  const [summary, setSummary] = useState("")

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    // console.log(info?.source, value);
  
    if (hold) {
      return;
    }
  
    setInputValue('');
    setHold(true);
  
    // console.log(messages, summary);
  
    setMessages(prevMessages => [
      ...prevMessages,
      {
        user: "User",
        hide: false,
        message: value
      }
    ]);
  
    let conversationString = "";
  
    if (summary == null) {
      conversationString = messages.map(turn => `${turn.user}: ${turn.message}`).join('\n');
    } else {
      // Ensure correct handling of summary and last 5 messages
      const lastFiveMessages = messages.slice(-5).map(turn => `${turn.user}: ${turn.message}`).join('\n');
      conversationString = `${summary}\n${lastFiveMessages}`;
    }
  
    const result = await callGPT(`${conversationString}\nUser: ${value}`);
  
    setMessages(prevMessages => [
      ...prevMessages,
      {
        user: "Bot",
        hide: false,
        message: result
      }
    ]);
  
    if (messages.length >= 2) {
      // Correct handling of last 5 messages for creating a new summary
      const lastFiveMessages = messages.slice(-2).map(turn => `${turn.user}: ${turn.message}`).join('\n');
      const newSummary = await callGPT(`${summary || ''}\n${lastFiveMessages}\nUser: summarize this conversation so that it can be used in future for context`);
      setSummary(newSummary);
    }
  
    // console.log(messages, summary);
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
        {/* <Sider
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
        }} onClick={() => { setCollapsed(true) }} />} */}
        { messages.length == 1 ? (
        <div style={{
          overflow: 'auto',
          marginLeft: '20vw',
          marginRight: '20vw'
        }}>
          <NewChat setMessages={setMessages}/>
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