
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Login } from './view/Login';
import { Register} from './view/Register';
import { BookManage} from './view/BookManage';

const routes = [
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/",
    element: <BookManage/>,
  },
];

const router = createBrowserRouter(routes);


createRoot(document.getElementById('root')!).render(
<RouterProvider router={router}></RouterProvider>
)
