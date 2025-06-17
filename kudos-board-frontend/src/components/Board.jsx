import {useContext} from 'react'
import {AllContext} from "../App.jsx"

export default function Board({data}) {
    const context = useContext(AllContext);
    const setCardData = context.setCardData;

    function OpenBoard(){
        setCardData(data.cards);
    }

    return (
    <div onClick={OpenBoard}>
        <img src={data.image} alt={data.title} />
        <h2>{data.title}</h2>
        <p>{data.category}</p>
        <p>{data.author}</p>
    </div>
    )
}
