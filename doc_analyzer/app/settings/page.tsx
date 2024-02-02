"use client";
import React, { useState } from 'react';
import { Layout, Button, message } from 'antd';
import ChatBox from '../layout/chatbox';
import Card from '../layout/card';
const { Header } = Layout;
import { Info } from '../interface/chat-interface';
import { ArrowLeftOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import callGPT from '../server/openrouter';
import NewChat from '../layout/new-chat';
import { Toaster } from "react-hot-toast";
import { toast } from 'react-hot-toast';
const { Search } = Input;


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
       <div style={{ marginLeft: '15px', fontSize: '1.2rem' }}>
          <a href="/"><ArrowLeftOutlined /></a>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>Document AI</div>
        <Toaster position="top-center" />
      </div>
      <div style={{

      }}>
        <div>T&C</div>
        <div>Privacy</div>
      </div>
    </Layout >
  );
};

export default App;