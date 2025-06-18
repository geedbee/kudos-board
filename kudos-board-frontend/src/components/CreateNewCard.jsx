import React, { useEffect } from 'react'
import {useState} from 'react';

export default function CreateNewCard({setIsCreateOpen, setCardDataChanged, boardId}) {
    const [gifs, setGifs] = useState([]);

    useEffect(() => {
        fetchGiphy();
    }, []);

    async function CreateNewCard(e) {
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
                message: e.target[1].value,
                author: e.target[2].value,
                board_id: parseInt(boardId),
            })
        };
        try {
            const fetchResponse = await fetch(`http://localhost:3000/cards`, settings);
            const data = await fetchResponse.json();
            setIsCreateOpen(false);
            setCardDataChanged(true);
            return data;
        } catch (e) {
            return e;
        }
    }

    async function fetchGiphy(){
        const params = new URLSearchParams({
            api_key: import.meta.env.VITE_GIPHY_API_KEY,
            q: "cheeseburgers",
            limit: 10,
            offset: 0,
            rating: "pg-13"
        });
        const URL = "https://api.giphy.com/v1/gifs/search?";
        const response = await fetch(URL+params.toString());
        const data = await response.json();
        setGifs(data.data);
    }

    return (
    <div>
        <form onSubmit={CreateNewCard}>
            <input type="text" placeholder="Enter card title" required/>
            <input type="text" placeholder="Enter card message" required/>
            <input type="text" placeholder="Enter card author" />
            {gifs.map((gif, idx) => (<img key={idx} src={gif.images.fixed_height_small.url} alt={gif.alt}/>))}
            <button type="submit">Create</button>
        </form>
    </div>
    )
}
