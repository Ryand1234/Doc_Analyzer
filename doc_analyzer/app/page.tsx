"use client";
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import NewConversation from './new-conversation';
import OldConversation from './old-converstation';

import { Layout } from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';
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
  
const router = useRouter();


const goSettings = () => {
  router.push("/settings")
}

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
          <BarsOutlined  onClick={goSettings} />
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