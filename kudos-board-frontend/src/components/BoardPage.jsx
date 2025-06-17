import React from 'react'
import Card from './Card'
import "../components-css/BoardPage.css"

export default function BoardPage({cardData}) {
  return (
    <div>
      <div className='card-container'>
        {cardData.map((data, idx) => <Card key={idx} data={data}/>)}
      </div>
    </div>
  )
}
