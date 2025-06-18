import React from 'react'

export default function Card({data, setCardDataChanged}) {
    function HandleDelete(e){
        e.preventDefault();
        deleteCard(data.id);
    }
    async function deleteCard(id){
        const response = await fetch(`http://localhost:3000/cards/${id}`, { method: 'DELETE' });
        const result = await response.json();
        setCardDataChanged(true);
    }
    return (
      <div>
          <h2>{data.title}</h2>
          <img src={data.image} alt="card"/>
          <p>{data.message}</p>
          <p>{data.author}</p>
          <div>
              <button>Upvote</button>
              <button onClick={HandleDelete}>Delete Card</button>
          </div>
      </div>
    )
}
