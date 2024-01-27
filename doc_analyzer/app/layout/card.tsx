import { Breadcrumb, Layout, theme } from 'antd';
interface CardData {
  id: string
  text: string | number
  onClick: any | null
}
export default function Card(data: CardData) {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div 
        id={data.id}
        style={{
            marginRight: '10px',
            paddingLeft: '5px',
            paddingRight: '5px',
            color: 'black',
            textAlign: 'center',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
          onClick={data.onClick}
          >
            <p>{data.text}</p>
        </div>
    )
}