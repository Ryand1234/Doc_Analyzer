import { Breadcrumb, Layout, theme } from 'antd';
interface ConvoData {
  id: string
  text: string
  onClick: any | null
  description: string
}
export default function  Card(data: ConvoData) {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <li
        id={data.id}
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
          onClick={() => data.onClick(data.id)}
          >
            <p>{data.text}</p>
        </li>
    )
}