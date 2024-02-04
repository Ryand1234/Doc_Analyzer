"use client";
import React, { useEffect, useState } from 'react';
import ConvoElement from './layout/convo-element';
import { useRouter } from 'next/navigation';

interface OldConversationSchema {
  setConversationId: any
}

const OldConversation: React.FC<OldConversationSchema> = ({setConversationId}) => {
  const router = useRouter();
  const [conversations, setConversations] = useState<Array<string>>([])

  useEffect(() => {
    const allKeys = Object.keys(localStorage);

    // Filter keys that start with "message-"
    const filteredKeys = allKeys.filter((key) => key.startsWith('conversation-'));
    console.log(filteredKeys);
    filteredKeys.push("")
    setConversations([...filteredKeys]);
  }, [router]);
  return (
    <div style={{top: '10px', position: 'relative', color: 'black'}}> 
        <ul style={{width: '90%'}}>
        {
            conversations.map((conversation, index) =>(
                <ConvoElement key={index} id={conversation} text={conversation} 
                description={conversation} onClick={setConversationId} />
            ))
        }
        </ul>
    </div>
  );

};

export default OldConversation;