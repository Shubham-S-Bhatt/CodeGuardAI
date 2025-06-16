import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PRList from './components/PRList';
import PRDetail from './components/PRDetail';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10 }}>
        <Link to="/">PRs</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PRList />} />
        <Route path="/prs/:id" element={<PRDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
