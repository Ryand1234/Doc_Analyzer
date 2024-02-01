"use client";
import { Breadcrumb, Layout, theme } from 'antd';
import React, { useState, useEffect } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import { Info } from '../interface/chat-interface';
import Image from 'next/image'
import userImg from '../../public/user.png'
import './message.css'
import {
    UserOutlined,
} from '@ant-design/icons';
import bot from '../../public/bot.png'
// function loadScript(src: any) {
//     return new Promise((resolve, reject) => {
//       const scriptElement = document.createElement('script');
//       scriptElement.type = 'text/javascript';
//       scriptElement.src = src;
//       scriptElement.onload = resolve;
//       scriptElement.onerror = reject;
//       document.head.appendChild(scriptElement);
//     });
//   }

//   async function loadExternalScripts(scriptSrcs: any) {
//     const scriptPromises = scriptSrcs.map(loadScript);
//     await Promise.all(scriptPromises);
//   }
export default function Message({ user, hide, message }: Info) {
    const [hidden, setHidden] = useState(true);
    const isHTML = /<[a-z][\s\S]*>/i.test(message);
    
    return (
        <div
            style={{
                margin: '10px',
                padding: '8px',
                // width: '90vw',
                // background: 'black',
                color: 'black',
                display: (!hide) ? 'block' : 'none',
                    textAlign: 'justify',
                    lineHeight: '2em'
            }}
            className={`message`}
            id={`${user.toLowerCase()}`}
            onMouseEnter={() => { setHidden(false) }}
            onMouseLeave={() => { setHidden(true) }}
        >
            {isHTML ? <span
                id={`${user.toLowerCase()}-response`}
                style={{
                    textAlign: 'justify',
                }} dangerouslySetInnerHTML={{ __html: message }}></span> : 
                (<span id={`${user.toLowerCase()}-response`}
                    style={{
                        textAlign: 'justify',
                    }} >{message}</span>)}
        </div>
    )
};