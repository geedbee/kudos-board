import React, { useEffect } from 'react'
import Card from './Card'
import { useState} from 'react';
import "../components-css/BoardPage.css"
import CreateNewCard from './CreateNewCard.jsx';
import { Link, useParams} from 'react-router';

export default function BoardPage() {
    const {id} = useParams();

    const [cardData, setCardData] = useState([]);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [cardDataChanged, setCardDataChanged] = useState(false);

    async function getCards(){
        const response = await fetch(import.meta.env.VITE_URL + `/cards/${id}`);
        const cards = await response.json();
        setCardData(cards);
        setCardDataChanged(false);
    }

    useEffect(() => {
        getCards();
    }, [cardDataChanged]);

    function OpenCardForm(e){
      e.preventDefault();
      setIsCreateOpen(!isCreateOpen);
    }

    return (
      <div className='board-page'>
        <Link to="/"><button>Back</button></Link>
        <button onClick={OpenCardForm}>Create a Card</button>
        {isCreateOpen && <CreateNewCard setIsCreateOpen={setIsCreateOpen} setCardDataChanged={setCardDataChanged} boardId={id}/>}
        <div className='card-container'>
          {cardData.map((data, idx) => <Card key={idx} data={data} setCardDataChanged={setCardDataChanged}/>)}
        </div>
      </div>
    )
}
