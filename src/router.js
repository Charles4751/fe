import {
  createBrowserRouter,
} from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home';
import DishManage from './pages/dish-manage';

export default createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/:userId",
    element: <Home />,
  },

  {
    path: '/dish/:userId/:merchantId',
    element: <DishManage />
  }
]);