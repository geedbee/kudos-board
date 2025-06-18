import React from 'react'
import '../components-css/Card.css'
import CardModal from './CardModal'

export default function Card({data, setCardDataChanged}) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    function HandleDelete(e){
        e.preventDefault();
        e.stopPropagation();
        deleteCard(data.id);
    }
    async function deleteCard(id){
        const response = await fetch(`http://localhost:3000/cards/${id}`, { method: 'DELETE' });
        const result = await response.json();
        setCardDataChanged(true);
    }

    function HandleUpvote(e){
        e.preventDefault();
        e.stopPropagation();
        upvoteCard(data.id);
    }
    async function upvoteCard(id){
        const body = { upvotes: data.upvotes + 1 };
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch(`http://localhost:3000/cards/${id}`, settings);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setCardDataChanged(true);
        } catch (error) {
            console.error('Error upvoting card:', error);
        }
    }

    function HandlePin(e){
        e.preventDefault();
        e.stopPropagation();
        pinCard(data.id);
    }
    async function pinCard(id){
        const body = { pinned: !data.pinned };
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch(`http://localhost:3000/cards/${id}`, settings);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setCardDataChanged(true);
        } catch (error) {
            console.error('Error pinning card:', error);
        }
    }

    function HandleOpenCard(e){
        e.preventDefault();
        setIsModalOpen(true);
    }

    return (
        <div>
            <div onClick={HandleOpenCard}>
                <h2>{data.title}</h2>
                <img src={data.image} alt="card"/>
                <p>{data.message}</p>
                <p>{data.author}</p>
                <div>
                    <button onClick={HandleUpvote}>Upvotes {data.upvotes}</button>
                    <button onClick={HandleDelete}>Delete Card</button>
                    <button onClick={HandlePin} className={data.pinned ? "pinned" : ''}>Pin</button>
                </div>
            </div>
        {isModalOpen && <CardModal data={data} setIsModalOpen={setIsModalOpen}/>}
        </div>
    )
}
