import React from 'react'
import '../components-css/CreateNewBoard.css'

export default function CreateNewBoard({setDataChanged, setIsCreateOpen}) {
    async function CreateNewBoard(e) {
       e.preventDefault();
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                title: e.target[0].value,
                category: e.target[1].value,
                author: e.target[2].value,
            })
        };
        try {
            const fetchResponse = await fetch(`http://localhost:3000/boards`, settings);
            const data = await fetchResponse.json();
            setDataChanged(true);
            setIsCreateOpen(false);
            return data;
        } catch (e) {
            return e;
        }
    }
    return (
    <div className="modal">
        <div className='modal-content'>
            <form onSubmit={CreateNewBoard}>
                <input type="text" placeholder="Enter board name" required/>
                <input type="text" placeholder="Enter board category" required/>
                <input type="text" placeholder="Enter board author" />
                <button type="submit">Create</button>
            </form>
            <button onClick={() => setIsCreateOpen(false)}>Close</button>
        </div>
    </div>
    )
}
