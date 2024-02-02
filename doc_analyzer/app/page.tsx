"use client";
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import NewConversation from './new-conversation';
import OldConversation from './old-converstation';

import { Layout, Button, message } from 'antd';
import ChatBox from './layout/chatbox';
import { Info } from './interface/chat-interface';
import { BarsOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import callGPT from './server/openrouter';
import NewChat from './layout/new-chat';
import { Toaster } from "react-hot-toast";
import { toast } from 'react-hot-toast';
const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'All Conversations',
    children: <OldConversation />
  },
  {
    key: '2',
    label: 'New Conversation',
    children: <NewConversation />,
  },
];
const App: React.FC = () => {
  return (

    <Layout>
      <div
        style={{
          position: 'fixed',
          top: 0,
          background: 'black',
          zIndex: 1,
          height: '10%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ marginLeft: '15px', fontSize: '1.5rem' }}>
          <a href="/information"><BarsOutlined /></a>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>Document AI</div>
        <div style={{ marginRight: '15px' }}>
          <UserOutlined />
        </div>
        <Toaster position="top-center" />
      </div>
      <div style={{
        top: '10%',
        position: 'absolute'
      }}>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </Layout>
  )
};

export default App;