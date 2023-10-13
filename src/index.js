import React from 'react';
import ReactDOM from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ConfigProvider } from 'antd'

import Login from './pages/login';
import Home from './pages/home';
import DishManage from './pages/dish-manage';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/:userId" element={<Home />} />
          <Route path="/dish/:userId/:merchantId" element={<DishManage />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
