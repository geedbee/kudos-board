import {Link} from "react-router"
import '../components-css/Board.css'

export default function Board({data, setDataChanged}) {
    async function deleteBoard(id){
        try {
            await fetch(import.meta.env.VITE_URL + `/boards/${id}`, { method: 'DELETE' });
        }
        catch (error) {
            console.log(error);
        }
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
