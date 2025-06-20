import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import {createBrowserRouter, RouterProvider} from 'react-router';
import HomePage from './components/HomePage';
import BoardPage from './components/BoardPage';
import {useState} from 'react';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/boards/:id/cards',
    element: <BoardPage />
  }
]);

function App() {
  const modes = {
    light: 0,
    dark: 1,
  }
  const [mode, setMode] = useState(modes.light);

  return (
    <div className={`app ${mode === modes.dark ? 'dark' : ''}`}>
      <Header mode={mode} modes={modes} setMode={setMode}/>
      <main>
        <RouterProvider router={routes} />
      </main>
      <Footer/>
    </div>
  )
}

export default App
