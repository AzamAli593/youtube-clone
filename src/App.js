import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetail from "./components/VideoDetail";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <Router>
      <div className='flex flex-col h-full'>
        <Header toggleNav={toggleNav} setToggleNav={setToggleNav} />
        <Routes>
          <Route
            path='/'
            element={<Feed toggleNav={toggleNav} setToggleNav={setToggleNav} />}
          />
          <Route
            path='/search'
            element={
              <SearchResult toggleNav={toggleNav} setToggleNav={setToggleNav} />
            }
          />
          <Route path='/video/:id' element={<VideoDetail />} />
          <Route path='/category/:categoryId' element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
