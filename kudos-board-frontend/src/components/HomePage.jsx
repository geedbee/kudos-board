import { useState } from "react";
import Board from "./Board";

export default function HomePage({data, displayedData, setDisplayedData}) {
  const [search, setSearch] = useState('');

  function HandleSearch(e){
    e.preventDefault();
    setDisplayedData(data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())));
  }
  function HandleClear(e){
    e.preventDefault();
    setSearch('');
    setDisplayedData(data);
  }
  function HandleSearchChange(e){
    setSearch(e.target.value);
  }

  const filterOptions = [
    "All",
    "Recent",
    "Celebration",
    "Thank you",
    "Inspiration"
  ]
  return (
    <div>
        <aside className="search-bar">
          <form onSubmit={HandleSearch}>
              <input type="text" name="search" value={search} onChange={HandleSearchChange} placeholder="Search"/>
              <button type="submit">Search</button>
              <button type="button" onClick={HandleClear}>Clear</button>
          </form>
        </aside>
        <aside className="filter-bar">
          {filterOptions.map((option, key) => (<button key={key}>{option}</button>))}
        </aside>
        <div className='board-container'>
          {displayedData.map((item, index) => (<Board key={index} data={item}/>))}
        </div>
    </div>
  )
}
