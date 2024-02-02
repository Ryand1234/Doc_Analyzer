"use client";
import React from 'react';
import { Layout} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';

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
        <div style={{ marginLeft: '15px', fontSize: '1.2rem' }}>
          <ArrowLeftOutlined onClick={goSettings} /> <span style={{ paddingLeft: '10px' }}>Privacy</span>
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
          <p>Some Privacy Related Information</p>
        </div>
      </div>
    </Layout >
  );
};

export default App;