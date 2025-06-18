import {useContext} from 'react'
import {AllContext} from "../App.jsx"

export default function Board({data, setDataChanged}) {
    const context = useContext(AllContext);
    const setCardData = context.setCardData;

    function OpenBoard(){
        setCardData(data.cards);
    }

    async function deleteBoard(id){
        const response = await fetch(`http://localhost:3000/boards/${id}`, { method: 'DELETE' });
        const result = await response.json();
    }

    function HandleDelete(e){
        e.preventDefault();
        e.stopPropagation();
        deleteBoard(data.id);
        setDataChanged(true);
    }

    return (
    <div onClick={OpenBoard}>
        <img src={data.image} alt={data.title} />
        <h2>{data.title}</h2>
        <p>{data.category}</p>
        <p>{data.author}</p>
        <div>
            <button>View Board</button>
            <button onClick={HandleDelete}>Delete Board</button>
        </div>
    </div>
    )
}
