import React from 'react'
import { RiHandHeartFill } from "react-icons/ri";


export default function Header({mode, modes, setMode}) {
  function ChangeMode(e){
    e.preventDefault();
    if (mode === modes.light){
      setMode(modes.dark);
    } else {
      setMode(modes.light);
    }
  }

  return (
      <header className="app-header">
        <h1>Kudos Board <RiHandHeartFill/></h1>
        <button className='mode-btn' onClick={ChangeMode}>Change Mode</button>
      </header>
  )
}
