"use client";
import { Breadcrumb, Layout, theme } from 'antd';
import React, { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import { Info } from '../interface/chat-interface';
import Image from 'next/image'
import userImg from '../../public/user.png'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import bot from '../../public/bot.png'
export default function Message({ user, message }: Info) {
  const [hidden, setHidden] = useState(true);
  const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div
            style={{
                margin: '10px',
                padding: '15px',
                minHeight: '5rem',
                // width: '90vw',
                // background: 'black',
                color: 'black',
                borderRadius: borderRadiusLG,
            }}
            onMouseEnter={() => {setHidden(false)}}
            onMouseLeave={() => {setHidden(true)}}
        >
            <div
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
            <div><p style={{
                textAlign: 'justify', 
            }}>{message}</p> <UserOutlined hidden={hidden}/></div>
        </div>
    )
};