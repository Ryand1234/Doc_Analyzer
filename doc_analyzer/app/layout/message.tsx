import { Breadcrumb, Layout, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Info } from '../interface/chat-interface';
import Image from 'next/image'
import userImg from '../../public/user.png'
import bot from '../../public/bot.png'
export default function Message({ user, message }: Info) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div
            style={{
                margin: '10px',
                padding: '24px',
                minHeight: '90rvh',
                background: 'black',
                borderRadius: borderRadiusLG,
            }}
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
                }}>{user}</p>
            </div>
            <br />
            <p style={{
                textAlign: 'justify', 
            }}>{message}</p>
        </div>
    )
};