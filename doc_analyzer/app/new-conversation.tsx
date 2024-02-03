"use client";
import React, { useEffect, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

interface NewConversationProps {
  convoId: string;
  setConvoId: (convo: string) => void;
}

const NewConversation: React.FC<NewConversationProps> = ({ convoId, setConvoId }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('')
  const [hold, setHold] = useState(false);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);

    // Filter keys that start with "message-"
    const filteredKeys = allKeys.filter((key) => key.startsWith('conversation-') && key !== convoId);
    console.log('Old: ', filteredKeys, convoId)

    if (filteredKeys.length >= 3 && convoId == "") {
      toast.error(`Sessions exhausted. You have ${filteredKeys.length} sessions.`)
      router.push('/settings');
      return;
    }
    if (convoId == "") {
      setMessages([
        {
          "user": "Bot",
          "hide": false,
          "message": "Hi User!, Thanks for uploading the doc. You can ask questions on the doc now ;)"
        }
      ])
      setSummary("");
      toast.success('New Conversation Started!');
    } else {
      let key = `${convoId}`;
      const conversationString = localStorage.getItem(key)
      console.log("K: ", key)
      if (conversationString === null) {
        toast.error("Conversation not found")
        localStorage.removeItem(key)
        return;
      }
      const conversation = JSON.parse(conversationString)
      setMessages([...conversation.messages]);
      setSummary(conversation.summary);
      toast.success('Conversation Resumed!');
    }
  }, [router, convoId])

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
    setConvoId("");
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

  const resumeConversation = (uuid: string) => {
    setConvoId(uuid);
    let key = `conversation-${convoId}`;
    const conversationString = localStorage.getItem(key)
    if (conversationString === null) {
      toast.error("Conversation not found")
      localStorage.removeItem(key)
      return;
    }
    const conversation = JSON.parse(conversationString)
    setMessages([...conversation.messages]);
    setSummary(conversation.summary);
    toast.success('Conversation Resumed!');
  }

  function updateLocalStorage() {
    let key = `conversation-${convoId}`;
    const conversation = localStorage.getItem(key)
    if (conversation == null) {
      const uuid = uuidv4();
      setConvoId(uuid.toString());
      key = `conversation-${uuid}`;
    }
    const convo = JSON.stringify({
      'messages': messages,
      'summary': summary,
      'time': new Date()
    })
    localStorage.setItem(key, convo);
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
      result = result.split('Question:');
      if (result.length >= 1) {
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
    updateLocalStorage()
    // console.log(messages, summary);
  };



  return (
    <div style={{ top: '10px', position: 'relative', color: 'black' }}>
      <Layout style={{}}>
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
    </div>
  );
};

export default NewConversation;