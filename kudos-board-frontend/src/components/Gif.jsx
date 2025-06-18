import React, { useState, useEffect } from 'react'
import '../components-css/Gif.css'

export default function Gif({image, gifUrl, setGifUrl}) {
    const [isSelected, setIsSelected] = useState(false);

    function SelectGif(e){
        e.preventDefault();
        if (isSelected){
            setGifUrl(null);
            setIsSelected(false);
        }
        else{
            setGifUrl(image.url);
            setIsSelected(true);
        }
    }

    return (
      <div>
          <img src={image.url} alt={image.alt} onClick={SelectGif} className={isSelected ? 'selected' : ''}/>
      </div>
    )
}
