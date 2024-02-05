import { Breadcrumb, Layout, theme } from 'antd';
interface ErrorProps {
  message: string;
}
export default function Error({message}: ErrorProps) {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div 
        style={{
            marginRight: '10px',
            paddingLeft: '5px',
            paddingRight: '5px',
            color: 'black',
            textAlign: 'center',
            background: colorBgContainer,
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            lineHeight: '2em'
          }}
          >
            <p>{message}</p>
        </div>
    )
}