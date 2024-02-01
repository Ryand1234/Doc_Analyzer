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

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // useEffect(() => {
    //     const scriptSrcRegex = /<script\b[^>]*src=['"]([^'"]*)['"][^>]*><\/script>/gi;

    //     // Find all script tags with src attribute within the inserted HTML
    //     const scriptSrcMatches = message.match(scriptSrcRegex);
    //     let scriptSrcs: Array<string> = []
    //     if (scriptSrcMatches) {
    //         scriptSrcs = scriptSrcMatches.map((scriptSrcTag) => {
    //             const srcAttributeMatch = scriptSrcTag.match(/src=['"]([^'"]*)['"]/);
    //             return srcAttributeMatch ? srcAttributeMatch[1] : '';
    //           });
              
    //     }
    //     let match = message.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
    //     console.log("M1 :,", message, match, scriptSrcs)
    //     if (match) {
    //         loadExternalScripts(scriptSrcs)
    //         .then(() => {
    //             const scriptContent = match[1];
    //             const scriptElement = document.createElement('script');
    //             scriptElement.type = 'text/javascript';
    //             scriptElement.text = scriptContent;
    //             document.head.appendChild(scriptElement);
    //         })
    //         .catch((error) => {
    //         console.error('Error loading external scripts:', error);
    //         });
    // }
    // }, [user, message]);
    return (
        <div
            style={{
                margin: '10px',
                padding: '15px',
                // width: '90vw',
                // background: 'black',
                color: 'black',
                display: (!hide) ? 'block' : 'none',
                lineHeight: '2em'
            }}
            className={`message`}
            id={`${user.toLowerCase()}`}
            onMouseEnter={() => { setHidden(false) }}
            onMouseLeave={() => { setHidden(true) }}
        >
            {/* <div
                style={{
                    display: 'flex',
                    flex: 'row',
                    alignItems: 'center',
                    justifyContent: 'left',
                }}>
                <Image alt="logo" width={25} height={25} src={user == 'Bot' ? bot : userImg} />
                <p style={{
                    padding: '10px',
                }}><strong>{user}</strong></p>
            </div>
            <div> */}
                <span  
                id={`${user.toLowerCase()}-response`}
                style={{
                    textAlign: 'justify',
                }} dangerouslySetInnerHTML={{ __html: message }}></span>
                {/* <span style={{ position: 'absolute' }}>
                    <UserOutlined hidden={hidden} />
                </span> */}
            {/* </div> */}
        </div>
    )
};