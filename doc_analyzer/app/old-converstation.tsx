"use client";
import React, { useEffect, useState } from 'react';
import { Layout, Button, message } from 'antd';
import { useRouter } from 'next/navigation';


const OldConversation: React.FC = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState<Array<string>>([])

  useEffect(() => {
    const allKeys = Object.keys(localStorage);

    // Filter keys that start with "message-"
    const filteredKeys = allKeys.filter((key) => key.startsWith('conversation-'));
    console.log(filteredKeys);
    setConversations([...filteredKeys]);
  }, [router]);
  return (
    <div>
        <ul>
        {
            conversations.map((conversation, index) =>(
                <li key={index}>{conversation}</li>
            ))
        }
        </ul>
    </div>
  );

};

export default OldConversation;