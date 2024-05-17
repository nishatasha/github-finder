import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './component/Search';
import User from './component/User';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/user/:username" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
