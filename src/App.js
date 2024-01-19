import './App.css';
import React from 'react';
import theme from "./flowbite-theme.js";
import { Flowbite } from "flowbite-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TagPage from './pages/Tag/TagPage';
import UserPage from './pages/User/UserPage';
import IdeaPage from './pages/Idea/IdeaPage';
import Layout from './layouts/Layout';

export default function App() {
  return (
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}> 
            <Route index path="/" element={<TagPage />} />
            <Route path="/users/list" element={<UserPage />} />
            <Route path="/ideas" element={<IdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Flowbite>
  );
}
