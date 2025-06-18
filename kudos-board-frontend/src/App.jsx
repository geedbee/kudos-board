import './App.css'
import { useState , createContext, useEffect} from 'react';
import HomePage from './components/HomePage';
import BoardPage from './components/BoardPage';

export const AllContext = createContext();

function App() {
  const [boardData, setBoardData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [cardDataIdx, setCardDataIdx] = useState(null);
  const [category, setCategory] = useState('');
  const [dataChanged, setDataChanged] = useState(false);

  const fetchData = async () => {
    const url = `http://localhost:3000/boards?category=${category}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch boards');
    }
    const data = await response.json();
    setBoardData(data);
  }

  useEffect(() => {
    fetchData();
    setDataChanged(false);
  }, [category, dataChanged])

  return (
    <>
      <header className="App-header">
        <h1>Kudos Board</h1>
      </header>
      <main>
        <AllContext.Provider value={{cardData, setCardData, cardDataIdx, setCardDataIdx}}>
        {cardDataIdx == null && <HomePage boardData={boardData} setBoardData={setBoardData} setCategory={setCategory} setDataChanged={setDataChanged}/>}
        {cardDataIdx != null && <BoardPage cardData={cardData}/>}
        </AllContext.Provider>
      </main>
      <footer>Kudos Board ©{new Date().getFullYear()}</footer>
    </>
  )
}

export default App
