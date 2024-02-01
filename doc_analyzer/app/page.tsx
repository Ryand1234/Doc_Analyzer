"use client";
import React, { useState } from 'react';
import { Layout, Button, message } from 'antd';
import ChatBox from './layout/chatbox';
import Card from './layout/card';
const { Header } = Layout;
import { Info } from './interface/chat-interface';
import { BarsOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import callGPT from './server/openrouter';
import NewChat from './layout/new-chat';
import { Toaster } from "react-hot-toast";
import { toast } from 'react-hot-toast';
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

  const newConversation = () => {
    setMessages([
      {
        "user": "Bot",
        "hide": false,
        "message": "Hi User!, Thanks for uploading the doc. You can ask questions on the doc now ;)"
      }
    ])
    setSummary("");
    toast.success('New Conversation Started!');
  }


  const resetConversation = () => {
    setMessages([
      {
        "user": "Bot",
        "hide": false,
        "message": "Hi User!, Thanks for uploading the doc. You can ask questions on the doc now ;)"
      },
      {
        "user": "User",
        "hide": true,
        "message": messages[1].message
      }
    ])
    setSummary("");
    toast.success('Conversation Restarted!');
  }


  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    // console.log(info?.source, value);
    if (hold) {
      return;
    }
    try {
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
      setMessages(prevMessages => [
        ...prevMessages,
        {
          user: "Bot",
          hide: false,
          message: "Bot is analyzing your message. Please give him a little time."
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

      let result = await callGPT(conversationString, value);
      let lines = result.split('\n');
      lines.pop();
      lines.shift();
      result = lines.join('\n')
      result = result.split('Question:');
      console.log(result)
      if(result.length > 1) {
        result = result[0]
      }
      setMessages(prevMessages => {
        const lastMessageIndex = prevMessages.length - 1;
        const updatedMessages = [...prevMessages];

        // Update the last message
        updatedMessages[lastMessageIndex] = {
          user: "Bot",
          hide: false,
          message: result
        };
        return updatedMessages;
      });
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setHold(false);
      console.log(messages)
    }

    if (messages.length >= 5) {
      // Correct handling of last 5 messages for creating a new summary
      const lastFiveMessages = messages.slice(-5).map(turn => `${turn.user}: ${turn.message}`).join('\n');
      let originalContext = '';
      if (messages.length % 5 == 0) {
        console.log(messages)
        originalContext = (messages[1].hide) ? `Original Document Content: ${messages[1].message}` : '';
      }
      const summaryContext = `${originalContext}\nCurrent Summary: ${summary || ''}\nLast Five Messages:\n ${lastFiveMessages}`
      const summaryPrompt = `Generate a comprehensive summary of the document/conversation, highlighting all significant points and crucial information.
       Ensure that the summary captures the main ideas, key findings, any numeric data mentioned and important context like chapter and topic, what is present in them respect while excluding unnecessary details or specific examples. Provide a concise and informative summary that serves as a comprehensive overview of the content so that it can be used in future for context`
      const newSummary = await callGPT(summaryContext, summaryPrompt);
      setSummary(newSummary);
    }

    // console.log(messages, summary);
  };



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


      <Layout style={{ marginTop: '4rem' }}>
        {messages.length == 1 ? (
          <div style={{
            overflow: 'auto',
            marginLeft: '10vw',
            marginRight: '10vw'
          }}>
            <NewChat setMessages={setMessages} />
          </div>) : (<div className="card" style={{
            overflow: 'auto',
            marginLeft: '10vw',
            marginRight: '10vw'
          }}>
            <ChatBox messages={messages} />
          </div>)}
      </Layout>
      {messages.length > 1 && <div
        style={{
          position: 'fixed',
          bottom: 0,
          zIndex: 1,
          paddingLeft: '5%',
          width: '100%',
          paddingRight: '5%',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '10vh'
        }}>
        <Search
          style={{
            // width: '100%'
          }}
          placeholder="input search text"
          enterButton="Search"
          size="large"
          value={inputValue}
          // suffix={suffix}
          onSearch={onSearch}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>}
    </Layout >
  );
};

export default App;