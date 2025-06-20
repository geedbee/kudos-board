import React, { useEffect } from 'react'
import {useState} from 'react';
import '../components-css/CreateNewCard.css'
import Gif from './Gif';

export default function CreateNewCard({setIsCreateOpen, setCardDataChanged, boardId}) {
    //main gif data
    const [gifs, setGifs] = useState([]);
    //gif user search
    const [gifSearch, setGifSearch] = useState("");
    //selected gif url
    const [gifUrl, setGifUrl] = useState(null);
    //current page offset
    const [gifOffset, setGifOffset] = useState(0);

    useEffect(() => {
        fetchGiphy();
    }, [gifOffset]);

    async function CreateNewCard(e) {
        e.preventDefault();
        if (gifUrl == null) {
            alert("Please select a gif");
            return;
        }
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                title: e.target[0].value,
                image: gifUrl,
                message: e.target[1].value,
                author: e.target[2].value,
                board_id: parseInt(boardId),
            })
        };
        try {
            const fetchResponse = await fetch(import.meta.env.VITE_URL + `/cards`, settings);
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
            q: gifSearch,
            limit: 20,
            offset: gifOffset,
            rating: "pg-13"
        });
        try {
            const URL = "https://api.giphy.com/v1/gifs/search?";
            const response = await fetch(URL + params.toString());
            const data = await response.json();
            setGifs(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    function HandleSearch(e){
        e.preventDefault();
        fetchGiphy();
    }
    function HandleClose(e){
        e.preventDefault();
        setIsCreateOpen(false);
        setGifUrl(null);
        setGifSearch("");
        setGifOffset(0);
        setGifs([]);
    }

    function GifSearch(e){
        setGifSearch(e.target.value);
    }

    return (
    <div className='modal-create-card'>
        <div className='modal-content-create-card'>
            <div className='gif'>
                <form onSubmit={HandleSearch}>
                    <input type="text" placeholder="Search for a gif" onChange={GifSearch}/>
                    <button type="submit">Search</button>
                </form>
                <div className='gif-container'>
                    {gifs.map((gif, idx) => (<Gif key={idx} image={gif.images.fixed_height_small} gifUrl={gifUrl} setGifUrl={setGifUrl}></Gif>))}
                </div>
                {gifOffset >= 20 && <button onClick={() => setGifOffset(gifOffset - 20)}>Previous</button>}
                {gifs.length !== 0 && <button onClick={() => setGifOffset(gifOffset + 20)}>Next</button>}
            </div>
            <form onSubmit={CreateNewCard}>
                <input type="text" placeholder="Enter card title" required/>
                <input type="text" placeholder="Enter card message" required/>
                <input type="text" placeholder="Enter card author" />
                <button type="submit">Create</button>
            </form>
            <button onClick={HandleClose}>Close</button>
        </div>
    </div>
    )
}
