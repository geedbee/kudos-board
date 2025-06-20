import { useState, useEffect } from "react";
import Board from "./Board";
import CreateNewBoard from "./CreateNewBoard";
import '../components-css/HomePage.css'

export default function HomePage() {
  const [boardData, setBoardData] = useState([]);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [dataChanged, setDataChanged] = useState(false);

  //fetch board data
  const fetchData = async () => {
    const url = import.meta.env.VITE_URL + `/boards?category=${category}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch boards');
    }
    const data = await response.json();
    setBoardData(data);
  }
  //fetch search data
  async function fetchSearch(){
    const url = import.meta.env.VITE_URL + `/boards/search?search=${search}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch boards/search');
    }
    const data = await response.json();
    setBoardData(data);
  }

  //update boards on change of category and of data (create/delete)
  useEffect(() => {
    fetchData();
    setDataChanged(false);
  }, [category, dataChanged])

  //search functionality
  function HandleSearch(e){
    e.preventDefault();
    fetchSearch();
  }
  function HandleClear(e){
    e.preventDefault();
    setSearch('');
    setCategory('All');
    setDataChanged(true);
  }
  function HandleSearchChange(e){
    setSearch(e.target.value);
  }
  //filter functionality
  function HandleFilter(e){
    const filter = e.target.innerText;
    setCategory(filter);
  }

  //create board
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
    <div className='home-page'>
        <aside className="search-bar">
          <form onSubmit={HandleSearch}>
              <input type="text" name="search" value={search} onChange={HandleSearchChange} placeholder="Search"/>
              <button type="submit">Search</button>
              <button type="button" onClick={HandleClear}>Clear</button>
          </form>
        </aside>
        <aside className="filter-bar">
          {filterOptions.map((option, key) => (<button key={key} className={category === option ? "selected-filter" : ''} onClick={HandleFilter}>{option}</button>))}
        </aside>
        <button onClick={HandleCreateButton}>Create a New Board</button>
        {isCreateOpen && <CreateNewBoard setDataChanged={setDataChanged} setIsCreateOpen={setIsCreateOpen}/>}
        <div className='board-container'>
          {boardData.map((item, index) => (<Board key={index} data={item} setDataChanged={setDataChanged}/>))}
        </div>
    </div>
  )
}
