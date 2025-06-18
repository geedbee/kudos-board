import React from 'react'

export default function Comment({comment}) {
  return (
    <div>
        <p>{comment.author}</p>
        <p>{comment.message}</p>
    </div>
  )
}
