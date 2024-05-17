import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Search from './pages/Search';
import User from './pages/User';

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Search />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppWithRouter = () => (
  <Router basename="/github-finder">
    <App />
  </Router>
);

export default AppWithRouter;
