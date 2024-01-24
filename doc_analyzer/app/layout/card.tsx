import { Breadcrumb, Layout, theme } from 'antd';
interface CardData {
  id: string
  text: string
}
export default function Card(data: CardData) {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div 
        id={data.id}
        style={{
            margin: '20px',
            padding: '10px',
            minHeight: '7rvh',
            color: 'black',
            textAlign: 'center',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
          onClick={(e) => {alert(e.currentTarget.outerText);}}>
            <p>{data.text}</p>
        </div>
    )
}