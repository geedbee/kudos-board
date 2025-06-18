import {Link} from "react-router"
import '../components-css/Board.css'

export default function Board({data, setDataChanged}) {
    async function deleteBoard(id){
        const response = await fetch(`http://localhost:3000/boards/${id}`, { method: 'DELETE' });
        const result = await response.json();
    }

    function HandleDelete(e){
        e.preventDefault();
        deleteBoard(data.id);
        setDataChanged(true);
    }

    return (
    <div className='board'>
        <img src={data.image} alt={data.title} />
        <h2>{data.title}</h2>
        <p>{data.category}</p>
        <p>{data.author}</p>
        <div>
            <Link to={`/boards/${data.id}/cards`} state={{data}}><button>View Board</button></Link>
            <button onClick={HandleDelete}>Delete Board</button>
        </div>
    </div>
    )
}
