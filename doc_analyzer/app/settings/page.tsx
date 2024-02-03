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
import { useRouter } from 'next/navigation';
const { Search } = Input;


const App: React.FC = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/")
  }
  
  const goTerms = () => {
    router.push("/terms")
  }
  
  const goSupport = () => {
    router.push("/support")
  }
  
  const goPrivacy = () => {
    router.push("/privacy")
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
        <div style={{ marginLeft: '15px', fontSize: '1.2rem' }}>
          <ArrowLeftOutlined onClick={goHome} /> <span style={{ paddingLeft: '10px' }}>Settings</span>
        </div>
        <Toaster position="top-center" />
      </div>
      <div style={{
        position: 'absolute',
        top: '10%',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}>
        <div style={{
            margin: '10px',
            padding: '5%',
            color: 'black',
            textAlign: 'left',
            background: 'white',
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            lineHeight: '1.8em',
            boxShadow: '4px 4px 10px cornflowerblue'
            }}>
          <h3>Usage</h3>
          <p>User Documents: 10</p>
          <p>Total Conversations per day: 3</p>
          <p><i>Total Conversation Quota of 3 per day has been reached.</i></p>
        </div>
        <div style={{
            margin: '10px',
            padding: '5%',
            color: 'black',
            textAlign: 'left',
            background: 'white',
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            lineHeight: '1.8em',
            boxShadow: '4px 4px 10px cornflowerblue'
            }}>
          <h3>Information</h3>
          <p style={{margin: '3%'}} onClick={goTerms} >T&C</p>
          <hr />
          <p  style={{margin: '3%'}} onClick={goPrivacy} >Privacy</p>
          <hr />
          <p  style={{margin: '3%'}} onClick={goSupport} >Contact Support</p>
        </div>
      </div>
    </Layout >
  );
};

export default App;