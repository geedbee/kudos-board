import {useContext} from 'react'
import {AllContext} from "../App.jsx"
import {Link} from "react-router"

export default function Board({data, setDataChanged}) {
    const context = useContext(AllContext);
    const setCardData = context.setCardData;
    const setCardDataIdx = context.setCardDataIdx;

    async function deleteBoard(id){
        const response = await fetch(`http://localhost:3000/boards/${id}`, { method: 'DELETE' });
        const result = await response.json();
    }

    async function OpenBoard(e){
        e.preventDefault();
        setCardDataIdx(data.id);
    }

    function HandleDelete(e){
        e.preventDefault();
        deleteBoard(data.id);
        setDataChanged(true);
    }

    return (
    <div>
        <img src={data.image} alt={data.title} />
        <h2>{data.title}</h2>
        <p>{data.category}</p>
        <p>{data.author}</p>
        <div>
            <button onClick={OpenBoard}>View Board</button>
            <Link to={`/boards/${data.id}`} state={{data}}>View Board</Link>
            <button onClick={HandleDelete}>Delete Board</button>
        </div>
    </div>
    )
}
