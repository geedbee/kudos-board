import './App.css'
import { useState , createContext, useEffect} from 'react';
import HomePage from './components/HomePage';
import BoardPage from './components/BoardPage';

export const AllContext = createContext();


//Add sample data into database


function App() {
  const [boardData, setBoardData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  const [cardData, setCardData] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/boards')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then(data => {
      // Handle successful response
      console.log('Boards:', data);
      // Update UI or perform other actions with the data
      setBoardData(data);
      setDisplayedData(data);
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching boards:', error);
      // Display an error message or retry the request
    });
  }, [])

  return (
    <>
      <header className="App-header">
        <h1>Kudos Board</h1>
      </header>
      <main>
        <AllContext.Provider value={{cardData, setCardData}}>
        {cardData == '' && <HomePage data={boardData} displayedData={displayedData} setDisplayedData={setDisplayedData} setCardData={setCardData}/>}
        {cardData != '' && <BoardPage cardData={cardData}/>}
        </AllContext.Provider>
      </main>
      <footer>Kudos Board ©{new Date().getFullYear()}</footer>
    </>
  )
}

export default App
