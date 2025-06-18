import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import {createBrowserRouter, RouterProvider} from 'react-router';
import HomePage from './components/HomePage';
import BoardPage from './components/BoardPage';

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
  return (
    <>
      <Header/>
      <main>
        <RouterProvider router={routes} />
      </main>
      <Footer/>
    </>
  )
}

export default App
