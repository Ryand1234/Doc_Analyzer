import { Breadcrumb, Layout, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { MenuProps } from '../interface/chat-interface';
import Message from './message';

export default function ChatBox({ messages }: MenuProps) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Content style={{marginBottom: '10px'}}>
                {messages.map((element, index) => (
                    <Message key={index} message={element.message} user={element.user} />
                ))}
            </Content>

        </>
    )
};