import React from 'react'

export default function Card({data}) {
  return (
    <div>
        <h2>{data.title}</h2>
        <img src={data.image} alt="card"/>
        <p>{data.message}</p>
        <p>{data.author}</p>
    </div>
  )
}
