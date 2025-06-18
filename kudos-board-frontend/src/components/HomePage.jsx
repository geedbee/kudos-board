import { useState } from "react";
import Board from "./Board";
import CreateNewBoard from "./CreateNewBoard";

export default function HomePage({boardData, setBoardData, setCategory, setDataChanged}) {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  async function fetchSearch(){
    const url = `http://localhost:3000/boards/search?search=${search}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch boards/search');
    }
    const data = await response.json();
    setBoardData(data);
  }

  function HandleSearch(e){
    e.preventDefault();
    fetchSearch();
  }
  function HandleClear(e){
    e.preventDefault();
    setSearch('');
    setCategory('All');
  }
  function HandleSearchChange(e){
    setSearch(e.target.value);
  }
  function HandleFilter(e){
    const filter = e.target.innerText;
    setCategory(filter);
  }
  function HandleCreateButton(e){
    setIsCreateOpen(!isCreateOpen);
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
          {filterOptions.map((option, key) => (<button key={key} onClick={HandleFilter}>{option}</button>))}
        </aside>
        <button onClick={HandleCreateButton}>Create a New Board</button>
        {isCreateOpen && <CreateNewBoard setDataChanged={setDataChanged} setIsCreateOpen={setIsCreateOpen}/>}
        <div className='board-container'>
          {boardData.map((item, index) => (<Board key={index} data={item} setDataChanged={setDataChanged}/>))}
        </div>
    </div>
  )
}
