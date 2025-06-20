import React, { useState, useEffect } from 'react'
import "../components-css/CardModal.css"
import Comment from './Comment';

export default function CardModal({data, setIsModalOpen}) {
    const [comments, setComments] = useState([]);
    const [commentChanged, setCommentChanged] = useState(false);

    useEffect(() => {
        fetchComments(data.id);
        setCommentChanged(false);
    }, [commentChanged]);

    async function fetchComments(id){
        try {
            const response = await fetch(import.meta.env.VITE_URL + `/comments/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setComments(result);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    async function CreateNewComment(e) {
        e.preventDefault();
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: e.target[0].value,
                author: e.target[1].value,
                card_id: parseInt(data.id),
            })
        };
        try {
            const fetchResponse = await fetch(import.meta.env.VITE_URL + `/comments`, settings);
            const data = await fetchResponse.json();
            setCommentChanged(true);
        } catch (e) {
            return e;
        }
    }

    return (
    <div className='modal-create-card'>
        <div className='modal-content-create-card'>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
            <div>
                <h2>{data.title}</h2>
                <img src={data.image} alt="card"/>
                <p>{data.message}</p>
                <p>{data.author}</p>
            </div>
            <div className='comments-container'>
                {comments.map((comment, id) => (<Comment key={id} comment={comment} />))}
            </div>
            <h2>Add a comment:</h2>
            <form onSubmit={CreateNewComment}>
                <input type="text" placeholder='Add a comment...' />
                <input type='text' placeholder='Add an author...' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
    )
}
