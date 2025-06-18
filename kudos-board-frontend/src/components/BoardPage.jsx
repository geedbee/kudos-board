import React, { useEffect } from 'react'
import Card from './Card'
import { useState, useContext } from 'react';
import {AllContext} from "../App.jsx"
import "../components-css/BoardPage.css"
import CreateNewCard from './CreateNewCard.jsx';
import { useParams, useLocation } from 'react-router';

export default function BoardPage() {
    const {data} = useParams();
    const location = useLocation();

    const context = useContext(AllContext);
    const setCardData = context.setCardData;
    const cardData = context.cardData;
    const cardDataIdx = context.cardDataIdx;
    const setCardDataIdx = context.setCardDataIdx;
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [cardDataChanged, setCardDataChanged] = useState(false);

    async function getCards(){
        const response = await fetch(`http://localhost:3000/cards/${cardDataIdx}`);
        const cards = await response.json();
        setCardData(cards);
        setCardDataChanged(false);
    }

    useEffect(() => {
        getCards();
    }, [cardDataChanged]);

    function HandleBack(e){
      e.preventDefault();
      setCardData([]);
      setCardDataIdx(null);
    }

    function OpenCardForm(e){
      e.preventDefault();
      setIsCreateOpen(!isCreateOpen);
    }

    return (
      <div>
        <button onClick={HandleBack}>Go back</button>
        <button onClick={OpenCardForm}>Create a Card</button>
        {isCreateOpen && <CreateNewCard setIsCreateOpen={setIsCreateOpen} setCardDataChanged={setCardDataChanged}/>}
        <div className='card-container'>
          {cardData.map((data, idx) => <Card key={idx} data={data} setCardDataChanged={setCardDataChanged}/>)}
        </div>
      </div>
    )
}
