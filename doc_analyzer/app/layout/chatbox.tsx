import { Breadcrumb, Layout, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { MenuProps } from '../interface/chat-interface';
import Message from './message';
import React, { useState, useRef, useEffect } from 'react';
export default function ChatBox({ messages }: MenuProps) {
    
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(messagesContainerRef)
    if (messagesContainerRef.current) {
      // Scroll to the bottom of the container
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

    return (
        <>
            <Content id={"message-section"} 
        ref={messagesContainerRef} 
        style={{
        height: '70vh',
        overflowY: 'auto',}}>
                {messages.map((element, index) => (
                        <Message key={index} hide={element.hide} message={element.message} user={element.user} />
                ))}
            </Content>

        </>
    )
};