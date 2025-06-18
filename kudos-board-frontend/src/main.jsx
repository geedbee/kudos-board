import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import BoardPage from './components/BoardPage.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/boards/:id',
    element: <BoardPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
