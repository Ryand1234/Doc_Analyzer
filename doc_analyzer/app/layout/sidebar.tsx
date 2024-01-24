import { List } from 'postcss/lib/list'
import Card from './card'
interface MenuProps {
    history: Array<string>
}
export default function Menu({history}: MenuProps) {
    return (
        <div>
            {history.map((element, index) => (
            <Card key={index} id={index.toString()} text={element} />
            ))}
        </div>
    )
}