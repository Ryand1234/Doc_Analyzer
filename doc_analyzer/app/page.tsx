"use client";
import React, { useState } from 'react';
import NewConversation from './new-conversation';
import OldConversation from './old-converstation';

import { Layout } from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';
const App: React.FC = () => {

  const router = useRouter();


  const goSettings = () => {
    router.push("/settings")
  }
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabChange = (tabNumber: number) => {
    setSelectedTab(tabNumber);
  };

  const setConvo = (convo: string) => {
    console.log('Set convo:', convo)
    localStorage.setItem('current-conversation', convo);
    setSelectedTab(2);
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
          <BarsOutlined onClick={goSettings} />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>Document AI</div>
        <div style={{ marginRight: '15px' }}>
          <UserOutlined />
        </div>
        <Toaster position="top-center" />
      </div>
      <div style={{
        top: '10%',
        position: 'absolute',
        width: '100%',
      }}>

        <div style={{
          color: 'black',
          justifyContent: 'space-around',
          display: 'flex'
        }}>
          <button className={selectedTab === 1 ? 'selected-tab' : 'not-selected-tab'} onClick={() => handleTabChange(1)}>All Conversations</button>
          <button className={selectedTab === 2 ? 'selected-tab' : 'not-selected-tab'} onClick={() => handleTabChange(2)}>New Conversations</button>
        </div>
        {selectedTab === 1 ? <OldConversation setConversationId={setConvo} /> : <NewConversation />}
      </div>
    </Layout>
  )
};

export default App;